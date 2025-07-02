const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const statusDisplay = document.getElementById("status");
const resetButton = document.getElementById("reset");
const resultScreen = document.getElementById("result-screen");
const resultMessage = document.getElementById("result-message");
const newGameButton = document.getElementById("new-game");

let currentPlayer = "X";
let gameActive = true;
let boardState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(e) {
  const cell = e.target;
  const index = cell.dataset.index;

  if (boardState[index] !== "" || !gameActive) {
    return;
  }

  boardState[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add("taken");

  if (checkWin()) {
    showResult(`${currentPlayer} Wins!`);
    gameActive = false;
  } else if (boardState.every(cell => cell !== "")) {
    showResult("It's a Draw!");
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin() {
  return winningConditions.some(condition => 
    condition.every(index => boardState[index] === currentPlayer)
  );
}

function showResult(message) {
  resultMessage.textContent = message;
  document.querySelector(".main-screen").classList.add("hidden");
  resultScreen.classList.remove("hidden");
}

function resetGame() {
  currentPlayer = "X";
  gameActive = true;
  boardState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.textContent = `Player ${currentPlayer}'s turn`;

  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("taken");
  });
}

function startNewGame() {
  resetGame();
  resultScreen.classList.add("hidden");
  document.querySelector(".main-screen").classList.remove("hidden");
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);
newGameButton.addEventListener("click", startNewGame);

statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
