export const sendHttpRequest = (method, resource, data) => {
    return new Promise( (resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open(method, resource) 
        xhr.setRequestHeader('Content-Type', 'application/json')
        
        xhr.onload = () => {
            if (xhr.status >= 400) 
                reject(xhr.response)
            else
                resolve(xhr.response)
        }

        xhr.onerror = (e) => {
            reject(e)
        }

        xhr.send(JSON.stringify(data))
    })
}
