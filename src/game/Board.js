import Rook from '../pieces/Rook.js';
import Bishop from '../pieces/Bishop.js';
import Knight from '../pieces/Knight.js';
import Queen from '../pieces/Queen.js';
import King from '../pieces/King.js';
import Pawn from '../pieces/Pawn.js';

class Board {
    constructor() {
        this.grid = [
            [
                new Rook("black"),
                new Knight("black"),
                new Bishop("black"),
                new Queen("black"),
                new King("black"),
                new Bishop("black"),
                new Knight("black"),
                new Rook("black"),
            ],
            [
                new Pawn("black"),
                new Pawn("black"),
                new Pawn("black"),
                new Pawn("black"),
                new Pawn("black"),
                new Pawn("black"),
                new Pawn("black"),
                new Pawn("black"),
            ],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [
                new Pawn("white"),
                new Pawn("white"),
                new Pawn("white"),
                new Pawn("white"),
                new Pawn("white"),
                new Pawn("white"),
                new Pawn("white"),
                new Pawn("white"),
            ],
            [
                new Rook("white"),
                new Knight("white"),
                new Bishop("white"),
                new Queen("white"),
                new King("white"),
                new Bishop("white"),
                new Knight("white"),
                new Rook("white"),
            ],
        ];
    }

    // Return the piece at the given position
    getPiece(row, col) {
        if (row !== null && col !== null) {
            return this.grid[row][col];
        }
        return null;
    }

    // Move a piece and return the move details
    movePiece({ fromRow: row, fromCol: col, toRow: newRow, toCol: newCol }) {
        let sourcePiece = this.grid[row][col]
        this.grid[row][col] = null;
        let capturedPiece = this.removePiece(newRow, newCol);
        this.grid[newRow][newCol] = sourcePiece;

        // Return everything that needed to undo this move later
        return { sourcePiece, capturedPiece, row, col, newRow, newCol };
    }

    // Remove and return the piece at the given position
    removePiece(row, col) {
        let piece = this.grid[row][col];
        if (piece) this.grid[row][col] = null;
        return piece;
    }

    // Restore the board to its previous state
    undoMove(moveInfo) {
        const { sourcePiece, capturedPiece } = moveInfo;
        const { row, col, newRow, newCol } = moveInfo;
        this.movePiece({ fromRow: newRow, fromCol: newCol, toRow: row, toCol: col });
        if (moveInfo.capturedPiece) {
            this.grid[newRow][newCol] = capturedPiece;
        }
    }
}

export default Board;