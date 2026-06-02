import { Actor, Vector, CollisionType } from "excalibur"
import { Resources } from './resources.js'
import { Fish } from './fish.js'

export class Bubble extends Actor {

    constructor(x, y, shooter) {
        super({
            x,
            y,
            width: 30,
            height: 30,
            collisionType: CollisionType.Passive
        })
        this.shooter = shooter
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Bubble.toSprite())
        this.vel = new Vector(100, 0)
        this.on("exitviewport", () => this.kill())
        this.on("collisionstart", (event) => {
            const other = event.other.owner
            if (other instanceof Fish) {
                this.shooter.score += 10  
                other.wasEatenByShark()
            }
        })
    }
}
