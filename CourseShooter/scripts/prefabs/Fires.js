class Fires extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene)
        this.scene = scene
    }
   
    createFires(owner) {
        let fire = this.getFirstDead()
        if (fire) {
            fire.reset(owner.x, owner.y)
        } else {
            fire = Fire.generate(this.scene, owner)
            // console.log('create fire')
            this.add(fire)
        }
        fire.move()
    }
}