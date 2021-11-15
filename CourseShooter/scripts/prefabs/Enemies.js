
class Enemies extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene)
        this.scene = scene
        this.maxCount = 222
        this.createdCount = 0
        this.countDestroy = 0
        this.interval = 500

        this.timer = this.scene.time.addEvent({
            delay: this.interval,
            callback: this.tick,
            callbackScope: this,
            loop: true
        })
        this.fires = new Fires(this.scene)
    }
    tick() {
        if (this.createdCount >= this.maxCount) {
            this.timer.remove()
        } else {
            this.createEnemies()
        }
    }
    onEnemyKilled(){
        this.countDestroy++
        if(this.countDestroy >= this.maxCount){
            this.scene.events.emit('enemies-killed')
        }
    }
    createEnemies() {
        let enemy = this.getFirstDead()
        if (enemy) {
            enemy.reset()
        } else {
            enemy = Enemy.generate(this.scene, this.fires)
            enemy.on('killed', this.onEnemyKilled, this)
            this.add(enemy)
        }
        enemy.move()
        ++this.createdCount
    }
}