import { Vector, Actor, Label, Font, FontUnit, Color } from "excalibur"

const uiFont = new Font({
    family: 'Arial',
    size: 24,
    unit: FontUnit.Px,
    color: Color.White
})

export class UI extends Actor {

    p1ScoreLabel
    p1HealthLabel
    p2ScoreLabel
    p2HealthLabel

    constructor() {
        super({ z: 100 })

        this.p1ScoreLabel = new Label({ text: 'P1 Score: 0',   pos: new Vector(20,  30), font: uiFont })
        this.p1HealthLabel = new Label({ text: 'P1 Health: 100', pos: new Vector(20,  60), font: uiFont })
        this.p2ScoreLabel = new Label({ text: 'P2 Score: 0',   pos: new Vector(560, 30), font: uiFont })
        this.p2HealthLabel = new Label({ text: 'P2 Health: 100', pos: new Vector(560, 60), font: uiFont })

        this.addChild(this.p1ScoreLabel)
        this.addChild(this.p1HealthLabel)
        this.addChild(this.p2ScoreLabel)
        this.addChild(this.p2HealthLabel)
    }

    showScore(scoreOne, scoreTwo) {
        this.p1ScoreLabel.text = `P1 Score: ${scoreOne}`
        this.p2ScoreLabel.text = `P2 Score: ${scoreTwo}`
    }

    showHealth(healthOne, healthTwo) {
        this.p1HealthLabel.text = `P1 Health: ${healthOne}`
        this.p2HealthLabel.text = `P2 Health: ${healthTwo}`
    }
}
