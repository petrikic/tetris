import TetraminoShape from "./TetraminoShape.js";

class TetraminoShapeJ extends TetraminoShape {
	constructor() {
		const shape = [
			[0, 0, 1, 0],
			[0, 0, 1, 0],
			[0, 0, 1, 0],
			[0, 1, 1, 0],
		];
		super(shape, "blue");
	}
}

export default TetraminoShapeJ;
