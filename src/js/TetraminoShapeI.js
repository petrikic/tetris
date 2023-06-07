import TetraminoShape from "./TetraminoShape.js";

class TetraminoShapeI extends TetraminoShape {
	constructor() {
		const shape = [
			[0, 1, 0, 0],
			[0, 1, 0, 0],
			[0, 1, 0, 0],
			[0, 1, 0, 0],
		];
		super(shape, "cyan");
	}
}

export default TetraminoShapeI;
