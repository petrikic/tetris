class CanvasController {
	constructor(blockSize) {
		const canvas = document.getElementById("game");
		this.ctx = canvas.getContext("2d");
		this.blockSize = blockSize;
	}

	drawField(field, x, y, blockSize) {
		for (let i = 0; i < x; i++) {
			for (let j = 0; j < y; j++) {
				const block = field[j][i];
				this.drawBlock(i, j, block, blockSize);
			}
		}
	}

	drawTetramino(tetramino, blockSize) {
		const blocks = tetramino.blocks;

		for (let y = 0; y < blocks.length; y++) {
			for (let x = 0; x < blocks[y].length; x++) {
				const block = blocks[y][x];
				if (block)
					this.drawBlock(
						x + tetramino.currentX,
						y + tetramino.currentY,
						block,
						blockSize
					);
			}
		}
	}

	drawBlock(x, y, block) {
		const blockSize = this.blockSize;
		const xPos = x * (blockSize + 1);
		const yPos = y * (blockSize + 1);
		this.ctx.fillStyle = block.color;
		this.ctx.fillRect(xPos, yPos, blockSize, blockSize);
	}
}

export default CanvasController;
