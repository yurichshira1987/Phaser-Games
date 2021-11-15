import Client from '../classes/Client'


export default class StartScene extends Phaser.Scene {
    constructor() {
        super('start')
    }
    preload() {
        this.add.sprite(0, 0, 'bg2').setOrigin(0)
    }
    create() {
        this.createButtons()
        this.addEvents()
    }
    createButtons() {
        this.button1 = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 50, 'ONE PLAYER',
            { font: 'bold 48px Arial', fill: '#FAFAD2' })
            .setOrigin(0.5)
            .setInteractive()

        this.button2 = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 50, 'TWO PLAYER',
            { font: 'bold 48px Arial', fill: '#FAFAD2' })
            .setOrigin(0.5)
            .setInteractive()

    }
    addEvents() {
        this.button1.on('pointerdown', () => {
            this.scene.start('game')
        })


        this.button1.on('pointerover', () => {
            this.sys.canvas.style.cursor = "pointer"
        })
        this.button1.on('pointerout', () => {
            this.sys.canvas.style.cursor = ""
        })
        this.button2.on('pointerdown', () => {
            this.requestGame()
        })
    }
    requestGame() {
        this.client = new Client()
        this.client.init()
        this.client.on('game', (data) => {
            this.scene.start('game', { client: this.client })
        })
    }
    

}