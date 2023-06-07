import Block from "./Block.js";

class Tetramino {
	constructor(tetraminoShape, lengthX) {
		const shape = tetraminoShape.shape;
		this.blocks = [];
		this.currentX = (lengthX / 2) - (shape.length / 2);
		this.currentY = 0;

		for (let y = 0; y < shape.length; y++) {
			this.blocks.push([]);
			for (let x = 0; x < shape[y].length; x++) {
				let block = undefined;
				if (shape[y][x] === 1) {
					block = new Block(tetraminoShape.color);
				}
				this.blocks[y][x] = block;
			}
		}

		console.log(this.blocks)
	}

	moveLeft() {
		//TODO
	}

	moveRight() {
		//TODO
	}

	moveDown() {
		//TODO
	}

	rotateClockwise() {
		//TODO
	}

	rotateCounterClockwise() {
		//TODO
	}
}

export default Tetramino;
