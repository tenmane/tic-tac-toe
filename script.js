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
  function occupiedByMark(mark) {
    let positions = [];
    for (let i = 0; i < board.length; i++) {
      if (board[i] === mark) {
        positions.push(i);
      }
    }
    return positions;
  }
  return {
    getBoard,
    placeMarker,
    printBoard,
    resetBoard,
    occupiedByMark
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
      let winner = checkWinCondition();
      if (winner) {
        console.log(`${activePlayer.name} is the winner!`);
        myBoard.resetBoard();
      }
      activePlayer == players[0] ? activePlayer = players[1] : activePlayer = players[0];
    }
    else {
      console.log("The position is occupied");
    }
  }

  const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
  ]
  function checkWinCondition() {
    const occupiedSpots = myBoard.occupiedByMark(activePlayer.mark);
    let containsAll = false;
    for (let i = 0; i < winConditions.length; i++) {
      containsAll = winConditions[i].every(position => occupiedSpots.includes(position));
      if (containsAll) {
        break;
      }
    }
    return containsAll;
  }

  return {
    playGame, getActivePlayer
  }
})();
