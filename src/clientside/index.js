import { sendHttpRequest } from './httpRequest.js'

const port = 3000
const hostname = '127.0.0.1'

let loginForm = document.getElementById('login-form')


const validateInput = (e) => {
    e.preventDefault();
    let username = e.target.elements.username.value
    let password = e.target.elements.password.value

    if (isValidLoginInputs(username, password)) {
        const user = {username: username, password: password}
        sendHttpRequest('POST', '/validate.json', user)
         .then( res => {
            res = JSON.parse(res) 
            if (res.result === 'Invalid') {
                document.getElementsByClassName('form-crediental-check')[0].textContent = 'Invalid Login'
            }
            else {
                // write to session storage user setting for use in the app
                window.location = 'https://127.0.0.1:3000/games'
            }
         })
         .catch( e => console.error(e))
    }
}

const isValidLoginInputs = (username, password) => {
    let isValid = true; 
    if (username === '') {
        document.getElementsByClassName('username-error-check')[0].textContent = 'Username cannot be blank'
        isValid = false
    }
    else 
        document.getElementsByClassName('username-error-check')[0].textContent = ''

    if (password === '') {
        document.getElementsByClassName('password-error-check')[0].textContent = 'Password cannot be blank'
        isValid = false
    }
    else 
        document.getElementsByClassName('password-error-check')[0].textContent = ''

    return isValid
}

loginForm.addEventListener('submit', validateInput)