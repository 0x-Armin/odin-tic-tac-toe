const gameBoard = (() => {
  const gameArr = ['X', 'O', 'X', 'O', 'X', 'X', 'O', 'X', 'O'];

  const gameArrLength = () => { return gameArr.length };
  const accessElement = (i) => { return gameArr[i] };

  return {
    gameArrLength,
    accessElement,
  };
})();

const displayController = (() => {
  const gameGrid = document.getElementById('game-grid');

  const displayGrid = () => {
    for (let i = 0; i < gameBoard.gameArrLength(); i++) {
      console.log('running...');
      const cell = document.createElement('div');
      cell.innerHTML = gameBoard.accessElement(i);
      cell.className = 'cell';
      gameGrid.appendChild(cell);
    }
  }

  return {
    displayGrid,
  };
})();

displayController.displayGrid();


