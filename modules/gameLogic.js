class GameLogic {
    constructor(gameBoard) {
        this.gameBoard = gameBoard;
        this.gameOver = false;
        this.statusEl = document.getElementById('status');
        this.revealedCount = 0;
        // Only place bombs after first click
        this.firstClick = true;
        if(this.statusEl)
        {
            this.statusEl.textContent = 'Click a cell to begin!';
        }
    }

    revealCell(row, col) {
        if(this.gameOver)
        {
            return;
        }
        
        const cell = this.gameBoard.board[row][col];
        if(!cell || cell.revealed || cell.flagged)
        {
            return;
        }

        // Place bombs after first click
        if(this.firstClick) {
            this.gameBoard.placeBombs(row, col);
            this.firstClick = false;
        }

        cell.revealed=true;
        this.revealedCount++;

        if(cell.bomb) {
            this.gameOver = true;
            if(this.statusEl){
                this.statusEl.textContent = 'Boom! You hit a mine';
                this.revealAllBombs();
                this.gameBoard.renderBoard('game-container');
                return;
            }
        }

        // If no bombs nearby reveal all neighbouing cells
        if(cell.count === 0) {
            this.revealEmptyNeighbours(row, col);
        }

        this.gameBoard.renderBoard('game-container');

        if(this.checkWin()) {
            this.gameOver = true;
            if(this.statusEl)
            {
                this.statusEl.textContent = "You won!";
            }
        }
    }

    revealEmptyNeighbours(row, col) {
        
        // Each section around cell (same as in calculateNumbers)
        const grid = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],  [0, 1],
            [1, -1],  [1, 0],  [1, 1],
        ];

        for(const [gridrows, gridcols] of grid) {
            const neighborRow = row + gridrows;
            const neighborCol = col + gridcols;

            if(!this.gameBoard.inBounds(neighborRow, neighborCol))
            {
                continue;
            }
            const neighbor = this.gameBoard.board[neighborRow][neighborCol];
            
            if(neighbor.revealed || neighbor.flagged)
            {
                continue;
            }

            neighbor.revealed = true;
            this.revealedCount++;

            // Call function again if the neighboring cell also has a count of 0
            if (neighbor.count === 0 && !neighbor.bomb) {
                this.revealEmptyNeighbours(neighborRow, neighborCol);
            }
        }
    }

    toggleFlag(row, col) {
        if(this.gameOver)
        {
            return;
        }
        const cell = this.gameBoard.board[row][col];
        if(!cell || cell.revealed)
        {
            return;
        }
        cell.flagged = !cell.flagged;

        this.gameBoard.renderBoard('game-container');
    }

    revealAllBombs() {
        for( let row = 0; row < this.gameBoard.rows; row++) {
            for(let col = 0; col < this.gameBoard.cols; col++) {
                const cell = this.gameBoard.board[row][col];
                if(cell.bomb)
                {
                    // Set each cell with a bomb to revealed to reveal them
                    cell.revealed = true;
                }
            }
        }
    }

    // If cells revealed is equal to total cells minus the bombs cells you win
    checkWin() {
        const totalCells = this.gameBoard.rows * this.gameBoard.cols;

        return this.revealedCount === (totalCells - this.gameBoard.bombs);
    }

    reset() {
        this.gameOver = false;
        this.revealedCount = 0;
        this.firstClick = true;
        if(this.statusEl)
        {
            this.statusEl.textContent = 'Click a cell to begin!';
        }
        this.gameBoard.reset();
        this.gameBoard.renderBoard('game-container');
    }
}

export default GameLogic;