import GameBoard from '../modules/gameBoard.js';
import GameLogic from '../modules/gameLogic.js';
import UserInput from '../modules/userInput.js';

class GameEngine {
    constructor(containerId) {
        this.containerId = containerId;

        this.gameBoard = new GameBoard(9, 9, 10);
        this.gameLogic = new GameLogic(this.gameBoard);
        this.userInput = new UserInput(this.gameBoard, this.gameLogic);

        this.statusEl = document.getElementById('status');
        this.resetBtn = document.getElementById('reset');

        this.gameBoard.renderBoard(this.containerId);

        this.userInput.attachEvents();

        this.resetBtn?.addEventListener('click', () => {
            this.gameLogic.reset();
            this.userInput.attachEvents();
        });
    }
}

export default GameEngine;