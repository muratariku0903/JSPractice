import Ball from '../view/Ball';
import Board from '../view/Board';
import Paddle from '../view/Paddle';
import Bricks from '../view/Bricks';
import Score from '../view/Score';
import Dialog from '../view/Dialog';

class BbpController {
    private cw: number;
    private ch: number;
    private coLeft: number;
    private isPlaying: boolean = false;
    private keyRightPressed: boolean = false;
    private keyLeftPressed: boolean = false;
    private board: Board;
    private ball: Ball;
    private paddle: Paddle;
    private bricks: Bricks;
    private score: Score;
    private dialog: Dialog;
    private timerId: NodeJS.Timer | null = null;

    constructor(boardEl: HTMLCanvasElement, outputEl: HTMLElement, dialogEl: HTMLElement) {
        this.cw = boardEl.width;
        this.ch = boardEl.height;
        this.coLeft = boardEl.offsetLeft;
        this.board = new Board(boardEl);
        this.paddle = new Paddle(boardEl);
        this.ball = new Ball(boardEl);
        this.bricks = new Bricks(boardEl);
        this.score = new Score(outputEl);
        this.dialog = new Dialog(dialogEl);

        this.draw();
    }

    public start() {
        this.isPlaying = true;
        this.timerId = setInterval(() => this.draw(), 10);
    }

    public end() {
        this.isPlaying = false;
        if (this.timerId) clearInterval(this.timerId);
    }

    // ここでボールの衝突を検知しても良いかもしれない
    private draw() {
        this.clearBoard();
        this.drawBoard();
        this.drawBall();
        this.drawPaddle();
        this.drawBricks();
        if (this.isDestroyedAllBricks()) {
            this.end();
            this.dialog.openDialog('win');
        }
    }

    public keyDownHandler(e: KeyboardEvent): void {
        if (e.key == 'Right' || e.key == 'ArrowRight') {
            this.keyRightPressed = true;
        } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
            this.keyLeftPressed = true;
        }
    }

    public keyUpHandler(e: KeyboardEvent): void {
        if (e.key == 'Right' || e.key == 'ArrowRight') {
            this.keyRightPressed = false
        } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
            this.keyLeftPressed = false
        }
    }

    public mouseMoveHandler(e: MouseEvent): void {
        if (this.isPlaying && this.isCursorInCanvas(e)) {
            const cursorXInCanvas = e.clientX - this.coLeft;
            const paddleW = this.paddle.getW();
            this.paddle.setX(cursorXInCanvas - paddleW / 2);
            this.paddle.draw();
        }
    }

    private drawBoard(): void {
        this.board.draw();
    }

    private clearBoard(): void {
        this.board.clear();
    }

    private drawBall(): void {
        if (this.isBallConflictX()) this.ball.reverseDX();

        if (this.isBallConflictTop()) this.ball.reverseDY();

        if (this.isBallConflictBottom()) {
            if (this.isBallConflictPaddle()) {
                this.ball.reverseDY();
            } else {
                this.end();
                this.dialog.openDialog('lose');
            }
        }

        if (this.isBallConflictBrick()) {
            this.ball.reverseDY();
            this.scoreUp();
        }

        this.ball.draw();

        this.ball.updateX();
        this.ball.updateY();
    }

    private drawPaddle(): void {
        if (this.keyRightPressed && !this.isPaddleConflictRight()) this.paddle.moveRight();

        if (this.keyLeftPressed && !this.isPaddingConflictLeft()) this.paddle.moveLeft();

        this.paddle.draw();
    }

    private drawBricks(): void {
        this.bricks.draw();
    }

    private scoreUp(): void {
        this.score.count();
    }

    private isBallConflictX(): boolean {
        const x = this.ball.getX();
        const dx = this.ball.getDX();
        const r = this.ball.getR();

        return x + dx > this.cw - r || x + dx < r;
    }

    private isBallConflictTop(): boolean {
        const y = this.ball.getY();
        const dy = this.ball.getDY();
        const r = this.ball.getR();

        return y + dy < r;
    }

    private isBallConflictBottom(): boolean {
        const y = this.ball.getY();
        const dy = this.ball.getDY();
        const r = this.ball.getR();

        return y + dy > this.ch - r
    }

    // ボールはそれ自体パドルやレンガに関心を持たない。だからコントローラーで管理した
    private isBallConflictPaddle(): boolean {
        const bx = this.ball.getX();
        const px = this.paddle.getX();
        const pw = this.paddle.getW();

        return px <= bx && bx <= px + pw;
    }

    private isBallConflictBrick(): boolean {
        const bx = this.ball.getX();
        const by = this.ball.getY();

        return this.bricks.isConflictedByBall(bx, by);
    }

    private isPaddleConflictRight(): boolean {
        const x = this.paddle.getX();
        const w = this.paddle.getW();

        return x >= this.cw - w;
    }

    private isPaddingConflictLeft(): boolean {
        return this.paddle.getX() <= 0;
    }

    private isDestroyedAllBricks(): boolean {
        return this.bricks.isEmptyBricks();
    }

    private isCursorInCanvas(e: MouseEvent): boolean {
        const relativeX = e.clientX - this.coLeft;

        return 0 < relativeX && relativeX < this.cw;
    }
}

export default BbpController;
