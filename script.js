// Game Variables
let board = Array(9).fill(null); // Represents the game board
let currentPlayer = "X"; // X starts first
let gameActive = true; // Tracks if the game is still active

// DOM Elements
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");

// Winning Combinations
const winningCombinations = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal (top-left to bottom-right)
  [2, 4, 6], // Diagonal (top-right to bottom-left)
];

// Add Event Listeners
cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);

// Handle Cell Click
function handleCellClick(event) {
  const cell = event.target;
  const index = cell.getAttribute("data-index");

  // Check if the cell is already occupied or the game is over
  if (board[index] || !gameActive) return;

  // Update the board and UI
  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(`player-${currentPlayer}`); // Add class for styling

  // Check for a winner or draw
  if (checkWin()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (checkDraw()) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  // Switch players
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `It's ${currentPlayer}'s turn`;
}

// Check for a Win
function checkWin() {
  return winningCombinations.some((combination) => {
    return combination.every((index) => board[index] === currentPlayer);
  });
}

// Check for a Draw
function checkDraw() {
  return board.every((cell) => cell !== null);
}

// Reset the Game
function resetGame() {
  // Reset the board and UI
  board.fill(null);
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("player-X", "player-O");
  });

  // Reset game state
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = `It's ${currentPlayer}'s turn`;
}
