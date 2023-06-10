import TetraminoShape from "./TetraminoShape.js";

class TetraminoShapeL extends TetraminoShape {
	constructor() {
		const shape = [
			[1, 0],
			[1, 0],
			[1, 1],
		];
		super(shape, "orange");
	}
}

export default TetraminoShapeL;
