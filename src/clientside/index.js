let mobileMenuBtn = document.getElementsByClassName('mobile-menu-btn')[0]
let mobileMenu = document.getElementById('nav-links') 

mobileMenu.style.display = 'none'; 

mobileMenuBtn.addEventListener('click', (e) => {
    if (mobileMenu.style.display === 'none') {
        mobileMenu.style.display = 'flex'; 
        mobileMenuBtn.style.backgroundColor = '#BDB76B'
    }
    else {
        mobileMenu.style.display = 'none'
        mobileMenuBtn.style.backgroundColor = '#262626'
    }
})






















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