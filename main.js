import './style.css'
const canvas = document.querySelector(".canvas");
const slider = document.querySelector("#grid-slider");


function addCells() {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  canvas.appendChild(cell);
}

function createCells(numOfCells) {
  canvas.innerHTML = "";
  canvas.style.cssText = `grid-template-columns: repeat(${numOfCells}, 1fr)`;
  for(let i=0; i<numOfCells; i++) {
    for(let j=0; j<numOfCells; j++)
    addCells();
  }
}
createCells(slider.value);
slider.addEventListener('input', () => createCells(slider.value));
