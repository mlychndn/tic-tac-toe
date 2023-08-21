const gameboardConatiner = document.querySelector("#gameboard");
const emptyArray = new Array(9).fill("");
const turn = document.querySelector(".turn");
const button = document.querySelector(".button");

// console.log("turn", turn);
let usedVal = "cross";
let count = 0;
let winflag = false;
const winningCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

if (count < 9) {
  button.style.display = "none";
}

function startGame() {
  let startGame = usedVal === "cross" ? "circle ⭕" : "cross ❌";
  turn.innerText = `${startGame} player turn !`;
}
startGame();

// callback function attached to event listeners
const addChoice = (event) => {
  count++;
  const circle = document.createElement("div");
  const cross = document.createElement("div");

  circle.classList.add("gameboard-circle");
  cross.classList.add("gameboard-cross");

  usedVal = usedVal === "circle" ? "cross" : "circle";

  usedVal === "circle"
    ? event.target.append(circle)
    : event.target.append(cross);

  startGame();

  event.target.removeEventListener("click", addChoice);
  winningPredection();
};

// craeting grid elements inside gameboard and adding event listener to each gameboard cell
function buildGame() {
  emptyArray.forEach((_el, idx) => {
    const div = document.createElement("div");
    div.classList.add("gameboard-cell");
    gameboardConatiner.appendChild(div);
    if (idx === 0) {
      div.classList.add("gameboard-cell-0");
    } else if (idx === 2) {
      div.classList.add("gameboard-cell-2");
    } else if (idx === 6) {
      div.classList.add("gameboard-cell-6");
    } else if (idx === 8) {
      div.classList.add("gameboard-cell-8");
    }
    div.setAttribute("id", idx);
    div.addEventListener("click", addChoice);
  });
}

buildGame();

function winningPredection() {
  const squares = document.querySelectorAll(".gameboard-cell");

  winningCombination.forEach((combination) => {
    const circleFlag = combination.every((el) =>
      squares[el]?.firstChild?.classList.contains("gameboard-circle")
    );

    if (circleFlag) {
      turn.innerText = `Circle player won!`;
      combination.forEach((el) => {
        // console.log(squares[el].firstChild);
        squares[el]?.firstChild.classList.add("win");
      });
      squares.forEach((square) => square.replaceWith(square.cloneNode(true)));

      winflag = true;

      button.style.display = "block";
      return;
    }
  });

  winningCombination.forEach((combination) => {
    const crossFlag = combination.every((el) =>
      squares[el]?.firstChild?.classList.contains("gameboard-cross")
    );

    if (crossFlag) {
      turn.innerText = `Cross player won!`;
      combination.forEach((el) => {
        squares[el]?.firstChild.classList.add("win");
      });
      squares.forEach((square) => square.replaceWith(square.cloneNode(true)));
      winflag = true;
      button.style.display = "block";
      return;
    }
  });

  if (winflag === false && count === 9) {
    turn.innerText = "Game Over!";
    button.style.display = "block";
  }
}

const reset = function (e) {
  e.preventDefault();
  console.log("clicked");
  gameboardConatiner.innerHTML = "";
  turn.innerHTML = "";
  buildGame();
};

button.addEventListener("click", reset);
