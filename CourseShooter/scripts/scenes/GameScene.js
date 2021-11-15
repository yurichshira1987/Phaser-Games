class GameScene extends Phaser.Scene {
    constructor() {
        super('game')
    }
    init(){
        this.cursors = this.input.keyboard.createCursorKeys()
    }
    preload() {
    }

    create() {
        this.score = 0
        this.createBackground()
        this.createText()
        this.createSounds()
        this.player = new Player(this)
        this.enemies = new Enemies(this)
        this.enemies.createEnemies()
        this.addOverlap()
        this.addEvents()
        this.init()
    }
    createText() {
        this.scoreText = this.add.text(50, 30, `Score: 0`, {
            font: '30px Arial'
        })
    }
    createSounds() {
        if (!this.sounds) {
            this.sounds = {
                theme: this.sound.add('theme', { volume: 0.1, loop: true }),
                boom: this.sound.add('boom', { volume: 0.1 })
            }

            this.sounds.theme.play()
        }
    }
    addOverlap() {
        this.physics.add.overlap(this.player.fires, this.enemies, this.onOverlap, undefined, this)
        this.physics.add.overlap(this.player, this.enemies.fires, this.onOverlap, undefined, this)
        this.physics.add.overlap(this.player, this.enemies, this.onOverlap, undefined, this)
    }
    onOverlap(source, target) {
        const enemy = [source, target].find(item => item.texture.key === 'enemy')
        if (enemy) {
            this.score++
            this.scoreText.setText(`Score: ${this.score}`)
            Boom.generate(this, enemy.x, enemy.y)
            this.sounds.boom.play()
        }
        source.setAlive(false)
        target.setAlive(false)

    }

    addEvents() {
        this.player.once('killed', this.gameCompleted, this)
        this.events.once('enemies-killed', this.gameCompleted, this)
    }
    gameCompleted() {
        this.scene.start('start', {
            score: this.score,
            complete: this.player.active
        })
        console.log('game completed')
    }
    update() {
        this.player.move()
        this.bg.tilePositionX += 0.5
    }
    createBackground() {
        this.bg = this.add.tileSprite(0, 0, config.width, config.height, 'bg').setOrigin(0)
    }
}


// export default GameScene