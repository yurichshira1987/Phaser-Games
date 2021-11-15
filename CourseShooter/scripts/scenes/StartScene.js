

class StartScene extends Phaser.Scene {
    constructor() {
        super('start')
    }
    preload() {
    }

    create(data) {
        this.createBackground()
        this.createStats(data)
        this.createText()
        this.addEvents()
    }
    createStats(data) {
        console.log(data)
        if (data.score !== undefined) {
            this.add.graphics()
                .fillStyle(0x000000, 1.5)
                .fillRoundedRect(config.width / 2 - 200, config.height / 2 - 200, 400, 400)

            let textTitle = data.complete ? 'Level Complete' : 'Game Over'
            let style = {
                font: '40px Arial'
            }
            this.add.text(config.width / 2, config.height / 3, textTitle, style).setOrigin(0.5)
            this.add.text(config.width / 2, config.height / 2, `Score: ${data.score}`, style).setOrigin(0.5)
        }
    }
    createBackground() {
        this.add.sprite(0, 0, 'bg').setOrigin(0)
        console.log('start background')
    }

    createText() {
        this.add.text(config.width / 2, 500, 'Tap to start', {
            font: '40px Arial'
        }).setOrigin(0.5)
    }

    addEvents() {
        this.input.on('pointerdown', () => {
            this.scene.start('game')
        })
    }
}