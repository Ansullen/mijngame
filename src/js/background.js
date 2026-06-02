import { Actor, Vector, CollisionType } from "excalibur"
import { Resources } from './resources.js'

export class Background extends Actor {

    constructor() {
        super({
            width: 800,
            height: 600,
            collisionType: CollisionType.Passive
        })
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Background.toSprite())
        this.pos = new Vector(400, 300)
        this.z = -100
    }
}
