document.getElementById("submit").addEventListener("click", function () {
    let player1 = document.getElementById("player-1").value.trim();
    let player2 = document.getElementById("player-2").value.trim();

    if (player1 === "" || player2 === "") {
        alert("Please enter names for both players.");
        return;
    }

    document.getElementById("player-inputs").classList.add("hidden");
    document.getElementById("game-board").classList.remove("hidden");

    startGame(player1, player2);
});

function startGame(player1, player2) {
    let board = document.querySelectorAll(".cell");
    let message = document.querySelector(".message");
    let currentPlayer = player1;
    let currentSymbol = "X";
    let gameActive = true;
    let boardState = ["", "", "", "", "", "", "", "", ""];

    message.textContent = `${currentPlayer}, you're up!`;

    board.forEach(cell => {
        cell.textContent = "";
        cell.addEventListener("click", function () {
            if (!gameActive || cell.textContent !== "") return;

            let cellIndex = parseInt(cell.id) - 1;
            boardState[cellIndex] = currentSymbol;
            cell.textContent = currentSymbol;

            if (checkWinner(boardState)) {
                message.textContent = `${currentPlayer} congratulations, you won!`;
                gameActive = false;
                return;
            }

            if (!boardState.includes("")) {
                message.textContent = "It's a draw!";
                gameActive = false;
                return;
            }

            currentPlayer = currentPlayer === player1 ? player2 : player1;
            currentSymbol = currentSymbol === "X" ? "O" : "X";
            message.textContent = `${currentPlayer}, you're up!`;
        });
    });
}

function checkWinner(board) {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    return winningCombos.some(combo => {
        let [a, b, c] = combo;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}
