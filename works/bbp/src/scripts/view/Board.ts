class Board {
    private ctx: CanvasRenderingContext2D;
    private x: number = 0;
    private y: number = 0;
    private w: number = 75;
    private h: number = 10;
    private bgc: string = "gray";


    constructor(board: HTMLCanvasElement) {
        this.w = board.width;
        this.h = board.height;
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

    public clear(): void {
        this.ctx.clearRect(this.x, this.y, this.w, this.h);
    }
}

export default Board;
