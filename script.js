document.addEventListener("DOMContentLoaded", function () {
    const playerButtons = document.querySelectorAll(".player");
    const gameContainer = document.getElementById("game");
    const messageDisplay = document.getElementById("message");
    const resetButton = document.getElementById("reset");
    let currentPlayerEmoji = "";
    let currentPlayerHouse = "";
    let computerEmoji = "";
    let computerHouse = "";
    let cells = [];
    let playerTurn = true;

    const emojiToHouse = {
        "🐍": "Slytherin",
        "🦁": "Gryffindor",
        "🦡": "Hufflepuff",
        "🐦‍⬛": "Ravenclaw"
    };

    function initializeGame() {
        cells = document.querySelectorAll(".cell");
        currentPlayerEmoji = "";
        currentPlayerHouse = "";
        computerEmoji = "";
        cells.forEach(cell => {
            cell.innerText = "";
            cell.addEventListener("click", handleCellClick);
        });
        gameContainer.style.display = "none";
        playerButtons.forEach(button => button.style.display = "block");
        resetButton.style.display = "none";
        playerTurn = true;
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

    function resetGame() {
        initializeGame();
        messageDisplay.innerText = `Select your house to start`;
    }

    function disableCells() {
        cells.forEach(cell => cell.removeEventListener("click", handleCellClick));
    }

    function selectPlayer(event) {
        currentPlayerEmoji = event.target.innerText;
        currentPlayerHouse = emojiToHouse[currentPlayerEmoji];
        gameContainer.style.display = "block";
        updateTurnMessage();
        playerButtons.forEach(button => button.style.display = "none");
        resetButton.style.display = "block";
        const emojis = Array.from(playerButtons).map(button => button.innerText);
        emojis.splice(emojis.indexOf(currentPlayerEmoji), 1);
        computerEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        computerHouse = emojiToHouse[computerEmoji]; // Set computer's house here
    }

    function updateTurnMessage() {
        if (playerTurn) {
            messageDisplay.innerText = `${currentPlayerHouse}'s turn`;
        } else {
            messageDisplay.innerText = `${computerHouse}'s turn`;
            setTimeout(computerMove, 500);
        }
    }

    function handleCellClick(event) {
        if (!playerTurn) return;
        const clickedCell = event.target;
        if (clickedCell.innerText === "" && currentPlayerEmoji !== "") {
            clickedCell.innerText = currentPlayerEmoji;
            if (checkWin()) {
                messageDisplay.innerText = `${currentPlayerHouse} wins!`;
                disableCells();
            } else if (checkTie()) {
                messageDisplay.innerText = "It's a tie!";
            } else {
                playerTurn = false;
                updateTurnMessage();
            }
        }
    }

    function computerMove() {
        let emptyCells = Array.from(cells).filter(cell => cell.innerText === "");
        if (emptyCells.length > 0) {
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            const selectedCell = emptyCells[randomIndex];
            selectedCell.innerText = computerEmoji;
            if (checkWin()) {
                messageDisplay.innerText = "Computer wins!";
                disableCells();
            } else if (checkTie()) {
                messageDisplay.innerText = "It's a tie!";
            } else {
                playerTurn = true;
                updateTurnMessage();
            }
        }
    }

    messageDisplay.innerText = "Select your house to start";

    playerButtons.forEach(button => button.addEventListener("click", selectPlayer));

    resetButton.addEventListener("click", resetGame);

    initializeGame();
});
