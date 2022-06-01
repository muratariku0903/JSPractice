// 動位置を設定するのと描画はタイミングを統一させる
// バラバラなタイミングでやると処理がわからなくなる

class Paddle {
    private ctx: CanvasRenderingContext2D;
    private x: number = 600;
    private dx: number = 50;
    private y: number = 0;
    private w: number = 75;
    private h: number = 10;
    private bgc: string = "black";

    constructor(board: HTMLCanvasElement) {
        this.y = board.height;
        const ctx = board.getContext('2d');
        if (ctx) {
            this.ctx = ctx;
        } else {
            throw ('フィールドが設定されていません。');
        }
    }

    public draw() {
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y - this.h, this.w, this.h);
        this.ctx.fillStyle = this.bgc;
        this.ctx.fill();
        this.ctx.closePath();
    }

    public moveRight(): void {
        this.setX(this.x + this.dx);
    }

    public moveLeft(): void {
        this.setX(this.x - this.dx);
    }

    public getX(): number {
        return this.x;
    }

    public setX(x: number): void {
        this.x = x;
    }

    public getY(): number {
        return this.y;
    }

    public setY(y: number): void {
        this.y = y;
    }

    public getDX(): number {
        return this.dx;
    }

    public setDX(dx: number): void {
        this.dx = dx;
    }

    public getW(): number {
        return this.w;
    }

    public setW(w: number): void {
        this.w = w;
    }

    public setH(h: number): void {
        this.h = h;
    }
}

export default Paddle;
