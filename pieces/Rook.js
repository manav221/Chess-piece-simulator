import Piece from "./piece.js";

class Rook extends Piece {
    constructor(color) {
        super(color)
    }

    possibleMoves(board,currentRow, currentCol) {
        let possibleMoves = [];

        // down vertical
        for (let i = 1; i < 8; i++) {
            let row = currentRow + i;

            if (row >= 8) break;

            let piece = board.grid[row][currentCol];

            if (piece === null) {
                possibleMoves.push([row, currentCol]);
            } else if (piece.color !== this.color) {
                possibleMoves.push([row, currentCol]);
                break;
            } else {
                break;
            }
        }

        return possibleMoves;
    }
}

export default Rook;