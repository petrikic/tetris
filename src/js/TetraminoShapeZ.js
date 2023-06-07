import TetraminoShape from "./TetraminoShape.js";

class TetraminoShapeZ extends TetraminoShape {
	constructor() {
		const shape = [
			[1, 1, 0],
			[0, 1, 1],
		];
		super(shape, "red");
	}
}

export default TetraminoShapeZ;
