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
