import GameEngine from "./libraries/gameEngine.js";

const game = new GameEngine('game-container');

/*
	*This is just for me to understand and reference later*

	Page loads, app.js constructs GameEngine.

	GameBoard created (empty board). gameBoard.renderBoard('game-container') draws empty cells.

	UserInput.attachEvents() attaches one click and contextmenu listener to #game-container.

	On first left-click:

		UserInput finds row/col of clicked cell and calls GameLogic.revealCell(row,col).

		GameLogic sees firstClick === true ? calls gameBoard.placeBombs(row,col)

			bombs placed avoiding clicked cell

			calculateNumbers() sets counts

		The clicked cell is marked revealed=true, revealedCount++.

		If count === 0 ? revealEmptyNeighbours() expands region (revealing neighbors recursively).

		Re-render via gameBoard.renderBoard('game-container').

	Right-click (contextmenu) calls GameLogic.toggleFlag(row,col):

		toggles flagged boolean if not revealed

		calls renderBoard() to show/remove flag image or emoji.

	If a bomb was revealed ? revealAllBombs() executed and gameOver set true.

	Win check checks revealedCount === totalCells - bombs.

	Reset button calls GameLogic.reset():

		resets flags/counters, createBoard(), render board again.

		do NOT reattach input listeners — because they are attached to container and continue to work.
/*