const GRASS_FRICTION = 0.1
const ROADS_FRICTION = {
    road: 1,
    ground: 0.4,
    sand: 0.3
}

export default class Map {
    constructor(scene) {
        this.scene = scene
        this.init()
        this.create()
    }
    init() {
        this.tilemap = this.scene.make.tilemap({ key: 'tilemap' })
        this.tileset = this.tilemap.addTilesetImage('tileset', 'tileset', 64, 64, 0, 1)
    }
    create() {
        this.createLayers()
        this.createCollision()
        this.createCheckPoints()
        this.createOils()
    }
    createLayers() {
        this.tilemap.createLayer('grass', this.tileset)
        this.tilemap.createLayer('road', this.tileset)
        this.tilemap.createLayer('ground', this.tileset)
        this.tilemap.createLayer('sand', this.tileset)
    }
    createCollision() {
        this.tilemap.findObject('collisions', collision => {
            const sprite = this.scene.matter.add.sprite(collision.x + collision.width / 2, collision.y - collision.height / 2, 'objects', collision.name)
            sprite.setStatic(true)
        })
    }
    createOils() {
        this.tilemap.findObject('oils', oil => {
            const sprite = this.scene.matter.add.sprite(oil.x + oil.width / 2, oil.y - oil.height / 2, 'objects', oil.name)
            sprite.setStatic(true)
            sprite.setSensor(true)
        })
    }
    createCheckPoints(){
        this.checkpoints = []
        this.tilemap.findObject('checkpoints', checkpoints =>{
            const rect = new Phaser.Geom.Rectangle(checkpoints.x, checkpoints.y, checkpoints.width, checkpoints.height)
            rect.index = checkpoints.properties.find(item => item.name === 'value').value
            this.checkpoints.push(rect)
        })
    }
    getPlayerPosition(positionName) {
        return this.tilemap.findObject(positionName, player => {
            // return player.name === 'player'
            if(player.name === positionName) return player
        })
    }
    getTileFriction(car) {
        // let tile = this.tilemap.getTileAtWorldXY(100, 100)
        for (let road in ROADS_FRICTION) {

            let tile = this.tilemap.getTileAtWorldXY(car.x, car.y, false, this.scene.cameras.main, road)
            if (tile){
                return ROADS_FRICTION[road]
            } 
        }
        return GRASS_FRICTION
    }
}