import { getUserIfExisits } from '../repositories/dbRepository.js'

export const createRoutes = (router, wss) => {

    router.get('/', (req, res) => {

    })

    router.get('/games.html', (req, res) => {
        
    })

    router.post('/validate.json', async (req, res, body) => {
        console.log('body: ' + body)

        body = JSON.parse(body)

        let user = await getUserIfExisits(body.username, body.password)

        res.writeHead(200, {'Content-Type' : 'application/json'})
        if (user === undefined) 
            res.write(JSON.stringify({result: 'Invalid'}))
        else 
            res.write(JSON.stringify({result: 'Valid', user: user, redirect: '<a href=\'games\'></a>'}))
        res.end()
    })
}