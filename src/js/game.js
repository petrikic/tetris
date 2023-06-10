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

let matrix;
let tickInterval;
let isGameStarted;

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

function applyTetramino() {
	const currentTetramino = gameController.currentTetramino;

	const blocks = currentTetramino.blocks;
	const currentX = currentTetramino.currentX;
	const currentY = currentTetramino.currentY;

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

function checkGameStatus() {
	const currentTetramino = gameController.currentTetramino;
	if (currentTetramino.startY == currentTetramino.currentY) {
		alert("Game over!");
		clearInterval(tickInterval);
		return;
	}

	applyTetramino();
	gameController.currentTetramino = getRandomTetramino();
}

function gameUpdate() {
	canvasContrller.drawField(matrix, fieldSizeX, fieldSizeY, blockSize);
	canvasContrller.drawTetramino(gameController.currentTetramino, blockSize);
}

function getRandomShape() {
	const randomIndex = Math.floor(Math.random() * shapes.length);
	return shapes[randomIndex];
}

function getRandomTetramino() {
	return new Tetramino(getRandomShape(), fieldSizeX);
}

function tick() {
	motionController.moveDown();
	gameUpdate();
}

function startGame() {
	tickInterval = setInterval(tick, 500);
	gameController.isGameStarted = true;
}

const fieldSizeX = 10;
const fieldSizeY = 20;
const blockSize = 30;

const shapes = [
	new TetraminoShapeI(),
	new TetraminoShapeJ(),
	new TetraminoShapeL(),
	new TetraminoShapeO(),
	new TetraminoShapeS(),
	new TetraminoShapeT(),
	new TetraminoShapeZ(),
];

let canvasContrller;
let motionController;
let gameController;

function main() {
	matrix = createMatrix(fieldSizeX, fieldSizeY);

	//FIXME - Criar a controller para o game.
	gameController = {
		isGameStarted: isGameStarted,
		currentTetramino: getRandomTetramino(),
		matrix: matrix,
		updateGame: gameUpdate,
		checkGameStatus: checkGameStatus,
	};

	canvasContrller = new CanvasController(blockSize);
	motionController = new MotionController(gameController);

	gameUpdate();
	startGame();
}

main();
