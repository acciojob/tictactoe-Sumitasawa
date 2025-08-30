const startBtn = document.getElementById("submit");
const container = document.querySelector(".container");
const game = document.getElementById("game");
const turnMsg = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");
const heading=document.getElementById("head");
let player1 = "";
let player2 = "";
let currentPlayer = "";
let currentMark = ""; 
let board = Array(9).fill(null); // Track moves

startBtn.addEventListener("click", () => {
  player1 = document.getElementById("player-1").value.trim();
  player2 = document.getElementById("player-2").value.trim();

  if (!player1 || !player2) {
    alert("Please enter both player names");
    return;
  }

  currentPlayer = player1;
  currentMark = "X";

	head.style.display="none";
  container.style.display = "none";
  game.style.display = "block";

  turnMsg.textContent = `${currentPlayer}, you're up`;
});

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (cell.textContent !== "" || checkWinner()) return;

  
    cell.textContent = currentMark;
    board[index] = currentMark;

    if (checkWinner()) {
      turnMsg.textContent = `${currentPlayer} wins! 🎉`;
      return;
    }

 
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
