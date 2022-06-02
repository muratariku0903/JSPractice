import BbpController from './controller/Bbp';


const board = document.getElementById('board') as HTMLCanvasElement;
const startBtn = document.getElementById('start_btn') as HTMLElement;
const endBtn = document.getElementById('end_btn') as HTMLElement;
const score = document.getElementById('score') as HTMLElement;
const dialog = document.getElementById('dialog') as HTMLElement;

const bbpController = new BbpController(board, score, dialog);

startBtn.addEventListener('click', () => bbpController.start());
endBtn.addEventListener('click', () => bbpController.end());
document.addEventListener('keydown', (e: KeyboardEvent) => bbpController.keyDownHandler(e), false);
document.addEventListener('keyup', (e: KeyboardEvent) => bbpController.keyUpHandler(e), false);
document.addEventListener('mousemove', (e: MouseEvent) => bbpController.mouseMoveHandler(e), false);
