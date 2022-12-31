const gameBoard = (() => {
  const gameArr = Array(9).fill('');

  const gameArrLength = () => { return gameArr.length };
  const accessElement = (i) => { return gameArr[i] };
  const changeElement = (idx, marker) => { gameArr[idx] = marker };

  return {
    gameArrLength,
    accessElement,
    changeElement,
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

  const refreshGrid = () => {
    clearGrid();
    displayGrid();
    listenForClick();
  }

  return {
    refreshGrid,
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
 
 const handleClick = () => {
  const idx = this.event.explicitOriginalTarget.attributes['data-idx'].value;
  placeMarker(idx);
  changeTurn();

  displayController.refreshGrid();
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