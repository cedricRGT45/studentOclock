const container = document.createElement("div")
const helloWorld = document.createElement("p")
console.log(container, helloWorld)
helloWorld.innerHTML = "Hello World"
container.appendChild(helloWorld)