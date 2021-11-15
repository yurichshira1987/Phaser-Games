import Phaser from 'phaser'
import io from 'socket.io-client'
const HOST = 'http://localhost:4000/'

export default class Client extends Phaser.Events.EventEmitter {
    constructor() {
        super()
    }

    init() {
        this.master = false
        this.socket = io(HOST, { transports: ['websocket'] })
        this.socket.on('connect', () => {
            console.log('connecting socket')
        })

        this.socket.on('disconnect', () => {
            console.log('disconnect socket')
        })

        this.socket.on('gameStart', (data) => {
            if (data && data.master) {
                this.master = data.master
            }
            this.emit('game', this.master)
        })
        this.socket.on('enemyMove', data => {
            this.emit('enemyMoveClient', data)
        })

        this.socket.on('getSessions', data=>{
            console.log(data)
        })

    }
    enemyMove(data) {
        if (JSON.stringify(this.playerData) !== JSON.stringify(data)) {
            this.playerData = data
            this.socket.emit('playerData', data)
        }
    }

}