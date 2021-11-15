

let config = {
    type:Phaser.AUTO,
    width:1280,
    height:720,
    scene:[BootScene, PreloadScene, StartScene, GameScene], 
    physics:{
        default:'arcade',
        arcade:{
            debug:false
        }
    }
}

let game = new Phaser.Game(config)
console.log(game)