export default class StatsPopup {
    constructor(scene, stats) {
        this.scene = scene
        this.stats = stats
        this.create()
    }
    create() {
        const width = 900
        const height = 600

        this.scene.add.graphics()
            .fillStyle(0x000000, 0.5)
            .fillRect((this.scene.sys.game.config.width - width) / 2, (this.scene.sys.game.config.height - height) / 2, width, height)
            .setScrollFactor(0)

        this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 200,
            'Level Complete', { font: '46px Arial', fill: '#FAFAD2' })
            .setScrollFactor(0)
            .setOrigin(0.5)

        this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 50,
            `Time total: ${this.stats.time.toFixed(2)}`, { font: '26px Arial', fill: '#FAFAD2' })
            .setScrollFactor(0)
            .setOrigin(0.5)

        this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY,
            `Time best lap: ${this.stats.timeBestLap.toFixed(2)}`, { font: '26px Arial', fill: '#FAFAD2' })
            .setScrollFactor(0)
            .setOrigin(0.5)

        this.tap = this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY + 100,
            'Tap to continue', { font: '36px Arial', fill: '#FAFAD2' })
            .setScrollFactor(0)
            .setOrigin(0.5)

        this.scene.input.on('pointerdown', ()=>{
            this.scene.scene.start('game')
        })
    }
}