import BbpController from './controller/Bbp';


const board = document.getElementById('board') as HTMLCanvasElement;
const endBtn = document.getElementById('end_btn') as HTMLElement;
const score = document.getElementById('score') as HTMLElement;

const bbpController = new BbpController(board, score);

bbpController.start();
document.addEventListener('keydown', (e: KeyboardEvent) => bbpController.keyDownHandler(e), false);
document.addEventListener('keyup', (e: KeyboardEvent) => bbpController.keyUpHandler(e), false);
endBtn.addEventListener('click', () => bbpController.end());
