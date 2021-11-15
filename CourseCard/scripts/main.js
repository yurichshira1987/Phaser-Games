
let config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    timeOut:30,
    cards: [1, 2, 3, 4],
    rows: 2,
    // cols: 4,
    scene: new GameScene()
}

new Phaser.Game(config)

