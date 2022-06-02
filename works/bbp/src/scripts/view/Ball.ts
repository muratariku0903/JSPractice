class Ball {
    private ctx: CanvasRenderingContext2D;
    private x: number = 600;
    private dx: number = 3;
    private y: number = 0;
    private dy: number = 3;
    private r: number = 20;
    private bgc: string = "green";

    constructor(board: HTMLCanvasElement) {
        this.x = board.width / 2;
        this.y = board.height / 2;
        const ctx = board.getContext('2d');
        if (ctx) {
            this.ctx = ctx;
        } else {
            throw ('フィールドが設定されていません。');
        }
    }

    public draw(): void {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.bgc;
        this.ctx.fill();
        this.ctx.closePath();
    }

    public reverseDX(): void {
        this.setDX(-1 * this.getDX());
    }

    public reverseDY(): void {
        this.setDY(-1 * this.getDY());
    }

    public updateX(): void {
        this.setX(this.x + this.dx);
    }

    public updateY(): void {
        this.setY(this.y + this.dy);
    }

    public getX(): number {
        return this.x;
    }

    public setX(x: number) {
        this.x = x;
    }

    public getY(): number {
        return this.y;
    }

    public setY(y: number) {
        this.y = y;
    }

    public getDX(): number {
        return this.dx;
    }

    public setDX(dx: number): void {
        this.dx = dx;
    }

    public getDY(): number {
        return this.dy;
    }

    public setDY(dy: number): void {
        this.dy = dy;
    }

    public getR(): number {
        return this.r;
    }

    public setR(r: number): void {
        this.r = r;
    }
}

export default Ball;
