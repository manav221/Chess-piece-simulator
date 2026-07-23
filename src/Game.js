import board from "./Board.js";
import Piece from "../pieces/piece.js";

let selectedSquare = { row: null, col: null, };
let capturedPieces = [];

function selectPiece(row, col) {
    if (board.getPiece(row, col)) {
        selectedSquare = { row, col };
    }
}
function deselectPiece() {
    selectedSquare = { row: null, col: null };
}
function getMoves() {
    let { row: currentRow, col: currentCol } = selectedSquare;
    let piece = board.getPiece(currentRow, currentCol);
    return piece.possibleMoves(board, currentRow, currentCol);
}
function legalMove(row, col) {
    let moves = getMoves();
    for (let i = 0; i < moves.length; i++) {
        let [r, c] = moves[i];
        if (row === r && col === c) {
            return true;
        }
    }
    // return false;
}

function clickOnSquare(row, col) {
    let piece = board.getPiece(row, col);
    let selectedPiece = board.getPiece(selectedSquare.row, selectedSquare.col);

    // their is selected piece
    if (selectedPiece) {
        // for friendly piece change selection
        if (piece?.color === selectedPiece?.color) {
            selectPiece(row, col);
            return getMoves();
        }
        // legal//illegal move
        if (legalMove(row, col)) {
            let capturedPiece = board.movePiece({
                fromRow: selectedSquare.row,
                fromCol: selectedSquare.col,
                toRow: row, toCol: col
            });
            if (capturedPiece) {
                capturedPieces.push(capturedPiece);
                return capturedPieces;
            }
            console.log("Piece is moved successfully.");
            deselectPiece();
            return 0;
        } else {
            deselectPiece();
            console.log("deselected!");
            return null;
        }
    }
    
    // their is no selected piece
    if(piece) {
        selectPiece(row, col);
        return getMoves();
    }else{
        return null;
    }
}

export { clickOnSquare };