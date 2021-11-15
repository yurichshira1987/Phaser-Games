class BootScene extends Phaser.Scene{
    constructor(){
        super('boot')
    }

    preload(){
        this.load.image('bg', 'assets/sprites/background.png')
        console.log('preload bg')
    }
    
    create(){
        this.scene.start('preload')
        console.log('next PreloadScene')
    }
}