const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellClick(event) {
  const clickedCell = event.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

  if (gameState[clickedCellIndex] !== '' || !gameActive) {
    return;
  }

  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;

  checkResult();
}

function checkResult() {
  let roundWon = false;

  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
      continue;
    }
    if (gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusDisplay.textContent = `Player ${currentPlayer} has won!`;
    gameActive = false;
    return;
  }

  const roundDraw = !gameState.includes('');
  if (roundDraw) {
    statusDisplay.textContent = 'Game ended in a draw!';
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
}

function handleReset() {
  currentPlayer = 'X';
  gameActive = true;
  gameState = ['', '', '', '', '', '', '', '', ''];
  statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
  cells.forEach(cell => cell.textContent = '');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', handleReset);

// Initialize the game status
statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
