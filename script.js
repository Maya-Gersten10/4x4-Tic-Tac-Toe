document.addEventListener("DOMContentLoaded", function() {
    const playerButtons = document.querySelectorAll("#player-selection button");
    const gameContainer = document.getElementById("game");
    const messageDisplay = document.getElementById("message");
    const resetButton = document.getElementById("reset");
    let currentPlayer = "";
    let cells = [];

    function initializeGame() {
        cells = document.querySelectorAll(".cell");
        currentPlayer = "";
        cells.forEach(cell => {
            cell.innerText = "";
            cell.addEventListener("click", cellClickHandler);
        });
        gameContainer.style.display = "none";
        playerButtons.forEach(button => button.style.display = "block");
        resetButton.style.display = "none";
    }

    function checkWin() {
        // Implement win condition logic
    }

    function checkTie() {
        // Implement tie condition logic
    }

    function handleCellClick(index) {
        if (cells[index].innerText === "" && currentPlayer !== "") {
            cells[index].innerText = currentPlayer;
            if (checkWin()) {
                messageDisplay.innerText = `Player ${currentPlayer} wins!`;
                disableCells();
            } else if (checkTie()) {
                messageDisplay.innerText = "It's a tie!";
            } else {
                currentPlayer = currentPlayer === "🐍" ? "🦁" : currentPlayer === "🦁" ? "🦡" : "🐦‍⬛";
                messageDisplay.innerText = `Player ${currentPlayer}'s turn`;
            }
        }
    }

    function resetGame() {
        initializeGame();
        messageDisplay.innerText = `Player ${currentPlayer}'s turn`;
    }

    function disableCells() {
        cells.forEach(cell => cell.removeEventListener("click", cellClickHandler));
    }

    function selectPlayer(event) {
        currentPlayer = event.target.innerText; // Use the button's text as the player symbol
        gameContainer.style.display = "block";
        messageDisplay.innerText = `Player ${currentPlayer}'s turn`;
        playerButtons.forEach(button => button.style.display = "none");
        resetButton.style.display = "block";
    }

    playerButtons.forEach(button => button.addEventListener("click", selectPlayer));

    resetButton.addEventListener("click", resetGame);

    initializeGame();
});
