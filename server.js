import https from 'https'
import Router from './src/routing/router.js'

import{ readFileSync } from 'fs'
import { createRoutes } from './src/routing/routes.js'
import { handleWSRequest } from './src/routing/handleWS.js'

const hostname = '127.0.0.1'
const port = 3000

const router = new Router()

// const wss = new WebSocketServer({ noServer: true })

createRoutes(router)

const options = {
    key:  readFileSync('./src/cert/key.pem'),
    cert: readFileSync('./src/cert/cert.pem')
}

const server = https.createServer( options, (req, res) => {
    console.log('incoming request: ' + req.url)

    router.directRequest(req, res)
    
    console.log()
})

// server.on('upgrade', (req, socket, head) => {
//     handleWSRequest(req, socket, head, router)      
// })

server.listen(port, hostname, () => {
    console.log(`Server listening on: https://${hostname}:${port}/`)
})
