import TetraminoShape from "./TetraminoShape.js";

class TetraminoShapeI extends TetraminoShape {
	constructor() {
		const shape = [
			[1],
			[1],
			[1],
			[1],
		];
		super(shape, "cyan");
	}
}

export default TetraminoShapeI;
