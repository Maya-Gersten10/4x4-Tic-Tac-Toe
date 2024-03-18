document.addEventListener("DOMContentLoaded", function() {
    const cells = document.querySelectorAll(".cell");
    const currentPlayerDisplay = document.getElementById("current-player");
    const messageDisplay = document.getElementById("message");
    const resetButton = document.getElementById("reset");
  
    let currentPlayer = "🐍";
    let board = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
  
    function checkWin() {
      const winConditions = [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [8, 9, 10, 11],
        [12, 13, 14, 15],
        [0, 4, 8, 12],
        [1, 5, 9, 13],
        [2, 6, 10, 14],
        [3, 7, 11, 15],
        [0, 5, 10, 15],
        [3, 6, 9, 12]
      ];
  
      for (let condition of winConditions) {
        const [a, b, c, d] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c] && board[a] === board[d]) {
          return true;
        }
      }
      return false;
    }
  
    function checkTie() {
      return board.every(cell => cell !== "");
    }
  
    function handleCellClick(index) {
      if (board[index] === "") {
        board[index] = currentPlayer;
        cells[index].innerText = currentPlayer;
        if (checkWin()) {
          messageDisplay.innerText = `Player ${currentPlayer} wins!`;
          disableCells();
        } else if (checkTie()) {
          messageDisplay.innerText = "It's a tie!";
        } else {
          currentPlayer = currentPlayer === "🐍" ? "🦁" : "🐍";
          currentPlayerDisplay.innerText = currentPlayer;
        }
      }
    }
  
    function resetGame() {
      board = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
      currentPlayer = "🐍";
      cells.forEach(cell => {
        cell.innerText = "";
        cell.addEventListener("click", cellClickHandler);
      });
      messageDisplay.innerText = `Player ${currentPlayer}'s turn`;
      currentPlayerDisplay.innerText = currentPlayer;
    }
  
    function disableCells() {
      cells.forEach(cell => cell.removeEventListener("click", cellClickHandler));
    }
  
    function cellClickHandler() {
      const index = parseInt(this.id.split("-")[1]);
      handleCellClick(index);
    }
  
    cells.forEach(cell => cell.addEventListener("click", cellClickHandler));
    resetButton.addEventListener("click", resetGame);
});
