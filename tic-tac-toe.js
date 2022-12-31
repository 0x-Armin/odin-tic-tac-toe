const gameBoard = (() => {
  const gameArr = Array(9).fill('');

  const gameArrLength = () => { return gameArr.length };
  const accessElement = (i) => { return gameArr[i] };
  const changeElement = (idx, marker) => { gameArr[idx] = marker };
  const includes = (ele) => { return gameArr.includes(ele)};

  return {
    gameArrLength,
    accessElement,
    changeElement,
    includes,
  };
})();

const displayController = (() => {
  const gameGrid = document.getElementById('game-grid');

  const clearGrid = () => {
    gameGrid.innerHTML = '';
  };

  const displayGrid = () => {
    for (let i = 0; i < gameBoard.gameArrLength(); i++) {
      const cell = document.createElement('div');
      cell.innerHTML = gameBoard.accessElement(i);
      cell.className = 'cell';
      cell.dataset.idx = i;
      gameGrid.appendChild(cell);
    }
  };

  const listenForClick = () => {
    const cellArr = document.querySelectorAll('.cell');
    cellArr.forEach((cell) => cell.addEventListener('click', gameLogic.handleClick));
  };

  const stopListenForClick = () => {
    const cellArr = document.querySelectorAll('.cell');
    cellArr.forEach((cell) => cell.removeEventListener('click', gameLogic.handleClick)); 
  }

  const refreshGrid = () => {
    clearGrid();
    displayGrid();
    listenForClick();
  }

  return {
    refreshGrid,
    stopListenForClick,
  };
})();

const gameLogic = (() => {
  /*
  Player 1: Uses 'X'. In game logic, '0' bit -> Player 1
  Player 2: Uses 'O'. In game logic, '1' bit -> Player 2
  */
 let whichPlayer = 0;
 const playerMarker = ['X', 'O'];

 const changeTurn = () => {
  whichPlayer = 1 - whichPlayer;
 }

 const checkCellEmpty = (idx) => {
  return gameBoard.accessElement(idx) === '';
 }

 const placeMarker = (idx) => {
  if (checkCellEmpty(idx)) gameBoard.changeElement(idx, playerMarker[whichPlayer]);
 }

 const checkIfGameEnd = () => {
  // Win
  // Row
  for (let i = 0; i < 7; i += 3) {
    if (gameBoard.accessElement(i) !== '') {
      if (gameBoard.accessElement(i) === gameBoard.accessElement(i+1) &&
          gameBoard.accessElement(i+1) === gameBoard.accessElement(i+2)) {
            return gameBoard.accessElement(i);
          }
    }
  }

  // Col
  for (let i = 0; i < 3; i++) {
    if (gameBoard.accessElement(i) !== '') {
      if (gameBoard.accessElement(i) === gameBoard.accessElement(i+3) &&
          gameBoard.accessElement(i+3) === gameBoard.accessElement(i+6)) {
            return gameBoard.accessElement(i);
          }
    }
  }

  // Diagonals- top left to bottom right and top right to bottom left
  if (gameBoard.accessElement(0) !== '') {
    if (gameBoard.accessElement(0) === gameBoard.accessElement(4) &&
    gameBoard.accessElement(4) === gameBoard.accessElement(8)) {
      return gameBoard.accessElement(0);
    } 
  }

  if (gameBoard.accessElement(2) !== '') {
    if (gameBoard.accessElement(2) === gameBoard.accessElement(4) &&
    gameBoard.accessElement(4) === gameBoard.accessElement(6)) {
      return gameBoard.accessElement(2);
    } 
  }

  // Tie
  if (!gameBoard.includes('')) return 'T';

  return 'C'; // 'C' for Continue
 }
 
 const handleClick = () => {
  const idx = this.event.explicitOriginalTarget.attributes['data-idx'].value;
  placeMarker(idx);
  changeTurn();

  displayController.refreshGrid();

  gameOutcome = checkIfGameEnd();
  if (gameOutcome !== 'C') {
    displayController.stopListenForClick();
    if (gameOutcome === 'T') {
      console.log("It's a tie!");
    } else {
      console.log(gameOutcome);
    }
  }
 } 

 return {
  changeTurn,
  handleClick
 }

})();

const player = (name) => {
  const getName = () => { return name } ;

  return {
    getName,
  }
};

displayController.refreshGrid();