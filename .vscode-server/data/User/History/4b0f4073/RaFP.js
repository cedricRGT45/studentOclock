const container = document.createElement("div")
container.style.display ="flex"
container.style.justifyContent= "center"
const helloWorld = document.createElement("h1")
helloWorld.insertAdjacentText("beforeend", "Hello World")
const classDiagram = document.createElement("img")
classDiagram.src = "./classUml.png"
console.log(classDiagram)
container.appendChild(helloWorld, classDiagram)
document.body.append(container)

container.addEventListener('mouseover', () => {
    helloWorld.innerText = "Hello YOU";
  });

  // Add a mouseout event listener
container.addEventListener('mouseout', () => {
    helloWorld.innerText = "Ciao";
  });