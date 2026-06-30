const myBoard = (function gameBoard() {
  const board = [];
  board.length = 9;
  function getBoard() {
    return board;
  }
  function placeMarker(position, mark) {
    let markValidity = true;
    if (board[position] != undefined || position >= 9 || position < 0) {
      markValidity = false;
    }
    else {
      board[position] = mark;
    }
    return markValidity;
  }
  function printBoard() {
    for (let i = 0; i < board.length; i++) {
      console.log(`Item at position ${i}: ${board[i]}`);
    }
  }
  function resetBoard() {
    board.length = 0;
    board.length = 9;
  }
  return {
    getBoard,
    placeMarker,
    printBoard,
    resetBoard
  }
})();

const myGame = (function gameController(playerOneName = "Player One", playerTwoName = "Player Two") {

  const playerScore = 0;
  const computerScore = 0;

  const players = [{
    name: playerOneName,
    mark: "X",
  },
  {
    name: playerTwoName,
    mark: "O",
  }]

  let activePlayer = players[0];

  function getActivePlayer() {
    return activePlayer;
  }
  function playGame(position) {
    let isPlayValid = myBoard.placeMarker(position, activePlayer.mark);
    if (isPlayValid) {
      console.log(`${activePlayer.name} placed ${activePlayer.mark} at position: ${position}`);
      activePlayer == players[0] ? activePlayer = players[1] : activePlayer = players[0];
    }
    else {
      console.log("The position is occupied");
    }
  }
  return {
    playGame, getActivePlayer
  }
})();
