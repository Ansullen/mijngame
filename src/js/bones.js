import { Actor, Vector, CollisionType } from "excalibur"
import { Resources } from './resources.js'

export class Bones extends Actor {

    constructor(x, y) {
        super({
            x,
            y,
            width: 50,
            height: 50,
            collisionType: CollisionType.PreventCollision
        })
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Bones.toSprite())
        this.vel = new Vector(0, 40)
        this.on("exitviewport", () => this.kill())
    }
}
