import TetraminoShape from "./TetraminoShape.js";

class TetraminoShapeT extends TetraminoShape {
	constructor() {
		const shape = [
			[0, 1, 0],
			[1, 1, 1],
		];
		super(shape, "purple");
	}
}

export default TetraminoShapeT;
