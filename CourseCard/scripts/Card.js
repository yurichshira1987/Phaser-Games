class Card extends Phaser.GameObjects.Sprite {
    constructor(scene, value) {
        super(scene, -100, -100, 'card')
        this.scene = scene
        this.value = value
        // this.setOrigin(0, 0)
        this.scene.add.existing(this)
        this.setInteractive()
        this.opened = false
        // this.scene.add.sprite(position.x, position.y, 'card').setOrigin(0, 0)
        // this.on('pointerdown', this.open, this)
    }
    flip(texture, callback) {
        this.scene.tweens.add({
            targets: this,
            scaleX: 0,
            ease: 'Linear',
            duration: 150,
            onComplete: () => {
                this.setTexture(texture)
                this.scene.tweens.add({
                    targets: this,
                    scaleX: 1,
                    ease: 'Linear',
                    duration: 150,
                })
                if(callback) callback()
            }
        })
    }
    init(position) {
        this.position = position
        this.close()
        this.setPosition(-this.width, -this.height)
    }
    move(params) {
        this.scene.tweens.add({
            targets: this,
            x: params.x,
            y: params.y,
            delay: params.delay,
            ease: 'Linear',
            duration: 350,
            onComplete: () => {
                if (params.callback) {
                    params.callback()
                }
            }
        })
    }
    open(callback) {
        this.opened = true
        this.flip('card' + this.value, callback)
    }
    close() {
        if (!this.opened) return
        this.flip('card')
        this.opened = false
    }
}