

class GameScene extends Phaser.Scene {
    constructor() {
        super("Game")
        this.currentLevl = 1
        this.score = 0
        this.successCount = 0
    }
    preload() {
        this.load.image('bg', 'sprites/background.png')
        this.load.image('card', 'sprites/card.png')
        this.load.image('card1', 'sprites/card1.png')
        this.load.image('card2', 'sprites/card2.png')
        this.load.image('card3', 'sprites/card3.png')
        this.load.image('card4', 'sprites/card4.png')
        this.load.image('card5', 'sprites/card5.png')

        this.load.audio('card', 'sounds/card.mp3')
        this.load.audio('complete', 'sounds/complete.mp3')
        this.load.audio('success', 'sounds/success.mp3')
        this.load.audio('theme', 'sounds/theme.mp3')
        this.load.audio('timeout', 'sounds/timeout.mp3')
    }
    create() {
        // this.initGame()
        this.createSounds()
        this.createBackground()
        this.createText()
        this.createTimer()
        // this.createCards()
        this.start()
    }
    createSounds() {
        this.sounds = {
            card: this.sound.add('card'),
            complete: this.sound.add('complete'),
            success: this.sound.add('success'),
            theme: this.sound.add('theme'),
            timeout: this.sound.add('timeout'),
        }
        this.sounds.theme.play({
            volume: 0.1,
        })
    }
    createBackground() {
        this.add.sprite(0, 0, 'bg').setOrigin(0, 0)
    }
    createText() {
        this.timeOutText = this.add.text(10, 300, ``, {
            font: '26px Arial',
            fill: '#ffffff'
        })
        this.currentLevlText = this.add.text(10, 10, ``, {
            font: '26px Arial',
            fill: '#ffffff'
        })
        this.scoreText = this.add.text(this.sys.game.config.width - 160, 10, ``, {
            font: '26px Arial',
            fill: '#ffffff'
        })
    }
    onTimerTick() {
        this.timeOutText.setText(`Time: ${this.timeOut}`)
        if (this.timeOut <= 0) {
            this.currentLevl = 1
            this.score = 0
            this.timer.paused = true
            this.restart()
            this.sounds.timeout.play()
        } else {
            this.timeOut--
        }
    }
    createTimer() {
        this.timer = this.time.addEvent({
            delay: 1000,
            callback: this.onTimerTick,
            callbackScope: this,
            loop: true
        })
    }
    initGame() {
        if (this.currentLevl === 1) {
            this.configCards = [1, 2]
            this.configTimeOut = 15
        }
        if (this.currentLevl === 2) {
            this.configCards = [1, 2, 3]
            this.configTimeOut = 20
        }
        if (this.currentLevl === 3) {
            this.configCards = [1, 2, 3, 4]
            this.configTimeOut = 25
        }
        if (this.currentLevl === 4) {
            this.configCards = [1, 2, 3, 4, 5]
            this.configTimeOut = 30
        }
        if (this.currentLevl === 5) {
            this.configCards = [1, 2, 3, 4, 5]
            this.configTimeOut = 25
        }
        if (this.currentLevl === 6) {
            this.configCards = [1, 2, 3, 4, 5]
            this.configTimeOut = 20
        }
        if (this.currentLevl === 7) {
            this.configCards = [1, 2, 3, 4, 5]
            this.configTimeOut = 15
        }
    }
    start() {
        this.initGame()
        this.createCards()
        this.timeOut = this.configTimeOut
        this.openedCard = null
        this.openedCardCount = 0
        this.initCard()
        this.showCards()
        this.currentLevlText.setText(`Level: ${this.currentLevl}`)
        this.scoreText.setText(`Score: ${this.score}`)
    }
    restart() {
        let count = 0
        const onCardComplete = () => {
            ++count
            if (count >= this.cards.length) {
                this.start()
                this.timer.paused = false
            }
        }
        this.cards.forEach(card => {
            card.move({
                x: this.sys.game.config.width + card.width,
                y: this.sys.game.config.height + card.height,
                delay: card.position.delay,
                callback: onCardComplete
            })
        })

    }
    initCard() {
        const positions = this.getCardPositions()
        this.cards.forEach(card => {
            card.init(positions.pop())
        });
    }
    showCards() {
        this.cards.forEach(card => {
            card.close()
            card.depth = card.position.delay
            card.move({
                x: card.position.x,
                y: card.position.y,
                delay: card.position.delay
            })

        });
    }
    createCards() {
        this.cards = []

        for (let value of this.configCards) {
            for (let i = 0; i < config.rows; i++) {
                this.cards.push(new Card(this, value))
            }
        }
        this.input.on('gameobjectdown', this.onCardClicked, this)
    }
    onCardClicked(pointer, card) {
        if (card.opened) return
        this.sounds.card.play()
        if (this.openedCard) {
            if (this.openedCard.value === card.value) {
                this.successOpenCard()
            } else {
                this.openedCard.close()
                this.openedCard = card
                this.successCount = 0
            }
        } else {
            this.openedCard = card
        }

        card.open(() => {
            if (this.openedCardCount === this.cards.length / 2) {
                if (this.currentLevl !== 7) this.currentLevl++
                this.sounds.complete.play()
                this.restart()
            }
        })
    }
    successOpenCard() {
        this.openedCard = null
        this.openedCardCount++
        this.sounds.success.play()
        this.successCount++
        if (this.successCount === 1) this.score += 100
        if (this.successCount === 2) this.score += 250
        if (this.successCount === 3) this.score += 500
        if (this.successCount === 4) this.score += 1000
        if (this.successCount === 5) this.score += 5000
        this.scoreText.setText(`Score: ${this.score}`)
    }
    getCardPositions() {
        const positions = []
        const cardTexture = this.textures.get('card').getSourceImage()
        const cardWidth = cardTexture.width + 4
        const cardHeight = cardTexture.height + 4
        let offsetX = (this.sys.game.config.width - cardWidth * this.configCards.length) / 2 + cardTexture.width / 2
        let offsetY = (this.sys.game.config.height - cardHeight * config.rows) / 2 + cardTexture.height / 2
        let id = 0
        for (let row = 0; row < config.rows; row++) {
            for (let col = 0; col < this.configCards.length; col++) {
                id++
                positions.push({
                    x: offsetX + cardWidth * col,
                    y: offsetY + cardHeight * row,
                    delay: id * 100
                })
            }
        }
        // return positions
        return Phaser.Utils.Array.Shuffle(positions)
    }
}