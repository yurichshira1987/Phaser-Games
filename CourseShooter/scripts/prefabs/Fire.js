class Fire extends MovableObject {
    
    static generate(scene, owner) {
        // console.log('create fire')
        return new Fire({
            scene: scene,
            x: owner.x,
            y: owner.y,
            texture: owner.bullet.texture,
            velocity: owner.bullet.velocity
        })
    }
    isDead(){
        return this.x < 0 - this.width || this.x > config.width + this.width
    }
}














// class Fire extends Phaser.GameObjects.Sprite {
//     constructor(scene, source) {
//         super(scene, source.x + source.width / 2, source.y, 'fire')
//         this.init()
//     }
//     init() {
//         this.scene.add.existing(this)
//         this.scene.physics.add.existing(this)
//         this.body.enable = true
//         this.velocity = 1000
//         this.scene.add.events.on('update', this.update, this)
//     }
//     static generate(scene, source) {
//         return new Fire(scene, source)
//     }

//     reset(source){
//         this.x = source.x + this.width / 2
//         this.y = source.y
//         this.setAlive(true)
//         // console.log('reset fire')
//     }
//     update() {
//         if (this.active && (this.x < 0 - this.width || this.x > config.width + this.width)) {
//             this.setAlive(false)
//             // console.log('delete fire')
//         }
//     }
//     setAlive(status) {
//         this.body.enable = status
//         this.setVisible(status)
//         this.setActive(status)
//     }
//     move() {
//         this.body.setVelocityX(this.velocity)
//     }
// }