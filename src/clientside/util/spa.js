import { sendHttpRequest } from "./httpRequest.js";

const root = document.getElementById('spa-root')
const head = document.getElementsByTagName('head').item(0)

export const requestFragment = (resource) => {
    resetRoot()

    sendHttpRequest('GET', resource)
    .then(data => {
        data = JSON.parse(data)
        return convertBinaryToFragment(data.fragment.data)
    })
    .then(fragment => {
        let dependencies = getDependencies(fragment)
        
        Object.keys(dependencies).forEach( key => {
            let dependency = dependencies[key]

            head.insertAdjacentHTML('beforeend', dependency)
            let resourceName = extractResourceName(dependency)
            
            sendHttpRequest('GET', resourceName)
                .then( resourceExecutable => {
                    window.eval(resourceExecutable)
                })
        })

        // TODO handle when css is last file
        if (fragment.indexOf('</script>') === -1) 
            return fragment
        else 
            return fragment.substring(fragment.lastIndexOf('</script>') + 9, fragment.length)
    })
    .then( fragment => {
        root.innerHTML = fragment   
    })
    .catch( error => console.error(error))
} 

const resetRoot = () => {
    resetDependencies()
    resetHTML()
}

const resetDependencies = () => {
    console.log(head)
    for (let child of head.children) {
        // keep default files
        console.log(child.attributes['src'])

        let src = child.attributes['src']

        if (src !== undefined) {
            if (src.nodeValue.includes('sidebar.js')) {
                // console.log('keeping: ' + child)
                continue
            }
        }

        let href = child.attributes['href']

        if (href !== undefined) {

            if (href.nodeValue.includes('main.css')) {
                // console.log('keeping: ' + child)
                continue
            }
        }

        console.log('removing: ' + child)
        head.removeChild(child)
    }
}

const resetHTML = () => {
    root.innerHTML = ''
}

const convertBinaryToFragment = (binary) => {
    let string = binary.toString().split(',').map( element => String.fromCharCode(parseInt(element, 10))).join('')
    return string
}

const extractResourceName = (tag) => {
    let begin = tag.indexOf('src') 
    let start = tag.indexOf('\"', begin) 
    let end =  tag.indexOf('\"', start + 1)
    let src = tag.substring(start, end)
    return src.substring(src.lastIndexOf('/', end))
}

const getDependencies = (fragment) => {
    const resources = { } 
    let key = 0
    let currentIndex = fragment.indexOf('<script') 

    while (currentIndex !== -1) {
        
        let end = fragment.indexOf("</script>", currentIndex + 1) + 9
        let resource = fragment.substring(currentIndex, end)
        resources[key++] = resource

        currentIndex = fragment.indexOf('<script', end)
    }
    return resources
}