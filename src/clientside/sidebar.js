const sidebar = document.getElementById('sidebar')

const options = [
                    document.getElementById('history'),
                    document.getElementById('game'),
                    document.getElementById('profile'), 
                    document.getElementById('settings')
                ]

let activeOption = history;

options.forEach(element => element.addEventListener('click', (e) => handleActiveElement(e.target)))

const handleActiveElement = (element) => {
    if (element.id.length === 0) {
        handleActiveElement(element.parentNode)
        return
    }
    options.forEach(element => element.classList.remove('sidebar-option-active'))
    element.classList.add('sidebar-option-active')
}

