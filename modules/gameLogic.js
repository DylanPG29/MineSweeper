class GameLogic {
    constructor(gameBoard) {
        this.gameBoard = gameBoard
        this.currentPlayer = 'X';
        this.gameOver = false;
        this.statusEl = document.getElementById('status');
    }

    makeMove(index) {
        if (this.gameOver || this.gameBoard.board[index]) return;

        this.gameBoard.updateCell(index, this.currentPlayer);

        this.gameBoard.renderBoard('game-container');

        if (this.checkWin()) {
            this.gameOver = true;
            if (this.statusEl) this.statusEl.textContent = `Player ${this.currentPlayer} wins`;
            return;
        }

        if (this.checkDraw()) {
            this.gameOver = true;
            if (this.statusEl) this.statusEl.textContent = "It's a draw";
            return;
        }

        this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
        if (this.statusEl) this.statusEl.textContent = `Player ${this.currentPlayer}'s turn`;
    }


    checkWin = () => {

        const brd = this.gameBoard.board;
        const winCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6], // Diagonals
        ]

        return winCombos.some(([a, b, c]) => {
            return brd[a] &&
                brd[a] === brd[b] &&
                brd[a] === brd[c];
        });
    }

    checkDraw() {
        return this.gameBoard.board.every(cell => cell);
    }

    reset() {
        this.currentPlayer = 'X';
        this.gameOver = false;
        this.gameBoard.reset();
    }
}

export default GameLogic;