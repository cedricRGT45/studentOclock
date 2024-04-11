const container = document.createElement("div")
container.style.border = "1px solid black"
container.style.width = "auto"
const helloWorld = document.createElement("p")
helloWorld.insertAdjacentText("beforeend",) = "Hello World"
container.appendChild(helloWorld)
document.body.append(container)
