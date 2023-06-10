import EmptyBlock from "./EmptyBlock.js";
import Tetramino from "./Tetramino.js";
import TetraminoShapeI from "./TetraminoShapeI.js";
import TetraminoShapeJ from "./TetraminoShapeJ.js";
import TetraminoShapeL from "./TetraminoShapeL.js";
import TetraminoShapeO from "./TetraminoShapeO.js";
import TetraminoShapeS from "./TetraminoShapeS.js";
import TetraminoShapeT from "./TetraminoShapeT.js";
import TetraminoShapeZ from "./TetraminoShapeZ.js";

let canvas, ctx;
let currentTetramino;
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

function drawField(field, x, y, blockSize) {
	for (let i = 0; i < x; i++) {
		for (let j = 0; j < y; j++) {
			const block = field[j][i];
			drawBlock(i, j, block, blockSize);
		}
	}
}

function drawTetramino(tetramino, blockSize) {
	const blocks = tetramino.blocks;

	for (let y = 0; y < blocks.length; y++) {
		for (let x = 0; x < blocks[y].length; x++) {
			const block = blocks[y][x];
			if (block)
				drawBlock(
					x + tetramino.currentX,
					y + tetramino.currentY,
					block,
					blockSize
				);
		}
	}
}

function drawBlock(x, y, block, blockSize) {
	const xPos = x * (blockSize + 1);
	const yPos = y * (blockSize + 1);
	ctx.fillStyle = block.color;
	ctx.fillRect(xPos, yPos, blockSize, blockSize);
}

function moveLeft() {
	if (currentTetramino.canTranslateLeft(matrix)) currentTetramino.moveLeft();
}

function moveRight() {
	if (currentTetramino.canTranslateRight(matrix))
		currentTetramino.moveRight();
}

function moveDown() {
	if (currentTetramino.canTranslateDown(matrix)) {
		currentTetramino.moveDown();
		return;
	}

	if(currentTetramino.startY == currentTetramino.currentY) {
		alert("Game over!");
		clearInterval(tickInterval);
		return;
	}

	applyTetramino();
	currentTetramino = getRandomTetramino();
}

function rotateClockwise() {
	if(currentTetramino.canRotateClockwise(matrix))
		currentTetramino.rotateClockwise();
}

function applyTetramino() {
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

function keyMap() {
	const keyActions = {
		ArrowLeft: moveLeft,
		ArrowRight: moveRight,
		ArrowDown: moveDown,
		ArrowUp: rotateClockwise,
		default: function (key) {
			console.log(`Tecla "${key}" pressionada!`);
		},
	};

	document.addEventListener("keydown", function (event) {
		if(!isGameStarted)
			return;

		const key = event.key;

		if (keyActions.hasOwnProperty(key)) {
			keyActions[key]();
			gameUpdate();
		} else {
			keyActions.default(key);
		}
	});
}

function gameUpdate() {
	drawField(matrix, fieldSizeX, fieldSizeY, blockSize);
	drawTetramino(currentTetramino, blockSize);
}

function getRandomShape() {
	const randomIndex = Math.floor(Math.random() * shapes.length);
	return shapes[randomIndex];
}

function getRandomTetramino() {
	return new Tetramino(getRandomShape(), fieldSizeX);
}

function tick() {
	moveDown();
	gameUpdate();
}

function startGame() {
	tickInterval = setInterval(tick, 500)
	isGameStarted = true;
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

function main() {
	canvas = document.getElementById("game");
	ctx = canvas.getContext("2d");
	matrix = createMatrix(fieldSizeX, fieldSizeY);

	currentTetramino = getRandomTetramino();
	gameUpdate();

	keyMap();
	startGame();
}

main();
