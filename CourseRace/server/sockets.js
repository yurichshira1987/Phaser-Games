

module.exports = {
    init(server) {
        this.sessions = []
        this.io = require('socket.io')(server)
        this.io.on('connection', socket => {
            console.log(`socket connect id:${socket.id}`)
            this.onSocketConnection(socket)
            socket.on('playerData', data => {
                this.onPlayerMove(socket, data)
            })

           console.log(this.sessions)
        })
    },

    onPlayerMove(socket, data) {
        const session = this.sessions.find(session => session.playerSocket === socket || session.enemySocket === socket)
        if (!session) return
        let enemySocket
        if (session.playerSocket === socket) {
            enemySocket = session.enemySocket
        } else {
            enemySocket = session.playerSocket
        }
        enemySocket.emit('enemyMove', data)
    },

    onSocketConnection(socket) {
        console.log(`socket connect id:${socket.id}`)
        const session = this.getPendingSession()

        if (!session) {
            this.createPendingSession(socket)
        } else {
            session.enemySocket = socket
            this.startGame(session)
        }
    },

    getPendingSession() {
        return this.sessions.find(session => session.playerSocket && !session.enemySocket)
    },

    createPendingSession(socket) {
        const session = { playerSocket: socket, enemySocket: null }
        this.sessions.push(session)
    },

    startGame(session) {
        session.playerSocket.emit('gameStart', { master: true })
        session.enemySocket.emit('gameStart')
    }
}