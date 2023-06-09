import Block from "./Block.js";
import EmptyBlock from "./EmptyBlock.js";

class Tetramino {
    constructor(tetraminoShape, lengthX) {
        const shape = tetraminoShape.shape;
        this.blocks = [];
        this.currentX = Math.round(lengthX / 2) - Math.round(shape[0].length / 2);
        this.startY = -shape.length;
        this.currentY = -shape.length;

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
        this.currentX--;
    }

    moveRight() {
        this.currentX++;
    }

    moveDown() {
        this.currentY++;

        console.log(this.currentX + ", " + this.currentY);
    }

    canTranslateLeft(matrix) {
        return this.canTranslate(-1, 0, this.blocks, matrix);
    }

    canTranslateRight(matrix) {
        return this.canTranslate(1, 0, this.blocks, matrix);
    }

    canTranslateDown(matrix) {
        return this.canTranslate(0, 1, this.blocks, matrix);
    }

    canRotateClockWise(matrix) {
        return this.canTranslate(
            this.translatePositionX(),
            this.translatePositionY(),
            this.tetraminoRortatedClockwised(),
            matrix
        );
    }

    canTranslate(offsetX, offsetY, blocks, matrix) {
        let canTranslate = true;
        for (let y = 0; y < blocks.length; y++) {
            for (let x = 0; x < blocks[y].length; x++) {
                const block = blocks[y][x];
                if (block) {
                    const absoluteX = x + this.currentX;
                    const absoluteY = y + this.currentY;
                    canTranslate =
                        canTranslate &&
                        this.canTranslateTo(
                            absoluteX + offsetX,
                            absoluteY + offsetY,
                            matrix
                        );
                }
            }
        }

        return canTranslate;
    }

    canTranslateTo(x, y, matrix) {
        return (
            this.isPositionValid(x, y, matrix) &&
            (y < 0 || matrix[y][x] instanceof EmptyBlock)
        );
    }

    isPositionValid(x, y, matrix) {
        return (
            this.isPositionXValid(x, matrix) && this.isPositionYValid(y, matrix)
        );
    }

    isPositionXValid(x, matrix) {
        return x >= 0 && x < matrix[0].length;
    }

    isPositionYValid(y, matrix) {
        return y < matrix.length;
    }

    updateCurrentPosition() {
        this.currentX = this.currentX + this.translatePositionX();
        this.currentY = this.currentY + this.translatePositionY();
    }

    translatePositionX() {
        return -(
            Math.floor(this.blocks.length / 2) -
            Math.floor(this.blocks[0].length / 2)
        );
    }

    translatePositionY() {
        return -(
            Math.floor(this.blocks[0].length / 2) -
            Math.floor(this.blocks.length / 2)
        );
    }

    rotateClockwise() {
        this.updateCurrentPosition();
        this.blocks = this.tetraminoRortatedClockwised();
    }

    rotateCounterClockwise() {
        this.updateCurrentPosition();
        this.blocks = this.tetraminoRotatedCounterClockwised();
    }

    tetraminoRortatedClockwised() {
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

        return newMatrix;
    }

    tetraminoRotatedCounterClockwised() {
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

        return newMatrix;
    }
}

export default Tetramino;
