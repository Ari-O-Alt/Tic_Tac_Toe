// constants holding the mark classes
const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
// constant holding the selection of the board
const boardSelection = document.getElementById('board');
// constant holding the selection of all the cells
const cellsElements = document.querySelectorAll('[data-cell]');
// variable holding the turn of the marks
let circleTurn = false;
// constant holding all the possible winning combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
// constant storing the message
const winningMessageText = document.querySelector('[data-winning-message-text]');
// constant storing the popover
const winningMessageElement = document.getElementById('winningMessage');
// const storing the button
const restartButton = document.getElementById('restartButon');
restartButton.addEventListener('click', startGame);

function startGame() {
  circleTurn = false;
  // for each cell attach the handleClick function and make it happen once per cell
  cellsElements.forEach((cellElement) => {
    cellElement.classList.remove(CIRCLE_CLASS);
    cellElement.classList.remove(X_CLASS);
    cellElement.removeEventListener('click', handleClick);
    cellElement.addEventListener('click', handleClick, { once: true });
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove('show');
}

startGame();

// function adding the mark to the board
function handleClick(event) {
  const selectedCell = event.target;
  const currentMarkClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  addMark(selectedCell, currentMarkClass);
  if (checkWin(currentMarkClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    toggleTurns();
    setBoardHoverClass();
  }
}

// helper function
function addMark(cell, markClass) {
  cell.classList.add(markClass);
}

function toggleTurns() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  boardSelection.classList.remove(X_CLASS);
  boardSelection.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    boardSelection.classList.add(CIRCLE_CLASS);
  } else {
    boardSelection.classList.add(X_CLASS);
  }
}

function checkWin(currentClass) {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cellsElements[index].classList.contains(currentClass);
    });
  });
}

function endGame(isDraw) {
  if (isDraw) {
    winningMessageText.innerText = "It's a draw!";
  } else {
    winningMessageText.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
  }
  winningMessageElement.classList.add('show');
}

function isDraw() {
  return [...cellsElements].every((cellElement) => {
    return cellElement.classList.contains(X_CLASS) || cellElement.classList.contains(CIRCLE_CLASS);
  });
}
