import Piece from "./piece.js";

class Bishop extends Piece {
    constructor(color) {
        super(color)
    }

    possibleMoves(board,currentRow, currentCol) {
        let possibleMoves = [];

        // down-right movement
        for (let i = 1; i < 8; i++) {
            let row = currentRow + i;
            let col = currentCol + i;
            if (row >= 8 || col >= 8) break;

            let piece = board.grid[row][col];

            if (piece === null) {
                possibleMoves.push([row, col]);
            } else if (piece.color !== this.color) {
                possibleMoves.push([row, col]);
                break;
            } else {
                break;
            }
        }

        return possibleMoves;
    }
}

export default Bishop;