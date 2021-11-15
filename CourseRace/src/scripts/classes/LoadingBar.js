export default class LoadingBar {
    constructor(scene) {
        this.scene = scene
        this.style = {
            boxColor: 0xD3D3D3,
            barColor: 0xFFF8DC,
            width: 900,
            height: 25,
            y: 600,
            x: 200

        }
        this.progressBox = this.scene.add.graphics()
        this.progressBar = this.scene.add.graphics()
        this.showProgressBox()
        this.setEvents()

    }
    showProgressBox() {
        this.progressBox
            .fillStyle(this.style.boxColor)
            .fillRect(this.style.x, this.style.y, this.style.width, this.style.height)
    }
    showProgressBar(loading) {
        // console.log(loading)
        this.progressBar
            .clear()
            .fillStyle(this.style.barColor)
            .fillRect(this.style.x, this.style.y, this.style.width * loading, this.style.height)
    }
    setEvents() {
        this.scene.load.on('progress', this.showProgressBar, this)
        this.scene.load.on('fileprogress', this.onFileProgress, this)
        this.scene.load.on('complete', this.onLoadComplete, this)
    }
    onFileProgress(file){
        // console.log(file)
    }
    onLoadComplete(){
        this.progressBox.destroy()
        this.progressBar.destroy()
    }
}