import board from "./Board.js";
import Piece from "../pieces/piece.js";

let selectedSquare = { row: null, col: null, };
let capturedPieces = [];
let chance = "white";

class Game{
    constructor(board){
        this.board = board;
        this.selectedSquare = { row: null, col: null, };
        this.capturedPieces = [];
        this.turn = "white";
    }

    // turn
    isCurrentPlayerPiece(piece) {
        if (piece?.color === this.turn) return true;
        return false;
    }
    changeTurn() {
        return this.turn === "black" ? "white" : "black";
    }
    
    // selection
    selectPiece(row, col) {
        if (this.board.getPiece(row, col)) {
            this.selectedSquare = { row, col };
        }
    }
    deselectPiece() {
        this.selectedSquare = { row: null, col: null };
    }

    // move
    getMoves() {
        let { row: currentRow, col: currentCol } = this.selectedSquare;
        let piece = this.board.getPiece(currentRow, currentCol);
        return piece.possibleMoves(board, currentRow, currentCol);
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

    // process click that happens on square
    processClick(row, col) {
        let piece = this.board.getPiece(row, col);
        let selectedPiece = this.board.getPiece(this.selectedSquare.row, this.selectedSquare.col);
    
        // their is selected piece
        if (selectedPiece) {
    
            // for friendly piece change selection
            if (piece?.color === selectedPiece?.color) {
                this.selectPiece(row, col);
                return this.getMoves();
            }
            // legal//illegal move
            if (this.legalMove(row, col)) {
                let capturedPiece = this.board.movePiece({
                    fromRow: this.selectedSquare.row,
                    fromCol: this.selectedSquare.col,
                    toRow: row, toCol: col
                });
                this.turn = this.changeTurn();
                this.deselectPiece();
                if (capturedPiece) {
                    this.capturedPieces.push(capturedPiece);
                    return this.capturedPieces;
                }
                return "Piece is moved successfully.";
            } else {
                this.deselectPiece();
                return "deselected!";
            }
        }
    
        // their is no selected piece
        if (piece) {
            this.selectPiece(row, col);
            return this.getMoves();
        } else {
            return null;
        }
    }

    // handle click on square
    clickOnSquare(row, col) {
        let piece = this.board.getPiece(row, col);
        let selectedPiece = this.board.getPiece(this.selectedSquare.row, this.selectedSquare.col);
    
        // Empty square → attempt move.
        if (!piece) return processClick(row, col);
    
        // Opponent's piece or a empty sqr while a piece is selected → attempt capture.
        if (selectedPiece && !this.isCurrentPlayerPiece(piece)) return this.processClick(row, col);
    
        // Opponent's piece with no valid selection → ignore.
        if (piece && !this.isCurrentPlayerPiece(piece)) return "NOT_YOUR_TURN";
    
        // Own piece → select/change selection.
        return this.processClick(row, col);
    }
}