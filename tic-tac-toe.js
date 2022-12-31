const gameBoard = (() => {
  const gameArr = ['X', 'O', 'X', 'O', 'X', 'X', 'O', 'X', 'O'];

  const gameArrLength = () => { return gameArr.length };
  const accessElement = (i) => { return gameArr[i] };

  return {
    gameArrLength,
    accessElement,
  };
})();

const gameGrid = document.getElementById('game-grid');
for (let i = 0; i < gameBoard.gameArrLength(); i++) {
  console.log('running...');
  const cell = document.createElement('div');
  cell.innerHTML = gameBoard.accessElement(i);
  cell.className = 'cell';
  gameGrid.appendChild(cell);
}