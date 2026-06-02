import '../css/style.css'
import { Engine, Vector, DisplayMode } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Fish } from './fish.js'
import { Shark } from './shark.js'
import { Mine } from './mine.js'
import { Background } from './background.js'
import { UI } from './ui.js'
import { MegaMine } from './megamine.js'

export class Game extends Engine {

    constructor() {
        super({
            width: 800,
            height: 600,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen
         })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        this.add(new Background())

        for (let i = 0; i < 4; i++) this.add(new Fish())

        this.sharkOne = new Shark("player-one")
        this.sharkTwo = new Shark("player-two")
        this.add(this.sharkOne)
        this.add(this.sharkTwo)

        this.ui = new UI()
        this.add(this.ui)

        for (let i = 0; i < 6; i++) this.add(new Mine())
        this.add(new MegaMine())

        this.spawnMineInterval = setInterval(() => this.add(new Mine()), 5000)

    }

    onPostUpdate() {
        if (!this.ui || !this.sharkOne || !this.sharkTwo) return

        this.ui.showScore(this.sharkOne.score, this.sharkTwo.score)
        this.ui.showHealth(this.sharkOne.health, this.sharkTwo.health)

        if (this.sharkOne.health <= 0 && this.sharkTwo.health <= 0) {
            const gameOverEl = document.getElementById('gameover')
            const finalScoreEl = document.getElementById('finalScore')
            if (gameOverEl && gameOverEl.style.display === 'none') {
                gameOverEl.style.display = 'block'
                if (finalScoreEl) finalScoreEl.textContent =
                    `P1: ${this.sharkOne.score} | P2: ${this.sharkTwo.score}`
            }
            if (this.spawnMineInterval) clearInterval(this.spawnMineInterval)
        }
    }
}

new Game()
