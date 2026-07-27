class Chess {
    #turn;
    #isGameOver;
    constructor(board) {
        this.board = board;
        this.selectedSquare = { row: null, col: null, };
        this.capturedPieces = [];
        this.#turn = "white";
        this.#isGameOver = false;
    }

    // Turn management
    isCurrentPlayerPieceTurn(piece) {
        if (piece?.color === this.#turn) return true;
        return false;
    }
    changeTurn() {
        this.#turn = this.#turn === "black" ? "white" : "black";
    }

    // Piece selection
    selectPiece(row, col) {
        if (this.board.getPiece(row, col)) {
            this.selectedSquare = { row, col };
        }
    }
    deselectPiece() {
        this.selectedSquare = { row: null, col: null };
    }

    // Move validation
    getMoves() {
        let { row: currentRow, col: currentCol } = this.selectedSquare;
        let piece = this.board.getPiece(currentRow, currentCol);
        if (piece) return piece.possibleMoves(this.board, currentRow, currentCol);
        return null;
    }
    legalMove(row, col) {
        let moves = this.getMoves();
        for (let i = 0; i < moves.length; i++) {
            let [r, c] = moves[i];
            if (row === r && col === c) {
                return true;
            }
        }
        return false;
    }

    // Handle a click based on the current game state
    processClick(row, col) {
        let piece = this.board.getPiece(row, col);
        let selectedPiece = this.board.getPiece(this.selectedSquare.row, this.selectedSquare.col);

        // A piece is already selected
        if (selectedPiece) {

            // Select another friendly piece
            if (piece?.color === selectedPiece?.color) {
                this.selectPiece(row, col);
                return;
            }

            // Move the piece if the destination is legal
            if (this.legalMove(row, col)) {
                let capturedPiece = this.board.movePiece({
                    fromRow: this.selectedSquare.row,
                    fromCol: this.selectedSquare.col,
                    toRow: row, toCol: col
                });

                // Update the game after a successful move
                this.changeTurn();
                this.deselectPiece();

                // Store the captured piece
                if (capturedPiece) {
                    this.capturedPieces.push(capturedPiece);
                }

                // evaluate the current game state (normal, check, checkmate, or stalemate)
                let gameStatus = this.getGameStatus();
                if (gameStatus.status === "CHECKMATE" || gameStatus.status === "STALEMATE") {
                    return gameStatus;
                } else if (gameStatus.status === "CHECK") {
                    return gameStatus;
                }

                return;
            }

            // Clear the current selection after click on an empty invalid square
            this.deselectPiece();
            return;
        }

        // select a piece if none is selected
        if (piece) {
            this.selectPiece(row, col);
            this.getMoves();
            return;
        }
    }

    // Handle user interaction with the board
    clickOnSquare(row, col) {
        let piece = this.board.getPiece(row, col);
        let selectedPiece = this.board.getPiece(this.selectedSquare.row, this.selectedSquare.col);

        // Ignore clicks after the game has ended
        if (this.#isGameOver) return this.getGameStatus();

        // Try moving to an empty square
        if (!piece) return this.processClick(row, col);

        // Try capturing an opponent's piece
        if (selectedPiece && !this.isCurrentPlayerPieceTurn(piece)) return this.processClick(row, col);

        // Opponent's piece with no valid selection → ignore.
        if (piece && !this.isCurrentPlayerPieceTurn(piece)) return { errorMsg: "NOT_YOUR_TURN" };

        // Select or change the selected piece
        return this.processClick(row, col);
    }

    // Check, checkmate, and stalemate detection - 

    // Locate the king of the given color
    findKing(kingColor) {
        const allPieces = this.board.grid;
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (allPieces[i][j]?.color === kingColor && allPieces[i][j].constructor.name === "King") {
                    return { kingRow: i, kingCol: j };
                }
            }
        }
    }

    // check whether a square is attacked by the opponent
    isSquareUnderAttack(row, col, attackBy) {
        let opponentAllPiecesMoves = [];

        // Collect every possible move for the opponent player
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                let sqr = this.board.getPiece(i, j);
                if (sqr?.color === attackBy) {
                    let moves;
                    if (sqr.constructor.name !== "Pawn") {
                        moves = sqr.possibleMoves(this.board, i, j);
                    } else {
                        moves = sqr.getAttackMoves(this.board, i, j);
                    }
                    opponentAllPiecesMoves.push(moves);
                }
            }
        }

        // check whether opponent player attack on given square
        opponentAllPiecesMoves = opponentAllPiecesMoves.flat();
        for (let i = 0; i < opponentAllPiecesMoves.length; i++) {
            let [r, c] = opponentAllPiecesMoves[i];
            if (row === r && col === c) return true; // this means square is not safe
        }
        return false; // this means square is safe
    }

    // Check if the current player has any move that keeps the king safe
    hasAnyLegalMove() {
        const friendAllPiecesMoves = [];

        // Collect every possible move for the current player
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                let piece = this.board.getPiece(i, j);
                if (piece && piece.color === this.#turn) {
                    let allValidMoves = piece.possibleMoves(this.board, i, j);
                    if (allValidMoves.length > 0) {
                        allValidMoves.forEach(function (move) {
                            friendAllPiecesMoves.push({ initial: [i, j], move });
                        })
                    }
                }
            }
        }

        // Simulate every possible move to see if it keeps the king safe
        for (let i = 0; i < friendAllPiecesMoves.length; i++) {
            const { initial, move } = friendAllPiecesMoves[i];
            const moveInfo = this.board.movePiece({ fromRow: initial[0], fromCol: initial[1], toRow: move[0], toCol: move[1] });

            if (this.isKingInCheck(this.#turn)) {
                this.board.undoMove(moveInfo);
            } else {
                this.board.undoMove(moveInfo);
                return true;
            }
        }

        return false;
    }

    // Check whether the specified king is under attack
    isKingInCheck(color) {
        const { kingRow, kingCol } = this.findKing(color);
        const inCheck = this.isSquareUnderAttack(kingRow, kingCol, color === "white" ? "black" : "white");
        return inCheck;
    }

    // check whether the current player is checkmated
    isCheckmate(inCheck, hasMove) {
        if (inCheck && !hasMove) {
            return true;
        }
        return false;
    }

    // Determine whether the game is a stalemate
    isStalemate(inCheck, hasMove) {
        if (!hasMove && !inCheck) {
            return true;
        }
        return false;
    }

    // Evaluate the current game state
    getGameStatus() {
        const inCheck = this.isKingInCheck(this.#turn);
        const hasMove = this.hasAnyLegalMove();
        if (this.isCheckmate(inCheck, hasMove)) {
            this.#isGameOver = true;
            return {
                status: "CHECKMATE",
                winner: this.#turn === "white" ? "black" : "white",
            };
        }
        else if (this.isStalemate(inCheck, hasMove)) {
            this.#isGameOver = true;
            return { status: "STALEMATE" }
        }
        else if (inCheck) return { status: "CHECK", checkedPlayer: this.#turn, };
        return { status: "NORMAL" };
    }
}

export default Chess;