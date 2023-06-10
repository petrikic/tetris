import EmptyBlock from "./EmptyBlock.js";
import Tetramino from "./Tetramino.js";
import TetraminoShapeI from "./TetraminoShapeI.js";
import TetraminoShapeJ from "./TetraminoShapeJ.js";
import TetraminoShapeL from "./TetraminoShapeL.js";
import TetraminoShapeO from "./TetraminoShapeO.js";
import TetraminoShapeS from "./TetraminoShapeS.js";
import TetraminoShapeT from "./TetraminoShapeT.js";
import TetraminoShapeZ from "./TetraminoShapeZ.js";

import CanvasController from "./CanvasController.js";
import MotionController from "./MotionController.js";

function createMatrix(sizeX, sizeY) {
	let matrix = [];
	for (let y = 0; y < sizeY; y++) {
		matrix[y] = [];
		for (let x = 0; x < sizeX; x++) {
			matrix[y][x] = new EmptyBlock();
		}
	}

	return matrix;
}

const fieldSizeX = 10;
const fieldSizeY = 20;
const blockSize = 30;

class GameController {
	constructor() {
		this.tickInterval = undefined;

		this.matrix = createMatrix(fieldSizeX, fieldSizeY);
		this.canvasController = new CanvasController(blockSize);
		this.motionController = new MotionController(this);

		this.shapes = [
			new TetraminoShapeI(),
			new TetraminoShapeJ(),
			new TetraminoShapeL(),
			new TetraminoShapeO(),
			new TetraminoShapeS(),
			new TetraminoShapeT(),
			new TetraminoShapeZ(),
		];

		this.currentTetramino = this.getRandomTetramino();
	}

	applyTetramino() {
		const currentTetramino = this.currentTetramino;

		const blocks = currentTetramino.blocks;
		const currentX = currentTetramino.currentX;
		const currentY = currentTetramino.currentY;
		const matrix = this.matrix;

		for (let y = 0; y < blocks.length; y++) {
			for (let x = 0; x < blocks[y].length; x++) {
				const block = blocks[y][x];
				const canApplly = currentX + x >= 0 && currentY + y >= 0;
				if (block && canApplly)
					matrix[y + currentTetramino.currentY][
						x + currentTetramino.currentX
					] = block;
			}
		}
	}

	checkGameStatus() {
		const currentTetramino = this.currentTetramino;
		if (currentTetramino.startY == currentTetramino.currentY) {
			alert("Game over!");
			clearInterval(this.tickInterval);
			return;
		}

		this.applyTetramino();
		this.currentTetramino = this.getRandomTetramino();
	}

	updateGame() {
		this.canvasController.drawField(
			this.matrix,
			fieldSizeX,
			fieldSizeY,
			blockSize
		);
		this.canvasController.drawTetramino(this.currentTetramino, blockSize);
	}

	getRandomShape() {
		const randomIndex = Math.floor(Math.random() * this.shapes.length);
		return this.shapes[randomIndex];
	}

	getRandomTetramino() {
		return new Tetramino(this.getRandomShape(), fieldSizeX);
	}

	tick() {
		this.motionController.moveDown();
		this.updateGame();
	}

	startGame() {
		this.tickInterval = setInterval(() => this.tick(), 500);
		this.isGameStarted = true;
	}
}

export default GameController;
