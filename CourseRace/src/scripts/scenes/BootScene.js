import Phaser from 'phaser'
import bg from '../../assets/logo.png'

export default class BootScene extends Phaser.Scene {
    constructor() {
        super('boot')
    }
    preload() {
        this.load.image('bg', bg)
    }
    create() {
        this.scene.start('preload')
    }
}