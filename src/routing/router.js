import { generateRoute } from './generateRoute.js'
import { handleGetRequest, handlePostRequest, handleRedirect } from './handleRequest.js'

const _get = 'GET' 
const _post = 'POST'
const _put = 'PUT' 
const _delete = 'DELETE'

export default class Router {
    constructor() {
        this.routes = {} 
    }

    directRequest(req, res) {
        let route = this.#getRoute(req.url, req.method)
        this.get('d', ()=> {})
        switch (req.method) {
            case _get: 
                handleGetRequest(req, res, route)
            break
            case _post: 
                handlePostRequest(req, res, route)
            break 
            case _put: 
           
            break 
            case _delete: 

            break 
            default: 
        }
    }

    get(path, callback) {
        this.#addToRoutes(path, callback, _get)
    }

    post(path, callback) {
        this.#addToRoutes(path, callback, _post)
    }

    redirect(req, res, path) {
        let route = {... this.#getRoute(path, _get)}
        route.callback = () => {}
        handleRedirect(req, res, route)
    }

    #addToRoutes(path, callback, method) {
        if (Object.keys(this.routes).includes(path)) {
            // check for duplicates 
            if (this.routes[path].find(element => element.method.toString() === method) !== undefined) {
                // throw err
                return 
            }
            this.routes[path].push(generateRoute(path, method, callback))
        }
        else {
            this.routes[path] = [generateRoute(path, method, callback)]
        }
    }

    #getRoute(basename, method) {
        return this.routes[basename] === undefined ? generateRoute(basename) : 
            this.routes[basename].find( (element) => element.method === method)
    }

    #print() {
        Object.keys(this.routes).forEach((key) => {
            console.log(key) 
            console.dir(this.routes[key])
        })
    }
}