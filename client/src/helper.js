
export const toggleClass = (e, className) => {
        let el = document.querySelector(e)
        el.classList.toggle(className)
}

export const removeClass = (e, className) => {
        let el= document.querySelector(e)
        el.classList.remove(className)
}

export const api_base_url = "http://localhost:3000"



