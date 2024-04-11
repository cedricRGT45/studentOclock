const container = document.createElement("div")
container.style.display ="flex"
container.style.justifyContent= "center"
const helloWorld = document.createElement("h1")
helloWorld.insertAdjacentText("beforeend", "Hello World")
const classDiagram = createElement("img")
classDiagram.src = 
container.appendChild(helloWorld)
document.body.append(container)

container.addEventListener('mouseover', () => {
    helloWorld.innerText = "Hello YOU";
  });

  // Add a mouseout event listener
container.addEventListener('mouseout', () => {
    helloWorld.innerText = "Ciao";
  });