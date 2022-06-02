import Brick from "./Brick";

class Bricks {
    private board: HTMLCanvasElement;
    private rowCnt: number = 3;
    private colCnt: number = 5;
    private brickWidth: number;
    private brickHeight: number = 30;
    private brickGap: number = 5;
    private brickExists: boolean[][];


    constructor(board: HTMLCanvasElement) {
        this.board = board;
        this.brickWidth = (board.width - (this.colCnt + 1) * this.brickGap) / this.colCnt;
        this.brickExists = this.createBrickExists();
    }

    public draw(): void {
        for (let r = 0; r < this.rowCnt; r++) {
            for (let c = 0; c < this.colCnt; c++) {
                if (!this.brickExists[r][c]) continue;

                const brick = this.createBrick(r, c);
                brick.draw();
            }
        }
    }

    public isConflictedByBall(ballX: number, ballY: number): boolean {
        for (let r = 0; r < this.rowCnt; r++) {
            for (let c = 0; c < this.colCnt; c++) {
                if (!this.brickExists[r][c]) continue;

                const brick = this.createBrick(r, c);
                if (brick.isConflictedByBall(ballX, ballY)) {
                    this.brickExists[r][c] = false;
                    return true;
                }
            }
        }
        return false;
    }

    public getBrickExists(): boolean[][] {
        return this.brickExists;
    }

    public isEmptyBricks(): boolean {
        return this.brickExists.every(arr => arr.every(val => !val));
    }

    private createBrick(r: number, c: number): Brick {
        const brickX = this.brickGap + c * (this.brickGap + this.brickWidth);
        const brickY = this.brickGap + r * (this.brickGap + this.brickHeight);

        return new Brick(this.board, brickX, brickY, this.brickWidth, this.brickHeight);
    }

    private createBrickExists() {
        return [...Array(this.rowCnt)].map(() => Array(this.colCnt).fill(true));
    }
}

export default Bricks;
