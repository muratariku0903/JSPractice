import Ball from "./Ball";
import Paddle from "./Paddle";

class BbpView {
    // カンバスの大きさは一番親クラスであるこいつが管理する
    private board: HTMLCanvasElement;
    private canvasWidth: number;
    private canvasHeight: number;
    private ctx: CanvasRenderingContext2D;
    // 描画される図形はカンバスの領域内じゃないとダメ
    // ボールは外部から受け取った方が良いかもしれない（ボールクラスを作るかも）

    // これらをコンストラクで初期化すれば良いかもしれない
    // private Ball　状態として管理したい
    private ball: Ball;

    private paddle: Paddle;

    // board
    private boardTop: number = 0;
    private boardLeft: number = 0;
    private boardWidth: number = 600;
    private boardHeight: number = 400;
    private boardBackgroundColor: string = "gray";


    constructor(board: HTMLCanvasElement) {
        this.board = board;
        this.canvasWidth = board.width;
        this.canvasHeight = board.height;
        this.ball = new Ball(board);
        this.paddle = new Paddle(board);
        const ctx = board.getContext('2d');
        if (ctx) {
            this.ctx = ctx;
        } else {
            throw ('error');
        }
    }

    public createBoard(): void {
        console.log('create board');
        this.ctx.beginPath();
        this.ctx.rect(this.boardTop, this.boardLeft, this.boardWidth, this.boardHeight);
        this.ctx.fillStyle = this.boardBackgroundColor;
        this.ctx.fill();
        this.ctx.closePath();
    }

    public moveBall(): void {
        setInterval(() => this.drawBall(), 1000);
    }

    public setPaddle(): void {
        this.paddle.draw();
    }

    private drawBall() {
        if (this.isConflictX()) {
            this.ball.reverseDX();
        }
        if (this.isConflictY()) {
            this.ball.reverseDY();
        }

        this.ball.draw();

        this.ball.updateX();
        this.ball.updateY();
    }

    private isConflictX(): boolean {
        const x = this.ball.getX();
        const dx = this.ball.getDX();
        const r = this.ball.getR();

        return x + dx > this.canvasWidth - r || x + dx < r;
    }

    private isConflictY(): boolean {
        const y = this.ball.getY();
        const dy = this.ball.getDY();
        const r = this.ball.getR();

        return y + dy > this.canvasHeight - r || y + dy < r;
    }

    public setBoardTop(top: number): void {
        this.boardTop = top;
    }

    public setBoardLeft(left: number): void {
        this.boardLeft = left;
    }

    public setBoardWidth(width: number): void {
        this.boardWidth = width;
    }

    public setBoardHeight(height: number): void {
        this.boardHeight = height;
    }

    public setBoardBackgroundColor(bgColor: string): void {
        this.boardBackgroundColor = bgColor;
    }
}

export default BbpView;
