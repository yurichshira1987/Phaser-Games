
class Enemy extends MovableObject {

    init(data) {
        super.init(data)
        this.setOrigin(data.bullet.origin.x, data.bullet.origin.y)

        
        this.fires = data.fires || new Fires(this.scene)

        this.timer = this.scene.time.addEvent({
            delay: data.bullet.delay,
            loop: true,
            callback: this.fire,
            callbackScope: this
        })
        this.bullet = data.bullet

    }
    fire() {
        this.fires.createFires(this)
    }

    static generateAttr() {
        const x = config.width
        const y = Phaser.Math.Between(50, config.height - 50)
        const id = Phaser.Math.Between(1, 4)
        return { x, y, id }
    }
    static generate(scene, fires) {
        // console.log('create enemy')
        const attr = Enemy.generateAttr()

        return new Enemy({
            scene: scene,
            x: attr.x,
            y: attr.y,
            texture: 'enemy',
            frame: `enemy${attr.id}`,
            velocity: -400,
            bullet: {
                velocity: -600,
                delay: 1000,
                texture: 'bullet',
                origin: { x: 0, y: 0.5 }
            },
            fires:fires
        })
    }
    isDead() {
        return this.x < 0 - this.width
    }
    reset() {
        // console.log('live enemy')
        const attr = Enemy.generateAttr()
        this.setFrame(`enemy${attr.id}`);
        super.reset(attr.x, attr.y)
    }

}