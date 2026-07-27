import Piece from "./pieces/piece.js";

let chessBoard = document.querySelector(".chess-board");
const symbols = {
    wK: "&#9812;",
    bK: "&#9818;",
    wQ: "&#9813;",
    bQ: "&#9819;",
    wn: "&#9816;",
    bn: "&#9822;",
    wB: "&#9815;",
    bB: "&#9821;",
    wR: "&#9814;",
    bR: "&#9820;",
    wP: "&#9817;",
    bP: "&#9823;"
}

// Render the chessboard for the first time
function initialRender(board, selectedSquare) {
    render(board, selectedSquare);
}

// Create a single square on the chessboard
function createSquare(color, row, col, cn) {
    let div = document.createElement("div");
    div.className = `square ${color} ${cn}`;
    div.dataset.row = row;
    div.dataset.col = col;
    return div;
}

// Draw the entire chessboard and all pieces
function render(board, selectedSquare) {
    // clear board before re-render
    chessBoard.innerHTML = "";

    const grid = board.grid;
    const { row: selectedRow, col: selectedCol } = selectedSquare;

    // Create all 64 squares
    for (let row = 0; row < grid.length; row++) {

        // Decide the starting color for the current row
        let isEvenRow = (row + 1) % 2 === 0;
        let color = isEvenRow ? "dark-square" : "light-square";

        for (let col = 0; col < grid[row].length; col++) {
            let square;
            let isPiece = board.getPiece(row, col);

            // Highlight the selected piece
            if (selectedRow === row && selectedCol === col && isPiece) {
                square = createSquare(color, row, col, "selected-square");
            } else {
                square = createSquare(color, row, col);
            }

            // Draw the piece if the square is occupied
            if (isPiece) {
                let piece = document.createElement("span");
                piece.style.color = isPiece.color;
                piece.className = "piece";
                piece.innerHTML = symbols[isPiece.codeName];
                square.appendChild(piece);
            }
            chessBoard.appendChild(square);
            color = color === "dark-square" ? "light-square" : "dark-square";
        }
    }

    // Highlight all legal moves of the selected piece
    highlightPossibleMoves(board, selectedSquare);
}

// highlight the possible move of a selected piece
function highlightPossibleMoves(board, selectedSquare) {
    const squares = [];

    // Get the selected piece
    const { row, col } = selectedSquare;
    const piece = board.getPiece(row, col);

    if (piece) {
        // Map every board position to its DOM element
        chessBoard.childNodes.forEach(function (sqr) {
            let sqrRow = parseInt(sqr.dataset.row);
            let sqrCol = parseInt(sqr.dataset.col);
            squares[`${sqrRow},${sqrCol}`] = sqr;
        })

        // Mark every legal move
        piece.possibleMoves(board, row, col).forEach(function (move) {
            let div = document.createElement("div");
            div.className = "valid-move";
            let [row, col] = move;
            squares[`${row},${col}`].appendChild(div);
        })
        return;
    }

}

export { initialRender, render, highlightPossibleMoves }