const squareContainer = document.querySelector(".square-container");
let squaresPerRow = 16;
const gridBtn = document.getElementById("grid-selector");
const clearBtn = document.getElementById("grid-clear");

function createGrid() {
  for (let i = 0; i < squaresPerRow * squaresPerRow; i++) {
    const square = document.createElement("div");

    square.classList.add("square");
    square.style.width = `${100 / squaresPerRow}%`;
    square.style.height = `${100 / squaresPerRow}%`;
    square.style.borderColor = "black";
    square.style.opacity = "0.2";


    square.addEventListener("mouseover", () => {
      square.style.backgroundColor = "#333";
      square.style.opacity = parseFloat(square.style.opacity) + 0.2;
    });

    square.addEventListener('click', () => {
        square.style.backgroundColor = "darkGreen";
        square.style.opacity = parseFloat(square.style.opacity) + 0.2;
    })
    console.log(i);
    squareContainer.appendChild(square);

   /* setInterval(() => {
      square.style.backgroundColor = "white";
    }, 5000);
     */
  }
   
}

createGrid();

function clearGrid() {
  squareContainer.innerHTML = "";
}

gridBtn.addEventListener("click", () => {
  let newSize = prompt("Enter new grid size (max: 100):");

  if (newSize !== null && !isNaN(newSize) && newSize > 0 && newSize <= 100) {
    squaresPerRow = parseInt(newSize);
  } else {
    alert("Invalid input. Please enter a number between 1 and 100.");
    return;
  }
  clearGrid();

  createGrid();
});

clearBtn.addEventListener('click', () => {
    const squares = document.querySelectorAll(".square");
    squares.forEach(square => square.style.backgroundColor = "white");
})