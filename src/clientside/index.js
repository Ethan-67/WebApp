import { getBreakPoint } from "./breakPoints.js";

const mobileMenu = document.getElementsByClassName('mobile-nav-wrapper')[0]
const desktopLinks = document.getElementsByClassName('nav-links-wrapper')[0]


let throttled = false,
    menuActive = false,
    delay = 250

desktopLinks.setAttribute('hidden', '')
console.log(desktopLinks)
const handleHiddenElements = () => {
    if (!throttled) {
        const mode = getBreakPoint(window.innerWidth) 
        console.log(mode)
        switch (mode) {
            case 'mobile': 
                mobileMenu.removeAttribute('hidden')
                desktopLinks.setAttribute('hidden', '') 
            break;
            case 'desktop':   
            case 'tablet': 
                mobileMenu.setAttribute('hidden', '')
                mobileLinks.setAttribute('hidden', '')
                desktopLinks.removeAttribute('hidden') 
            break; 
            default: 
        }
        throttled = true
        setTimeout(() => {
            throttled = false 
        }, delay)
    }
}

window.addEventListener('load', handleHiddenElements) 
window.addEventListener('resize', handleHiddenElements)

const mobileLinks = document.getElementById('nav-links') 

const handleMobileMenu = (e) => {
    if (!menuActive) {
        mobileLinks.removeAttribute('hidden')
        menuActive = true
    }
    else {
        mobileLinks.setAttribute('hidden', '') 
        menuActive = false
    }
}

for (let i = 0; i < mobileMenu.children.length; i++) {
    if (mobileMenu.children[i] instanceof HTMLButtonElement) {
        mobileMenu.children[i].addEventListener('click', handleMobileMenu) 
        break
    }
}




// Requesting something from backend 
// const httpRequest = new XMLHttpRequest(); 

// httpRequest.onreadystatechange = () => {
//     if (httpRequest.readyState === XMLHttpRequest.DONE) {
//         if (httpRequest.status === 200) {
//             alert(httpRequest.responseText);
//         } else {
//             alert('There was a problem with the request.');
//         }
//     }
// }

// httpRequest.open('GET', 'http://127.0.0.1:3000/data.json', true) 
// httpRequest.setRequestHeader('Content-Type', 'application/json')
// httpRequest.send()