const container = document.createElement("div")
container.style.display ="flex"
container.style.justifyContent= "center"
const helloWorld = document.createElement("h1")
helloWorld.insertAdjacentText("beforeend", "Hello World")
container.appendChild(helloWorld)
document.body.append(container)
