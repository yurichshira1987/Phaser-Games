export default class Stats {
    constructor(scene, lapsToWin) {
        this.scene = scene
        this.lapsToWin = lapsToWin
        this.currLap = 0
        this.time = 0
        this.timeCurrLap = 0
        this.timeBestLap = 0
        this.timeLastLap = 0
    }

    update(time, dt) {
        if (!this.complete) {
            const t = dt / 1000
            this.time += t
            this.timeCurrLap += t
        }
    }
    get complete() {
        return this.currLap === this.lapsToWin
    }
    onLapComplete() {
        this.currLap++
        if ((this.timeBestLap === 0) || (this.timeCurrLap < this.timeBestLap)) {
            this.timeBestLap = this.timeCurrLap
        }
        this.timeLastLap = this.timeCurrLap
        this.timeCurrLap = 0

    }
}