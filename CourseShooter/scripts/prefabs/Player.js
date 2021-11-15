
class Player extends Enemy {
    constructor(scene) {
        super({
            scene,
            x: 150,
            y: config.height / 2,
            texture: 'dragon',
            frame: 'dragon1',
            velocity: 500,
            bullet: {
                velocity: 1000,
                delay: 250,
                texture: 'fire',
                origin: { x: 1, y: 0.5 }
            }
        })

        const frames = this.scene.anims.generateFrameNames('dragon', {
            prefix:'dragon',
            start: 1,
            end:6
        })
        this.scene.anims.create({
            key:'fly',
            frames:frames,
            frameRate:10,
            repeat:-1
        })
        this.play('fly')
    }

    move() {
        this.body.setVelocityX(0)
        this.body.setVelocityY(0)

        if (this.scene.cursors.left.isDown) {
            this.body.setVelocityX(-this.velocity)
        } else if (this.scene.cursors.right.isDown) {
            this.body.setVelocityX(this.velocity)
        }

        if (this.scene.cursors.up.isDown) {
            this.body.setVelocityY(-this.velocity)
        } else if (this.scene.cursors.down.isDown) {
            this.body.setVelocityY(this.velocity)
        }
    }
}