import Piece from "./piece.js";

class Pawn extends Piece {
    constructor(color) {
        super(color, color === "black" ? "bP" : "wP")
        this.initialRow = this.color === "white" ? 6 : 1;
        this.direction = this.color === "white" ? -1 : 1; // -1 = up || 1 = down
    }

    possibleMoves(board, currentRow, currentCol) {
        const possibleMoves = [];
        const offsets = {
            white: [[-1, 1], [-1, -1]],
            black: [[1, 1], [1, -1]]
        }
        if (this.isOnStartingRank(currentRow)) {
            for (let i = 1; i < 3; i++) {
                let row = this.direction < 0 ? currentRow - i : currentRow + i;
                let col = currentCol;
                let piece = board.getPiece(row, col);
                if (!piece) {
                    possibleMoves.push([row, col]);
                }else break;
            }
        }else{
            let row = currentRow + this.direction;
            let col = currentCol;
            let piece = board.getPiece(row,col);
            if(!piece){
                possibleMoves.push([row,col]);
            }
        }
        for (let i = 0; i < offsets[this.color].length; i++) {
            let [r, c] = offsets[this.color][i];
            let row = currentRow + r;
            let col = currentCol + c;
            let piece = board.getPiece(row, col);
            if (piece && piece.color !== this.color) {
                possibleMoves.push([row, col]);
            }
        }
        return possibleMoves;
    }

    isOnStartingRank(row) {
        if (this.initialRow === row) return true;
        return false;
    }

}

export default Pawn;