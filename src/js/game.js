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

function main() {
	const fieldSizeX = 10;
	const fieldSizeY = 20;
	const blockSize = 30;

	canvas = document.getElementById("game");
	ctx = canvas.getContext("2d");
	const field = createMatrix(fieldSizeX, fieldSizeY);
	drawField(field, fieldSizeX, fieldSizeY, blockSize);

	const tetramino = new Tetramino(new TetraminoShapeJ(), 10);
	drawTetramino(tetramino, blockSize);
}

main();
