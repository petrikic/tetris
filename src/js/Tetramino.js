import Block from "./Block.js";

class Tetramino {
	constructor(tetraminoShape, lengthX) {
		const shape = tetraminoShape.shape;
		this.blocks = [];
		this.currentX = lengthX / 2 - shape.length / 2 + 1;
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
		const oldRows = this.blocks.length;
		const oldCols = this.blocks[0].length;
		const newMatrix = [];

		for (let col = 0; col < oldCols; col++) {
			const newRow = [];

			for (let row = oldRows - 1; row >= 0; row--) {
				newRow.push(this.blocks[row][col]);
			}

			newMatrix.push(newRow);
		}

		this.currentX = this.currentX - (this.blocks.length / 2 - this.blocks[0].length / 2)
		this.blocks = newMatrix;
	}

	rotateCounterClockwise() {
		const oldRows = this.blocks.length;
		const oldCols = this.blocks[0].length;
		const newMatrix = [];

		for (let col = oldCols - 1; col >= 0; col--) {
			const newRow = [];

			for (let row = 0; row < oldRows; row++) {
				newRow.push(this.blocks[row][col]);
			}

			newMatrix.push(newRow);
		}

		this.currentX = this.currentX - (this.blocks.length / 2 - this.blocks[0].length / 2)
		this.blocks = newMatrix;
	}
	
	// 	return newMatrix;
	// }


}

export default Tetramino;
