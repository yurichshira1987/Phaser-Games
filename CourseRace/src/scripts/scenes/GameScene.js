import Phaser from 'phaser'
import Map from '../classes/Map'
import Player from '../classes/Player'
import Stats from '../classes/Stats'
import StatsPanel from '../classes/StatsPanel'
import StatsPopup from '../classes/StatsPopup'

const MAX_LAPS = 1
const CARS = {
    BLUE: {
        sprite: 'car_blue_1',
        position: 'player'
    },
    RED: {
        sprite: 'car_red_1',
        position: 'enemy'
    }
}

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('game')
    }
    init(data) {
        if (data) {
            this.client = data.client
            // console.log(this.client)
        }
        this.cursors = this.input.keyboard.createCursorKeys()
        console.log(this.cursors)
    }
    preload() {
        // this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2,  'bg').setOrigin(0.5)
    }
    getCarsConfig() {
        let config = { player: CARS.BLUE, enemy: CARS.RED }

        if (this.client && !this.client.master) {
            config = { player: CARS.RED, enemy: CARS.BLUE }
        }
        return config
    }
    create(data) {

        this.init()
    
        this.map = new Map(this)
        const car = this.getCarsConfig()
        this.player = new Player(this, this.map, car.player)
        if (this.client) {
            this.enemy = new Player(this, this.map, car.enemy)
            this.client.on('enemyMoveClient', data=>{
                this.enemy.car.setX(data.x)
                this.enemy.car.setY(data.y)
                this.enemy.car.setAngle(data.angle)
            })
        }

        this.stats = new Stats(this, MAX_LAPS)
        this.statsPanel = new StatsPanel(this, this.stats)


        this.cameras.main.setBounds(0, 0, this.map.tilemap.widthInPixels, this.map.tilemap.heightInPixels)
        this.cameras.main.startFollow(this.player.car)

        this.player.car.on('laps', this.onLapComplete, this)

        this.matter.world.on('collisionactive', (event, a, b) => {
            if (b.gameObject === this.player.car && a.gameObject.frame.name === 'oil') {
                this.player.slide()
            }
        })

        // console.log(this)
    }
    update(time, dt) {
        this.player.move()
        this.stats.update(time, dt)
        this.statsPanel.update()
        this.sync()
    }

    onLapComplete() {
        this.stats.onLapComplete()
        if (this.stats.complete) {
            this.statsPopup = new StatsPopup(this, this.stats)
        }

    }
    sync() {
        if (this.client) {
            this.client.enemyMove({
                x: this.player.car.x,
                y: this.player.car.y,
                angle: this.player.car.angle,
            })
        }
    }
}


// this.scene.game.config.width / 2, this.scene.game.config.height / 2,