import Ball from '../view/Ball';
import BbpView from '../view/Bbp';
import Paddle from '../view/Paddle';

// 外部からの入力値を元にモデルとビューを制御する
// こいつがそれぞれのコンポーネントをプロパティにセットするのもアリなのかな
class BbpController {
    private board: HTMLCanvasElement;
    private cw: number;
    private ch: number;
    private keyRightPressed: boolean = false;
    private keyLeftPressed: boolean = false;
    private ball: Ball;
    private paddle: Paddle;
    private timerId: NodeJS.Timer | null = null;

    constructor(board: HTMLCanvasElement) {
        this.board = board;
        this.cw = board.width;
        this.ch = board.height;
        this.paddle = new Paddle(board);
        this.ball = new Ball(board);
    }

    // ゲームを開始
    public start() {
        console.log('start');
        this.timerId = setInterval(() => this.draw(), 10);
    }


    // ゲームを終了
    public end() {
        console.log('end');
        if (this.timerId) clearInterval(this.timerId);
    }

    private draw() {
        this.drawBall();
        this.drawPaddle();
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

    private drawBall(): void {
        if (this.isBallConflictX()) {
            this.ball.reverseDX();
        }
        if (this.isBallConflictY()) {
            this.ball.reverseDY();
        }

        this.ball.draw();

        this.ball.updateX();
        this.ball.updateY();
    }

    private drawPaddle(): void {
        if (this.keyRightPressed && !this.isPaddleConflictRight()) {
            this.paddle.moveRight();
        }

        if (this.keyLeftPressed && !this.isPaddingConflictLeft()) {
            this.paddle.moveLeft();
        }

        this.paddle.draw();
    }

    private isBallConflictX(): boolean {
        const x = this.ball.getX();
        const dx = this.ball.getDX();
        const r = this.ball.getR();

        return x + dx > this.cw - r || x + dx < r;
    }

    private isBallConflictY(): boolean {
        const y = this.ball.getY();
        const dy = this.ball.getDY();
        const r = this.ball.getR();

        return y + dy > this.ch - r || y + dy < r;
    }

    private isPaddleConflictRight(): boolean {
        const x = this.paddle.getX();
        const w = this.paddle.getW();

        return x >= this.cw - w;
    }

    private isPaddingConflictLeft(): boolean {
        return this.paddle.getX() <= 0;
    }
}

export default BbpController;
