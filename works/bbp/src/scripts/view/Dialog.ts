class Dialog {
    dialogEl: HTMLElement;

    constructor(dialogEl: HTMLElement) {
        this.dialogEl = dialogEl;
        this.dialogEl.style.display = 'none';
    }

    public openDialog(type: 'win' | 'lose'): void {
        if (type === 'win') this.dialogEl.textContent = 'おめでとう、ゲームクリア！';

        if (type === 'lose') this.dialogEl.textContent = '残念、ゲーム失敗。';

        this.dialogEl.style.display = 'block';
    }

}

export default Dialog;
