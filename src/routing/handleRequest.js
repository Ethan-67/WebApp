const fs = require('fs') 

const handleGetRequest = async (req, res, route) => {
    if (route.base.endsWith('.json')) {
        route.callback(req, res) 
    }
    else {
        await readViewData(req, res, route)
        .then((data) => sendResponse(data, req, res, route))  
        .then((httpInfo) =>{ 
            let [req, res] = httpInfo
            route.callback(req, res)
        })
        .then(() => res.end())
    }
}
module.exports.handleGetRequest = handleGetRequest

const readViewData = (req, res, route) => {
    return new Promise( (resolve, reject) => {
        fs.readFile(route.path, (err, data) => {
            if (err) {
                console.error(err) 
                route.path = './src/views/404.html'
                readViewData(req, res, route)
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

const handlePostRequest = (req, res, route) => {
    readRequestBody(req, res)
    .then( (body) => route.callback(req, res, body) )
}
module.exports.handlePostRequest = handlePostRequest

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

const handleRedirect = (req, res, route) => {
    let data = fs.readFileSync(route.path)  
    sendResponse(data, req, res, route)
}
module.exports.handleRedirect = handleRedirect