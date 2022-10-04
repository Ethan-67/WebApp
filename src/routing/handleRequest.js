import fs from 'fs'

export const handleGetRequest = async (req, res, route) => {
    if (route.path.endsWith('.json')) {
        readRequestBody(req, res)
        .then( body => route.callback(req, res, body))
    }
    else {
        await readViewData(req, res, route)
            .then(data => sendResponse(data, req, res, route))  
            .then(httpInfo =>{ 
                let [req, res] = httpInfo
                route.callback(req, res)
            })
            .then(() => res.end())
            .catch(err => {
                route.path = './src/views/404.html'
                // readViewData(req, res, route)
                // .then(data => sendResponse(data, req, res, route))  
                // .then(res.end())
                handleGetRequest(req, res, route)
            }) 
    }
}

const readViewData = (req, res, route) => {
    return new Promise( (resolve, reject) => {
        fs.readFile(route.path, (err, data) => {
            if (err) {
                console.error(err) 
                reject(err)
            }
            else {
                // data = view.html
                resolve(data)
            }
        })
    })
}

const sendResponse = (data, req, res, route) => {
    route.headers.forEach( element => res.writeHead(200, element))
    res.write(data) 
    return [req, res]
}

export const handlePostRequest = (req, res, route) => {
    readRequestBody(req, res)
    .then( (body) => route.callback(req, res, body) )
}

const readRequestBody = async(req, res) => {
    return new Promise( (resolve, reject) => {
        let body = ''
        req.on('data', (chunk) => {
            body += chunk
        })
        req.on('end', () => {
            resolve(body)
        })
        req.on('err', (err) => {
            reject(err)
        })
    })
}

// TODO 
export const handleRedirect = (req, res, route) => {
    res.writeHead(301, {
        'Location' : 'https://127.0.0.1:3000/games'
    })
    res.end()
}
