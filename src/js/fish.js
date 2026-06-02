import { Actor, Vector, CollisionType } from "excalibur"
import { Resources } from './resources.js'
import { Bones } from './bones.js'

export class Fish extends Actor {

    constructor() {
        super({
            width: 50,
            height: 50,
            collisionType: CollisionType.Passive
        })
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Fish.toSprite())
        this.resetPosition()
        this.on("exitviewport", () => this.resetPosition())
    }

    resetPosition() {
        this.pos = new Vector(900 + Math.random() * 400, 50 + Math.random() * 500)
        this.vel = new Vector(-120, 0)
    }

    wasEatenByShark() {
        this.scene.add(new Bones(this.pos.x, this.pos.y))
        this.resetPosition()
    }
}
