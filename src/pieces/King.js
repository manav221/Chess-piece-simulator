import Piece from "./piece.js";

class King extends Piece {
    constructor(color) {
        super(color, color === "black" ? "bK" : "wK")
    }

    possibleMoves(board,currentRow, currentCol) {
        const possibleMoves = [];
        const offsets = [
            [1, 0], [1, 1], [1, -1],
            [-1, 0], [-1, 1], [-1, -1],
            [0, 1], [0, -1]
        ]

        for (let i = 0; i < offsets.length; i++) {
            let [r, c] = offsets[i];
            let newRow = currentRow + r;
            let newCol = currentCol + c;

            if(newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                let piece = board.getPiece(newRow,newCol);

                if(piece === null) possibleMoves.push([newRow,newCol]);
                else if(piece.color !== this.color) possibleMoves.push([newRow,newCol]);
            };
        }

        return possibleMoves;
    }
}

export default King;