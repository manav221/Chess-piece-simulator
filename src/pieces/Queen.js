import Piece from "./piece.js";

class Queen extends Piece {
    constructor(color) {
        super(color, color === "black" ? "bQ" : "wQ")
    }

    possibleMoves(board,currentRow, currentCol) {
        let possibleMoves = [];

        // down-right
        for (let i = 1; i < 8; i++) {
            let row = currentRow + i;
            let col = currentCol + i;
            if (row >= 8 || col >= 8) break;

            let piece = board.getPiece(row,col);

            if (piece === null) {
                possibleMoves.push([row, col]);
            } else if (piece.color !== this.color) {
                possibleMoves.push([row, col]);
                break;
            } else {
                break;
            }
        }

        // down-left
        for (let i = 1; i < 8; i++) {
            let row = currentRow + i;
            let col = currentCol - i;

            if (row >= 8 || col < 0) break;

            let piece = board.getPiece(row, col);

            if (piece === null) {
                possibleMoves.push([row, col]);
            } else if (piece.color !== this.color) {
                possibleMoves.push([row, col]);
                break;
            } else {
                break;
            }
        }

        // up-right
        for (let i = 1; i < 8; i++) {
            let row = currentRow - i;
            let col = currentCol + i;

            if (row < 0 || col >= 8) break;
            
            let piece = board.getPiece(row, col);

            if (piece === null) {
                possibleMoves.push([row, col]);
            } else if (piece.color !== this.color) {
                possibleMoves.push([row, col]);
                break;
            } else {
                break;
            }
        }

        // up-left
        for (let i = 1; i < 8; i++) {
            let row = currentRow - i;
            let col = currentCol - i;

            if (row < 0 || col < 0) break;

            let piece = board.getPiece(row, col);

            if (piece === null) {
                possibleMoves.push([row, col]);
            } else if (piece.color !== this.color) {
                possibleMoves.push([row, col]);
                break;
            } else {
                break;
            }
        }

        // down vertical
        for (let i = 1; i < 8; i++) {
            let row = currentRow + i;

            if (row >= 8) break;

            let piece = board.getPiece(row, currentCol);

            if (piece === null) {
                possibleMoves.push([row, currentCol]);
            } else if (piece.color !== this.color) {
                possibleMoves.push([row, currentCol]);
                break;
            } else {
                break;
            }
        }

        // right horizontal
        for (let i = 1; i < 8; i++) {
            let col = currentCol + i;

            if (col >= 8) break;

            let piece = board.getPiece(currentRow, col);

            if (piece === null) {
                possibleMoves.push([currentRow, col]);
            } else if (piece.color !== this.color) {
                possibleMoves.push([currentRow, col]);
                break;
            } else {
                break;
            }
        }

        // up vertical
        for (let i = 1; i < 8; i++) {
            let row = currentRow - i;

            if (row < 0) break;
            
            let piece = board.getPiece(row, currentCol);

            if (piece === null) {
                possibleMoves.push([row, currentCol]);
            } else if (piece.color !== this.color) {
                possibleMoves.push([row, currentCol]);
                break;
            } else {
                break;
            }
        }

        // left horizontal
        for (let i = 1; i < 8; i++) {
            let col = currentCol - i;

            if (col < 0) break;

            let piece = board.getPiece(currentRow, col);

            if (piece === null) {
                possibleMoves.push([currentRow, col]);
            } else if (piece.color !== this.color) {
                possibleMoves.push([currentRow, col]);
                break;
            } else {
                break;
            }
        }

        return possibleMoves;
    }
}

export default Queen;