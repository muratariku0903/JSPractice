// ベースクラスを用意してctxをプロパティにセットする

class Brick {
    private ctx: CanvasRenderingContext2D;
    private x: number = 0;
    private y: number = 0;
    private w: number = 75;
    private h: number = 30;
    private bgc: string = "brown";

    constructor(board: HTMLCanvasElement, x: number, y: number, w: number, h: number) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        const ctx = board.getContext('2d');
        if (ctx) {
            this.ctx = ctx;
        } else {
            throw ('フィールドが設定されていません。');
        }
    }

    public draw(): void {
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.w, this.h);
        this.ctx.fillStyle = this.bgc;
        this.ctx.fill();
        this.ctx.closePath();
    }

    public isConflictedByBall(ballX: number, ballY: number): boolean {
        if (ballX < this.x) return false;

        if (ballX > this.x + this.w) return false;

        if (ballY < this.y) return false;

        if (ballY > this.y + this.h) return false;

        return true;
    }
}

export default Brick;
