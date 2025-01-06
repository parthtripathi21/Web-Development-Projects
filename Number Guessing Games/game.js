// game.js
let targetNumber;
let attempts;
let guessedNumbers;

function startNewGame() {
    targetNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 5;
    guessedNumbers = [];
    
    document.getElementById('submit-guess').disabled = false;
    document.getElementById('restart-game').style.display = 'none';
    document.getElementById('user-guess').disabled = false;
    updateMessage("Guess a number between 1 and 100");
    updateAttemptsLeft();
    updatePreviousGuesses();
}

// Update the game message
function updateMessage(message) {
    document.getElementById('game-message').textContent = message;
}

// Update remaining attempts
function updateAttemptsLeft() {
    document.getElementById('attempts-left').textContent = `You have ${attempts} chances left.`;
}

// Update previous guesses
function updatePreviousGuesses() {
    document.getElementById('previous-guesses').textContent = `Previous guesses: ${guessedNumbers.join(', ')}`;
}

// Compare guesses
function compareGuesses(userGuess) {
    if (userGuess < targetNumber) {
        updateMessage("The number is more than you guessed.");
    } else if (userGuess > targetNumber) {
        updateMessage("The number is less than you guessed.");
    } else {
        updateMessage(`Correct! The number is ${targetNumber}.`);
        endGame(true);
    }
}

// Handle guess submission
function handleGuess() {
    let userGuess = parseInt(document.getElementById('user-guess').value);

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        updateMessage("Please enter a valid number between 1 and 100.");
        return;
    }

    guessedNumbers.push(userGuess);
    compareGuesses(userGuess);

    attempts--;
    updateAttemptsLeft();
    updatePreviousGuesses();

    if (attempts === 0) {
        endGame(false);
    }

    document.getElementById('user-guess').value = '';
}

// End the game (win or lose)
function endGame(won) {
    let message = won ? `Congratulations! You guessed the number.` : `Game Over! The number was ${targetNumber}.`;
    updateMessage(message);

    // Disable input and the Submit button
    document.getElementById('submit-guess').disabled = true;
    document.getElementById('user-guess').disabled = true;
    
    // Show restart button
    document.getElementById('restart-game').style.display = 'block';
}

// Add event listener for the "Submit Guess" button
document.getElementById('submit-guess').addEventListener('click', handleGuess);

// Add event listener for the Enter key press
document.getElementById('user-guess').addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        handleGuess();
    }
});

// Add event listener for the "Restart Game" button
document.getElementById('restart-game').addEventListener('click', startNewGame);

// Start the first game when the page loads
startNewGame();
