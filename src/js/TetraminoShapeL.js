import TetraminoShape from "./TetraminoShape.js";

class TetraminoShapeL extends TetraminoShape {
	constructor() {
		const shape = [
			[0, 1, 0, 0],
			[0, 1, 0, 0],
			[0, 1, 0, 0],
			[0, 1, 1, 0],
		];
		super(shape, "orange");
	}
}

export default TetraminoShapeL;
