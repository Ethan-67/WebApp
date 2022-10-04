import path from 'path'
import fs from 'fs'

export const generateRoute = (pathName, method, callback) => {
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

// ROUTES ARE FROZEN !"££!"$$!%!"$"

export const retrievePath = (pathName, fileExtension) => {
    let absolutePath = findFileRecursive(fs.readdirSync('./src'), './src', getFileName(pathName) + fileExtension)
    console.log(absolutePath)   
    return absolutePath
}

// search every directory in ./src/ to find specified file return the file's path
const findFileRecursive = (directory, path, item) => {
    for (let element of directory) {
        let stat = fs.statSync(path + '/' + element)
        if (stat.isDirectory()) {
            let res = findFileRecursive(fs.readdirSync(path + '/' + element), path + '/' + element, item)
            if (res != undefined) 
                return res
        }
        else 
            if (element === item) 
                return path + '/' + element 
    }
}

const supportedExtensions = {
    '.html' : 'text/html', 
    '.js' : 'text/javascript', 
    '.css' : 'text/css', 
    '.svg' : 'image/svg+xml'
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

// fs.readdirSync('./src')
    //     .forEach( elementDir => fs.readdirSync('./src/' + elementDir)
    //         .find( element => {
                
    //             if (element.toString() === getFileName(pathName) + fileExtension)
    //                 absolutePath += elementDir + '/' + getFileName(pathName) + fileExtension
    //         }))