import Piece from "./piece.js";

class Knight extends Piece {
    constructor(color) {
        super(color)
    }

    possibleMoves(board,currentRow, currentCol) {
        const possibleMoves = [];
        const offsets = [
            [2, 1], [2, -1], [-2, 1],
            [-2, -1], [1, 2], [-1, 2],
            [-1, -2], [1, -2]
        ]

        for (let i = 0; i < offsets.length; i++) {
            let [r, c] = offsets[i];
            let newRow = currentRow + r;
            let newCol = currentCol + c;

            if (newRow >= 8 || newRow < 0 || newCol >= 8 || newCol < 0) continue;
            
            let piece = board.grid[newRow][newCol];

            if (piece === null) possibleMoves.push([newRow, newCol]);
            else if (piece.color !== this.color) {
                possibleMoves.push([newRow, newCol]);
            }
        }

        return possibleMoves;
    }
}

export default Knight;