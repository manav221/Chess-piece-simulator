import Piece from "./pieces/piece.js";

let chessBoard = document.querySelector(".chess-board");
const symbols = {
    K: "kng",
    Q: "Que",
    R: "R",
    B: "B",
    N: "Kngt"
}

function render(board) {
    let grid = board.grid;
    for (let row = 0; row < grid.length; row++) {
        let isEvenRow = (row+1)%2 === 0;
        let color = isEvenRow ?  "dark-square" : "light-square";
        for (let col = 0; col < grid[row].length; col++) {
            let div = document.createElement("div");
            div.className = `square ${color}`;
            let isPiece = board.getPiece(row,col);
            if(isPiece){
                let piece = document.createElement("span");
                piece.style.color = isPiece.color;
                piece.textContent = isPiece.constructor.name;
                piece.dataset.row = row;
                piece.dataset.col = col;
                div.appendChild(piece);
            }
            chessBoard.appendChild(div);
            color = color === "dark-square" ? "light-square" : "dark-square";
        }
    }
}

export { render }