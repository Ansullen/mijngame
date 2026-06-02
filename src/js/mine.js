import { Actor, Vector, CollisionType } from "excalibur"
import { Resources } from './resources.js'

export class Mine extends Actor {

    constructor() {
        super({
            width: 40,
            height: 40,
            collisionType: CollisionType.Passive
        })
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Mine.toSprite())
        this.resetPosition()
        this.on("exitviewport", () => this.resetPosition())
    }

    resetPosition() {
        this.pos = new Vector(900 + Math.random() * 400, 50 + Math.random() * 500)
        this.vel = new Vector(-70, 0)
    }
}
