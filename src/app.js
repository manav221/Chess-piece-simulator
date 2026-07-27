import Board from './game/Board.js';
import Chess from './game/Game.js';
import { initialRender, render } from './Renderer.js';

const chessBoard = document.querySelector(".chess-board");

// create new chess game with class Chess
const game1 = new Chess(new Board());

// Render the initial board
initialRender(game1.board, { row: null, col: null });

// Handle user clicks on the chessboard
chessBoard.addEventListener("click", function (dets) {
    let row = parseInt(dets.target.dataset.row);
    let col = parseInt(dets.target.dataset.col);

    // Process the clicked square
    const gameResult = game1.clickOnSquare(row, col);
    // showing game result on console
    if(gameResult){
        console.log(gameResult);
    }

    // Update the board after every action
    render(game1.board, game1.selectedSquare);
})