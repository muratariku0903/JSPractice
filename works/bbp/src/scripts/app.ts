import Board from './controller/Board';


const board = document.getElementById('board');

const boardController = new Board();
boardController.start();
