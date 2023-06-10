class MotionController {
	constructor(gameController) {
		this.gameController = gameController;

		const keyActions = {
			ArrowLeft: () => this.moveLeft(),
			ArrowRight: () => this.moveRight(),
			ArrowDown: () => this.moveDown(),
			ArrowUp: () => this.rotateClockwise(),
			default: function (key) {
				console.log(`Tecla "${key}" pressionada!`);
			},
		};

		document.addEventListener("keydown", function (event) {
			if (!gameController.isGameStarted) return;

			const key = event.key;

			if (keyActions.hasOwnProperty(key)) {
				keyActions[key]();
				gameController.updateGame();
			} else {
				keyActions.default(key);
			}
		});
	}

	moveLeft() {
		const tetramino = this.gameController.currentTetramino;
		const matrix = this.gameController.matrix;
		if (tetramino.canTranslateLeft(matrix))
            tetramino.moveLeft();
	}

	moveRight() {
		const tetramino = this.gameController.currentTetramino;
		const matrix = this.gameController.matrix;
		if (tetramino.canTranslateRight(matrix))
            tetramino.moveRight();
	}

	moveDown() {
		const tetramino = this.gameController.currentTetramino;
		const matrix = this.gameController.matrix;
		if (tetramino.canTranslateDown(matrix)) {
			tetramino.moveDown();
			return;
		}

		this.gameController.checkGameStatus();
	}

	rotateClockwise() {
		const tetramino = this.gameController.currentTetramino;
        const matrix = this.gameController.matrix;
		if (tetramino.canRotateClockwise(matrix))
            tetramino.rotateClockwise();
	}
}

export default MotionController;
