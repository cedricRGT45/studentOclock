const container = document.createElement("div")
container.style.border = "1px solid black"
const helloWorld = document.createElement("p")
helloWorld.insertAdjacentText("beforeend", "Hello World")
helloWorld.style.margin = "auto"
container.appendChild(helloWorld)
document.body.append(container)
