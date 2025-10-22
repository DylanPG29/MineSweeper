import GameBoard from '../modules/gameBoard.js';
import GameLogic from '../modules/gameLogic.js';
import UserInput from '../modules/userinput.js';

class GameEngine {
    constructor(containerId) {
        this.containerId = containerId;

        // Decorator patterm.
        // Create something a wrap it to something else again and again
        this.gameBoard = new GameBoard(9, 9);
        this.gameLogic = new GameLogic(this.gameBoard);
        this.userInput = new UserInput(this.gameLogic);

        this.statusEl = document.getElementById('status');
        this.resetBtn = document.getElementById('reset');

        this.gameBoard.renderBoard(this.containerId);

        this.resetBtn?.addEventListener('click', () => {
            this.gameLogic.reset()
            this.gameBoard.renderBoard(this.containerId);
        });
    }
}

export default GameEngine;