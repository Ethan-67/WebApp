import { WebSocketServer } from "ws"
import { getUserIfExisits } from '../repositories/dbRepository.js'

// validation server
const wss = new WebSocketServer({noServer: true}) 
// game servers
let servers = new Map()

export const handleWSRequest = (req, socket, head) => {
    console.log(req.url)
    switch (req.url) {
        case '/validate':   
            wss.on('connection', (ws) => {
                ws.on('message', (data) => {
                    console.log('data recieved: ' + data)
                    ws.send('data from server')
                    
                })
            })

            wss.handleUpgrade(req, socket, head, (ws) => {
                wss.emit('connection', ws, req);
            });

            
            break 
        default:     
    }   
}
