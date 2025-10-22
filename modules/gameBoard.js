class GameBoard {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.board = this.createBoard();
    }

    createBoard() {
        return Array.from({ length: this.rows * this.cols }, () => '');
    }

    renderBoard(containerId) {
        const container = document.getElementById(containerId);

        container.innerHTML = '';
        for (let index = 0; index < this.board.length; index++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = index;
            cell.textContent = this.board[index] || '';
            container.appendChild(cell);
        }
        console.log(this.board);
    }

    makeBombs(containerId) {
        container.innerHTML = '';
        for (let bombCounter = 0; bombCounter < 10; bombCounter++) {
            let randNum = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
            this.board[index] = 'b';
        }
        console.log(this.board);
    }
    updateCell(index, value) {
        this.board[index] = value;
    }

    reset() {
        this.board = this.createBoard();
    }
}

export default GameBoard;