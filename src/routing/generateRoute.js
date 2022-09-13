const path = require('path')

const generateRoute = (pathName, method, callback) => {
    if (callback === undefined) 
        callback = () => {}
    let fileExtension = getFileExtension(pathName)
    return {
        base: pathName, 
        path: retrievePath(pathName, fileExtension), 
        method: method, 
        callback : callback, 
        headers: [{'Content-Type' : getContentType(fileExtension)}]
    }
}
module.exports.generateRoute = generateRoute

const retrievePath = (pathName, fileExtension) => {
    return getFileDirectory(fileExtension) + getFileName(pathName) + fileExtension
}
module.exports.retrievePath = retrievePath

const supportedExtensions = {
    '.html' : 'text/html', 
    '.js' : 'text/javascript', 
    '.css' : 'text/css', 
    '.svg' : 'image/svg+xml'
}
// hard coded corresponding files need to belong to these directories 
const fileDirectories = {
    '.html' : './src/views/', 
    '.js' : './src/clientside/', 
    '.css' : './src/styles/', 
    '.ico' : './src/images/',
    '.img' : './src/images/', 
    '.svg' : './src/images/',
}

const getFileName = (pathname) => {
    if (pathname === '/')
        return  'index'
    else 
        return (path.basename(pathname)).replace(/\.[^/.]+$/, "")
}

// if no extension then we are using the routes from router - can assume html file 
const getFileExtension = (fileName) => {
    let fileExt = path.extname(fileName)
    return fileExt === '' ? '.html' : fileExt
}

const getContentType = (fileExtension) => {
    return supportedExtensions[fileExtension] ?? 'application/octet-stream'
}

const getFileDirectory = (fileExtension) => {
    return fileDirectories[fileExtension] ?? './'
}