import TetraminoShape from "./TetraminoShape.js";

class TetraminoShapeS extends TetraminoShape {
	constructor() {
		const shape = [
			[0, 1, 1],
			[1, 1, 0],
		];
		super(shape, "green");
	}
}

export default TetraminoShapeS;
