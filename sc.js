const loginScreen = document.getElementById("loginScreen");
const gameScreen = document.getElementById("gameScreen");
const startBtn = document.getElementById("startBtn");
const player1Input = document.getElementById("player1");
const player2Input = document.getElementById("player2");
const turnText = document.getElementById("turnText");
const board = document.getElementById("board");
const cells = document.querySelectorAll("[data-cell]");
const resultScreen = document.getElementById("resultScreen");
const resultText = document.getElementById("resultText");
const restartBtn = document.getElementById("restartBtn");

let player1, player2;
let currentPlayer;
let gameActive = true;
let boardState = Array(9).fill("");

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

// Start Game
startBtn.addEventListener("click", () => {
  player1 = player1Input.value.trim();
  player2 = player2Input.value.trim();

  if (!player1 || !player2) {
    alert("Please enter names for both players!");
    return;
  }

  loginScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");

  currentPlayer = player1;
  turnText.textContent = `${currentPlayer}'s Turn (X)`;
});

// Handle Cell Click
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (!gameActive || boardState[index] !== "") return;

    const mark = currentPlayer === player1 ? "X" : "O";
    boardState[index] = mark;
    cell.textContent = mark;

    if (checkWin(mark)) {
      endGame(`${currentPlayer} Wins!`);
    } else if (boardState.every(cell => cell !== "")) {
      endGame("It's a Draw!");
    } else {
      currentPlayer = currentPlayer === player1 ? player2 : player1;
      const nextMark = currentPlayer === player1 ? "X" : "O";
      turnText.textContent = `${currentPlayer}'s Turn (${nextMark})`;
    }
  });
});

// Check Win
function checkWin(mark) {
  return winPatterns.some(pattern =>
    pattern.every(index => boardState[index] === mark)
  );
}

// End Game
function endGame(message) {
  gameActive = false;
  resultText.textContent = message;
  resultScreen.classList.remove("hidden");
}

// Restart Game
restartBtn.addEventListener("click", () => {
  boardState.fill("");
  cells.forEach(cell => (cell.textContent = ""));
  resultScreen.classList.add("hidden");
  gameActive = true;
  currentPlayer = player1;
  turnText.textContent = `${currentPlayer}'s Turn (X)`;
});

// Handle Cell Click
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (!gameActive || boardState[index] !== "") return;

    const mark = currentPlayer === player1 ? "X" : "O";
    boardState[index] = mark;
    cell.textContent = mark;
    cell.classList.add(mark.toLowerCase()); // Add class for color styling

    if (checkWin(mark)) {
      endGame(`${currentPlayer} Wins!`);
    } else if (boardState.every(cell => cell !== "")) {
      endGame("It's a Draw!");
    } else {
      currentPlayer = currentPlayer === player1 ? player2 : player1;
      const nextMark = currentPlayer === player1 ? "X" : "O";
      turnText.textContent = `${currentPlayer}'s Turn (${nextMark})`;
    }
  });
});

// Restart Game
restartBtn.addEventListener("click", () => {
  boardState.fill("");
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("x", "o"); // Remove color classes
  });
  resultScreen.classList.add("hidden");
  gameActive = true;
  currentPlayer = player1;
  turnText.textContent = `${currentPlayer}'s Turn (X)`;
});

