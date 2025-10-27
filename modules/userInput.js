class UserInput {
    constructor(gameBoard, gameLogic) {
        this.gameBoard = gameBoard;
        this.gameLogic = gameLogic;
    }
    // Got this from google dont really understand but works
    attachEvents() {
        const container = document.getElementById('game-container');
        container.addEventListener('click', (e) => {
            const cell = e.target.closest('.cell');
            if (!cell) return;
            const row = +cell.dataset.row;
            const col = +cell.dataset.col;
            this.gameLogic.revealCell(row, col);
        });

        
        container.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            const cell = e.target.closest('.cell');
            if (!cell) return;
            const row = +cell.dataset.row;
            const col = +cell.dataset.col;
            this.gameLogic.toggleFlag(row, col);
        });
    }
}

export default UserInput;