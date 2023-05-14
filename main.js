import "./style.css";

const canvas = document.querySelector(".canvas");
const slider = document.querySelector("#grid-slider");
const range = document.querySelector(".range");
const monoColorMode = document.querySelector(".mono-color");
const multiColorMode = document.querySelector(".multi-color");
const eraser = document.querySelector(".eraser");
const allClear = document.querySelector(".all-clear");
const colorPicker = document.querySelector("#color-picker");
const buttons = document.querySelectorAll("#btn");
let color = "#bada55";
let colorMono = "#bada55";

allClear.addEventListener("click", () => {
  const cells = document.querySelectorAll(".cell");
  for (let i = 0; i < cells.length; i++)
    cells[i].style.cssText = "background-color: #333333;";
});

multiColorMode.addEventListener("click", () => {
  multiColorCells();
})

colorPicker.addEventListener("input", () => {
  color = colorPicker.value;  
  colorMono = colorPicker.value;
  console.log(color);
});

monoColorMode.addEventListener("click", () => {
  colorCells();
});

eraser.addEventListener("click", () => erase());

function erase() {
  let isErasing = false;

  canvas.addEventListener("mousedown", (event) => {
    event.target.style.backgroundColor = "#333333";
    isErasing = true;
  });

  canvas.addEventListener("mouseup", () => {
    isErasing = false;
  });

  canvas.addEventListener("mouseover", (event) => {
    if (isErasing && event.target.classList.contains("cell")) {
      event.target.style.backgroundColor = "#333333";
    }
  });
}

function addCells() {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  canvas.appendChild(cell);
}

function createCells(numOfCells) {
  range.innerHTML = `${numOfCells} x ${numOfCells}`;
  canvas.innerHTML = "";
  canvas.style.cssText = `grid-template-columns: repeat(${numOfCells}, 1fr)`;
  for (let i = 0; i < numOfCells; i++) {
    for (let j = 0; j < numOfCells; j++) addCells();
  }
  colorCells();
}

createCells(slider.value);
slider.addEventListener("input", () => createCells(slider.value));

function colorCells() {
  let isColoring = false;

  canvas.addEventListener("mousedown", (event) => {
    event.target.style.cssText = `background-color: ${colorMono};`
    isColoring = true;
  });

  canvas.addEventListener("mouseup", () => {
    isColoring = false;
  });

  canvas.addEventListener("mouseover", (event) => {
    if (isColoring && event.target.classList.contains("cell")) {
      event.target.style.cssText = `background-color: ${colorMono};`
    }
  });
}

function multiColorCells() {
  let isColoring = false;

  canvas.addEventListener("mousedown", (event) => {
    const red = Math.floor(Math.random() * 255);
    const green = Math.floor(Math.random() * 255);
    const blue = Math.floor(Math.random() * 255);
    color = `rgb(${red}, ${green}, ${blue})`;
    event.target.style.backgroundColor = color;
    isColoring = true;
  });

  canvas.addEventListener("mouseup", () => {
    isColoring = false;
  });

  canvas.addEventListener("mouseover", (event) => {
    if (isColoring && event.target.classList.contains("cell")) {
      const red = Math.floor(Math.random() * 255);
      const green = Math.floor(Math.random() * 255);
      const blue = Math.floor(Math.random() * 255);
      color = `rgb(${red}, ${green}, ${blue})`;
      event.target.style.backgroundColor = color;
    }
  });
}

for(let i=0; i<buttons.length; i++) {
  buttons[i].addEventListener("click", () => {
    for(let i=0; i<buttons.length; i++) {
      buttons[i].classList.remove("active");
    }
    buttons[i].classList.add("active");
  })
}
