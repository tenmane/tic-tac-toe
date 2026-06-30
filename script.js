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
  function isBoardFull() {
    let boardFull = true;
    for (let i = 0; i < board.length; i++) {
      if (board[i] == undefined) {
        boardFull = false;
        break;
      }
    }
    return boardFull;
  }
  return {
    getBoard,
    placeMarker,
    printBoard,
    resetBoard,
    occupiedByMark,
    isBoardFull
  }
})();

const myGame = (function gameController(playerOneName = "Player One", playerTwoName = "Player Two") {

  const players = [{
    name: playerOneName,
    mark: "X",
    score: 0,
  },
  {
    name: playerTwoName,
    mark: "O",
    score: 0,
  }]

  let activePlayer = players[0];

  function getActivePlayer() {
    return activePlayer;
  }
  function setActivePlayer() {
    activePlayer = players[0];
  }

  function setPlayerOneName(name) {
    players[0].name = name;
  }
  function setPlayerTwoName(name) {
    players[1].name = name;
  }

  function getPlayerOneScore() {
    return players[0].score;
  }
  function getPlayerTwoScore() {
    return players[1].score;
  }

  function playGame(position) {
    let isPlayValid = myBoard.placeMarker(position, activePlayer.mark);
    let isBoardFull = myBoard.isBoardFull();
    let gameOver = false;
    if (isPlayValid) {
      let winner = checkWinCondition();
      if (winner) {
        myBoard.resetBoard();
        gameOver = true;
        return "win";
      }
      else if (isBoardFull) {
        myBoard.resetBoard();
        gameOver = true;
        return "tie";
      }
      if (!gameOver) {
        activePlayer == players[0] ? activePlayer = players[1] : activePlayer = players[0];
      }
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
    playGame, getActivePlayer, setPlayerOneName,
    setPlayerTwoName, setActivePlayer, getPlayerOneScore,
    getPlayerTwoScore,
  }
})();

const display = (function handleDisplay() {
  let startButton = document.querySelector(".start-button");
  let resetButton = document.querySelector(".reset-button");
  let gameStarted = false;

  startButton.addEventListener("click", startGame)
  function startGame() {
    let playerOneName = document.querySelector("#player-one-name").value;
    let playerTwoName = document.querySelector("#player-two-name").value;
    if (playerOneName != "") {
      myGame.setPlayerOneName(playerOneName);
    }
    if (playerTwoName != "") {
      myGame.setPlayerTwoName(playerTwoName);
    }

    let playerOneScoreboard = document.querySelector(".player-one-score > span");
    let playerTwoScoreBoard = document.querySelector(".player-two-score > span");

    playerOneScoreboard.textContent = `${playerOneName} (X): ${myGame.getPlayerOneScore()}`
    playerTwoScoreBoard.textContent = `${playerTwoName} (O): ${myGame.getPlayerTwoScore()}`
    gameStarted = true;

    declareTurn();
    const turn = document.querySelector(".declare-turn");
    turn.style.visibility = "visible";

    for (let i = 0; i < 9; i++) {
      let cell = document.querySelector(`#cell-${i}`);
      cell.disabled = false;
    }
  }

  resetButton.addEventListener("click", resetBoard)
  function resetBoard() {
    myBoard.resetBoard();
    for (let i = 0; i < 9; i++) {
      let cell = document.querySelector(`#cell-${i}`);
      cell.textContent = "";
      cell.disabled = false;
    }
    myGame.setActivePlayer();
    declareTurn();
  }

  function inputBoard() {
    for (let i = 0; i < 9; i++) {
      let cell = document.querySelector(`#cell-${i}`);
      let position = i;

      if (!gameStarted) {
        cell.disabled = true;
      }

      cell.addEventListener("click", function () {
        const mark = myGame.getActivePlayer().mark;
        const name = myGame.getActivePlayer().name;

        const winCheck = myGame.playGame(position);
        cell.textContent = mark;
        if (winCheck === "win") {
          const modal = document.createElement("dialog");
          modal.textContent = `${name} (${mark}) WINS!`;
          modal.classList.add("modal");
          modal.setAttribute("closedby", "any");
          document.body.append(modal);
          modal.showModal();

          let activePlayer = myGame.getActivePlayer();
          let currentScore = activePlayer.score;
          currentScore++;
          activePlayer.score = currentScore;
          resetBoard();
          startGame();
        }

        else if (winCheck === "tie") {
          const modal = document.createElement("dialog");
          modal.textContent = `TIE!`;
          modal.classList.add("modal");
          modal.setAttribute("closedby", "any");
          document.body.append(modal);
          modal.showModal();
          resetBoard();
          startGame();
        }
        else {
          cell.disabled = true;
        }
        declareTurn();
      })

    }
  }

  function declareTurn() {
    const turn = document.querySelector(".declare-turn");
    turn.textContent = `${myGame.getActivePlayer().name}'s turn ( ${myGame.getActivePlayer().mark} )`
  }
  inputBoard();
})();