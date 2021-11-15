export default class StatsPanel {
    constructor(scene, stats) {
        this.scene = scene
        this.stats = stats
        this.create()
    }
    create() {
        const style = { font: '24px Arial', fill: '#FFFFFF' }
        this.laps = this.scene.add.text(10, 10, `Laps: 0/${this.stats.lapsToWin}`, style).setScrollFactor(0)
        this.time = this.scene.add.text(10, 40, 'Time: 0', style).setScrollFactor(0)
        this.timeCurrLap = this.scene.add.text(10, 70, 'Time Current Lap: 0', style).setScrollFactor(0)
        this.timeBestLap = this.scene.add.text(10, 100, 'Time Best Lap: 0', style).setScrollFactor(0)
    }
    update() {
        this.laps.setText(`Laps: ${this.stats.currLap}/${this.stats.lapsToWin}`)
        this.time.setText(`Time: ${this.stats.time.toFixed(2)}`)
        this.timeCurrLap.setText(`Time Current Lap: ${this.stats.timeCurrLap.toFixed(2)}`)
        this.timeBestLap.setText(`Time Best Lap: ${this.stats.timeBestLap.toFixed(2)}`)
    }
}