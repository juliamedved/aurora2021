import Steering from "./steering.js";
import Vector2 from 'phaser/src/math/Vector2';

export default class Overtake extends Steering {
	constructor(owner, target, force = 1, ownerSpeed = 40) {
		super(owner, target, force);
		this.ownerSpeed = ownerSpeed;
		this.target = target;
	}

	calculateImpulse() {
		const owner = this.owner;

		let desiredVelocity = new Vector2(this.target.x - owner.x, this.target.y - owner.y);
		const distance = desiredVelocity.length();
		const prevVelocity = new Vector2(owner.x - owner.body.prev.x, owner.y - owner.body.prev.y);
		return desiredVelocity.subtract(prevVelocity);
	}
}