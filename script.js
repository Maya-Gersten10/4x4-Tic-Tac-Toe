document.addEventListener("DOMContentLoaded", function() {
    const playerButtons = document.querySelectorAll(".player");
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
            if (cells[a].innerText !== "" && cells[a].innerText === cells[b].innerText && cells[a].innerText === cells[c].innerText && cells[a].innerText === cells[d].innerText) {
                return true;
            }
        }
        return false;
    }

    function checkTie() {
        return Array.from(cells).every(cell => cell.innerText !== "");
    }

    function handleCellClick(event) {
        const clickedCell = event.target;
        const index = Array.from(clickedCell.parentNode.children).indexOf(clickedCell);
        if (cells[index].innerText === "" && currentPlayer !== "") {
            cells[index].innerText = currentPlayer;
            if (checkWin()) {
                messageDisplay.innerText = `Player ${currentPlayer} wins!`;
                disableCells();
            } else if (checkTie()) {
                messageDisplay.innerText = "It's a tie!";
            } else {
                currentPlayer = currentPlayer === "Slytherin" ? "Gryffindor" : currentPlayer === "Gryffindor" ? "Hufflepuff" : "Ravenclaw";
                messageDisplay.innerText = `Player ${currentPlayer}'s turn`;
            }
        }
    }

    function resetGame() {
        initializeGame();
        messageDisplay.innerText = `Player ${currentPlayer}'s turn`;
    }

    function disableCells() {
        cells.forEach(cell => cell.removeEventListener("click", handleCellClick));
    }

    function selectPlayer(event) {
        currentPlayer = event.target.id;
        gameContainer.style.display = "block";
        messageDisplay.innerText = `Player ${currentPlayer}'s turn`;
        playerButtons.forEach(button => button.style.display = "none");
        resetButton.style.display = "block";
    }

    playerButtons.forEach(button => button.addEventListener("click", selectPlayer));

    resetButton.addEventListener("click", resetGame);

    initializeGame();
});
