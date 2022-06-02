class Score {
    private outputEl: HTMLElement;

    constructor(outputEl: HTMLElement) {
        this.outputEl = outputEl;
    }

    public count() {
        this.outputEl.innerHTML += 1;
    }
}

export default Score;
