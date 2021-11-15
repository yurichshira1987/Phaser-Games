import Phaser from 'phaser'
import LoadingBar from '../classes/LoadingBar'
import tilesetPng from '../../assets/tileset.png'
import tilemapJson from '../../assets/tilemap.json'
import objectsPng from '../../assets/objects.png'
import objectsJson from '../../assets/objects.json'
import bg2 from '../../assets/bg2.png'



export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super('preload')
    }
    preload() {
        this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'bg').setOrigin(0.5)
        this.loadingBar = new LoadingBar(this)
        this.preloadAssets()
    }
    preloadAssets() {
        this.load.image('bg2', bg2)
        this.load.spritesheet('tileset', tilesetPng, { frameWidth: 64, frameHeight: 64 })
        this.load.tilemapTiledJSON('tilemap', tilemapJson)
        this.load.atlas('objects', objectsPng, objectsJson)
    }
    create() {
        this.scene.start('start')
    }
}