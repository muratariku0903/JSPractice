class Score {
    private score: number = 0;
    private outputEl: HTMLElement;

    constructor(outputEl: HTMLElement) {
        this.outputEl = outputEl;
    }

    public count() {
        this.outputEl.innerHTML = String(++this.score);
    }
}

export default Score;
