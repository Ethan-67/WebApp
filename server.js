const http = require('http');
const { Router } = require('./src/routing/router')

const hostname = '127.0.0.1'
const port = 3000
const router = new Router()

router.get('/', (req, res) => {
    console.log('GET index.html') 
})

router.post('/', (req, res, body) => {
    console.log('POST index.html: ' + body)
    router.redirect(req, res, '/')
    res.end()
})

router.get('/privacy', (req, res) => {
    console.log('GET privacy.html') 
})

router.get('/data.json', (req, res) => {
    console.log('/dataJSON')
    res.writeHead(200, {'Content-Type' : 'application/json'})
    res.end()
})

const server = http.createServer( (req, res) => {
    console.log('incoming request: ' + req.url)

    router.directRequest(req, res)
    
    console.log()
})

server.listen(port, hostname, () => {
    console.log(`Server listening on: http://${hostname}:${port}/`)
})