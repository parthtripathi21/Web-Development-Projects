const grid = document.getElementById("grid");
const statusDiv = document.getElementById("status");
const cells = document.querySelectorAll(".cell");

let currentPlayer = "X";
let board = Array(9).fill(null);

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function checkWinner() {
    for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return board.includes(null) ? null : "Tie";
}

function endGame(winner) {
    if (winner === "Tie") {
        document.body.style.backgroundColor = "#fdd835";
    } else {
        document.body.style.backgroundColor = "#4caf50";
    }
    grid.style.pointerEvents = "none";
}

function handleClick(event) {
    const cell = event.target;
    const index = cell.dataset.index;

    if (!board[index]) {
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add("taken");

        const winner = checkWinner();
        if (winner) {
            statusDiv.textContent = winner === "Tie" ? "It's a Tie!" : `Player ${winner} Wins!`;
            endGame(winner);
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            statusDiv.textContent = `Player ${currentPlayer}'s Turn`;
        }
    }
}

cells.forEach((cell) => {
    cell.addEventListener("click", handleClick);
});
