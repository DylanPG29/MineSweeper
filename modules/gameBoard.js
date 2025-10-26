class GameBoard {
    constructor(rows = 9, cols = 9, bombs = 10) {
        this.rows = rows;
        this.cols = cols;
        this.bombs=bombs;
        this.board = this.createBoard();
    }

    createBoard() {
        this.board = Array.from({ length: this.rows }, () => 
            Array.from({ length: this.cols }, () => ({ 
                revealed: false,
                flagged: false,
                bomb: false, 
                count: 0,
        }))
        );
        return this.board;
    }

    placeBombs(rowAvoid = -1, colAvoid = -1){
        let placed = 0;
        while(placed < this.bombs){
            const row = Math.floor(Math.random() * this.rows);
            const col = Math.floor(Math.random() * this.cols);

            if((row === rowAvoid && col === colAvoid) || this.board[row][col].bomb)
            {
                continue;
            }

            this.board[row][col].bomb = true;
            placed++
        }
        this.calculateNumbers();
    }

    calculateNumbers() {
        const grid = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],           [0, 1],
            [1, -1],  [1, 0],  [1, 1],
        ];

        for(let row = 0; row < this.rows; row++){
            for(let col = 0; col < this.cols; col++) {
                if(this.board[row][col].bomb) {
                    this.board[row][col].count = -1;
                    continue;
                }

                let count = 0;
                for(const [rowOffset, colOffset] of grid) {
                    const neighborRow = row + rowOffset;
                    const neighborCol = col + colOffset;
                    if (neighborRow >= 0 && neighborRow < this.rows && neighborCol >= 0 && neighborCol < this.cols) {
                        if (this.board[neighborRow][neighborCol].bomb){
                            count++;
                        }
                    }
                }
                this.board[row][col].count = count;
            }
        }
    }

    inBounds(row, col) {
        return row >= 0 && row < this.rows && col >= 0 && col < this.cols;
    }

    renderBoard(containerId) {
        const container = document.getElementById(containerId);

        container.innerHTML = '';

        for(let row = 0; row < this.rows; row++){
            for(let col = 0; col < this.cols; col++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = row;
                cell.dataset.col = col;

                const data = this.board[row][col];

                if(data.revealed) {
                    cell.classList.add('revealed');
                    if(data.bomb) {
                        const bombImg = document.createElement('img');
                        bombImg.src = './Bomb.png';
                        bombImg.alt = 'Bomb';
                        bombImg.classList.add('bomb-icon');
                        cell.appendChild(bombImg);

                    } else if (data.count > 0) {
                        cell.textContent = data.count;
                        cell.classList.add(`num-${data.count}`);
                    } else {
                        cell.textContent = '';
                    }
                } else {
                    if(data.flagged) {
                        const flagImg = document.createElement('img');
                        flagImg.src = './Flag.png';
                        flagImg.alt = 'Flag';
                        flagImg.classList.add('flag-icon');
                        cell.appendChild(flagImg);
                    } else {
                        cell.textContent = '';
                    }
                }
                container.appendChild(cell);
            }
        }
    }

    reset() {
        this.board = this.createBoard();
    }
}

export default GameBoard;