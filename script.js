const startBtn = document.getElementById("startBtn");
const container = document.querySelector(".container");
const game = document.getElementById("game");
const turnMsg = document.getElementById("turnMsg");
const cells = document.querySelectorAll(".cell");

let player1 = "";
let player2 = "";
let currentPlayer = "";
let currentMark = ""; // X or O
let board = Array(9).fill(null); // Track moves

startBtn.addEventListener("click", () => {
  player1 = document.getElementById("player1").value.trim();
  player2 = document.getElementById("player2").value.trim();

  if (!player1 || !player2) {
    alert("Please enter both player names");
    return;
  }

  currentPlayer = player1;
  currentMark = "X";

  container.style.display = "none";
  game.style.display = "block";

  turnMsg.textContent = `${currentPlayer}, you're up`;
});

// Handle clicks on cells
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    // If cell already has mark, ignore
    if (cell.textContent !== "" || checkWinner()) return;

    // Place mark and update board
    cell.textContent = currentMark;
    board[index] = currentMark;

    // Check if game won
    if (checkWinner()) {
      turnMsg.textContent = `${currentPlayer} wins! 🎉`;
      return;
    }

    // Check for draw
    if (board.every(square => square !== null)) {
      turnMsg.textContent = `It's a draw! 🤝`;
      return;
    }

    // Switch player
    if (currentMark === "X") {
      currentMark = "O";
      currentPlayer = player2;
    } else {
      currentMark = "X";
      currentPlayer = player1;
    }

    turnMsg.textContent = `${currentPlayer}, you're up`;
  });
});

// Winning combinations
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function checkWinner() {
  return winningCombos.some(combo => {
    return combo.every(index => board[index] === currentMark);
  });
}
