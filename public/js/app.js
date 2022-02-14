console.log("Client side javascript file is loaded up")

const weatherForm = document.querySelector("form")
const searchValue = document.querySelector("input")
const messageOne = document.querySelector("#messageOne")
const messageTwo = document.querySelector("#messageTwo")

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const location = searchValue.value

    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""
    
    fetch("http://localhost:3000/weather?address=" + location).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            messageOne.textContent = data.error
            messageTwo.textContent = ""

        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forcast
        }
    })
})
})