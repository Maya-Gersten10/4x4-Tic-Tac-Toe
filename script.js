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
            cell.addEventListener("click", handleCellClick); 
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
        const index = Array.from(cells).indexOf(clickedCell);
        if (clickedCell.innerText === "" && currentPlayer !== "") {
            clickedCell.innerText = currentPlayer;
            if (checkWin()) {
                messageDisplay.innerText = `Player ${currentPlayer} wins!`;
                disableCells();
            } else if (checkTie()) {
                messageDisplay.innerText = "It's a tie!";
            } else {
                currentPlayer = currentPlayer === "Slytherin" ? "Gryffindor" : currentPlayer === "Gryffindor" ? "Hufflepuff" : currentPlayer === "Hufflepuff" ? "Ravenclaw" : "Computer";
                if (currentPlayer === "Computer") {
                    setTimeout(computerMove, 500); // Delay for the computer's move
                } else {
                    messageDisplay.innerText = `Player ${currentPlayer}'s turn`;
                }
            }
        }
    }
    
    function resetGame() {
        initializeGame();
        if (currentPlayer === "Computer") {
            messageDisplay.innerText = `Computer's turn`;
        } else {
            messageDisplay.innerText = `Player's turn`;
        }
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
        if (currentPlayer === "Computer") {
            setTimeout(computerMove, 500); 
        }
    }

    function computerMove() {
        let emptyCells = Array.from(cells).filter(cell => cell.innerText === "");
        if (emptyCells.length > 0) {
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            const selectedCell = emptyCells[randomIndex];
            const emojis = ["🐍", "🦁", "🦡", "🐦‍⬛"];
            let randomEmoji;
            do {
                randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
            } while (randomEmoji === currentPlayer); 
            selectedCell.innerText = randomEmoji;
            if (checkWin()) {
                messageDisplay.innerText = "Computer wins!";
                disableCells();
            } else if (checkTie()) {
                messageDisplay.innerText = "It's a tie!";
            } else {
                currentPlayer = "Slytherin"; 
                messageDisplay.innerText = `Player ${currentPlayer}'s turn`;
            }
        }
    }

    playerButtons.forEach(button => button.addEventListener("click", selectPlayer));

    resetButton.addEventListener("click", resetGame);

    initializeGame();
});
