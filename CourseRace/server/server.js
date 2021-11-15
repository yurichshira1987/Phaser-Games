const http = require('http')
const path = require('path')
const express = require('express')
const app = express()
const PORT = 4000
const cors = require("cors");
const server = http.createServer(app)

const sockets = require('./sockets.js')

app.use(cors())






app.use(express.static(path.join(__dirname, '../dist/')))

sockets.init(server)



server.listen(PORT, () => { 
    console.log('server has been started')
})

