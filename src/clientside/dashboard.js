import { sendHttpRequest } from './util/httpRequest.js'

const root = document.getElementById('spa-root')

sendHttpRequest('GET', '/games.json')
 .then(data => {
        data = JSON.parse(data)
        console.log(data + ' ' + root)
        root.insertAdjacentHTML('afterbegin', `${data}`)
 }) 

 