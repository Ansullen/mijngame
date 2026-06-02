import { Actor, Vector, CollisionType, Keys, Color } from "excalibur"
import { Resources } from './resources.js'
import { Fish } from './fish.js'
import { Mine } from './mine.js'
import { MegaMine } from './megamine.js'
import { Bubble } from './bubble.js'

export class Shark extends Actor {

    constructor(player) {
        super({
            width: 100,
            height: 100,
            collisionType: CollisionType.Active
        })
        this.player = player
        this.score = 0
        this.health = 100
        this.speed = 200
    }

    onInitialize(engine) {
        const sprite = Resources.Shark.toSprite()
        this.graphics.use(sprite)
        sprite.tint = Color.fromRGB(Math.random() * 255, Math.random() * 255, Math.random() * 255)

        this.pos = this.player === "player-one" ? new Vector(200, 300) : new Vector(600, 300)
        this.vel = new Vector(0, 0)
        this.on('collisionstart', (event) => this.hitSomething(event))
    }

    onPreUpdate(engine) {
        let xspeed = 0
        let yspeed = 0

        if (this.player === "player-one") {
            if (engine.input.keyboard.isHeld(Keys.W)) yspeed = -1
            if (engine.input.keyboard.isHeld(Keys.S)) yspeed = 1
            if (engine.input.keyboard.isHeld(Keys.A)) xspeed = -1
            if (engine.input.keyboard.isHeld(Keys.D)) xspeed = 1
        } else {
            if (engine.input.keyboard.isHeld(Keys.Up))    yspeed = -1
            if (engine.input.keyboard.isHeld(Keys.Down))  yspeed = 1
            if (engine.input.keyboard.isHeld(Keys.Left))  xspeed = -1
            if (engine.input.keyboard.isHeld(Keys.Right)) xspeed = 1
        }

        this.vel = new Vector(xspeed * this.speed, yspeed * this.speed)

        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            this.shoot()
        }
    }

    shoot() {
        this.scene.add(new Bubble(this.pos.x + 50, this.pos.y, this))
    }

    onPostUpdate(engine) {
        const halfWidth = this.width / 2
        const halfHeight = this.height / 2

        this.pos.x = Math.min(Math.max(this.pos.x, halfWidth), engine.drawWidth - halfWidth)
        this.pos.y = Math.min(Math.max(this.pos.y, halfHeight), engine.drawHeight - halfHeight)
    }

    hitSomething(event) {
        const otherActor = event.other.owner
        if (otherActor instanceof Mine) {
            this.health -= 20
            otherActor.kill()
            if (this.health <= 0) {
                this.kill()
            }
        }
        if (otherActor instanceof MegaMine) {
            otherActor.resetPosition()
            const fishes = this.scene.actors.filter(actor => actor instanceof Fish)
            for (const fish of fishes) {
                if (!fish.isOffScreen) {
                    this.score += 10
                    fish.wasEatenByShark()
                }
            }
        }
    }
}
