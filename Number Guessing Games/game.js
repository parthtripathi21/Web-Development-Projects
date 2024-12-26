// game.js
let targetNumber;
let attempts;
let guessedNumbers;
let timerValue;
let currentTimer;  // Timer reference to clear it

// Function to start a new game with dynamic difficulty
function startNewGame(difficulty) {
    if (difficulty === 'easy') {
        targetNumber = Math.floor(Math.random() * 50) + 1;
        attempts = 10;
    } else if (difficulty === 'medium') {
        targetNumber = Math.floor(Math.random() * 100) + 1;
        attempts = 7;
    } else {
        targetNumber = Math.floor(Math.random() * 200) + 1;
        attempts = 5;
    }

    guessedNumbers = [];
    updateMessage("Guess a number between 1 and " + (difficulty === 'easy' ? 50 : difficulty === 'medium' ? 100 : 200));
    updateAttemptsLeft();
    updatePreviousGuesses();
    document.getElementById('submit-guess').disabled = false;
    document.getElementById('restart-game').style.display = 'none';
    document.getElementById('difficulty-selection').style.display = 'none';
    document.getElementById('user-guess').disabled = false;

    startTimer();
}

// Function to start the countdown timer for each guess (10 seconds)
function startTimer() {
    timerValue = 10; // Set 10 seconds for each turn
    document.getElementById('timer').textContent = `Time left: ${timerValue}s`;

    // Clear the previous timer if it's running
    if (currentTimer) {
        clearInterval(currentTimer);
    }

    currentTimer = setInterval(() => {
        if (timerValue <= 0) {
            clearInterval(currentTimer);
            handleTimeout();
        } else {
            timerValue--;
            document.getElementById('timer').textContent = `Time left: ${timerValue}s`;
        }
    }, 1000);
}

// Function to handle the timeout (when player runs out of time)
function handleTimeout() {
    updateMessage("Time's up! You didn't guess in time.");
    attempts--;
    updateAttemptsLeft();
    if (attempts === 0) {
        endGame(false);
    } else {
        startTimer(); // Restart the timer for the next guess
    }
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
        endGame(true); // Correct guess ends the game
    }
}

// Handle guess submission
function handleGuess() {
    let userGuess = parseInt(document.getElementById('user-guess').value);

    if (isNaN(userGuess) || userGuess < 1 || userGuess > (targetNumber <= 50 ? 50 : targetNumber <= 100 ? 100 : 200)) {
        updateMessage("Please enter a valid number.");
        return;
    }

    guessedNumbers.push(userGuess);
    compareGuesses(userGuess);

    attempts--;
    updateAttemptsLeft();
    updatePreviousGuesses();

    if (attempts === 0) {
        endGame(false); // End game if out of attempts
    } else {
        startTimer(); // Restart the timer for the next guess
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

    // Stop the timer when the game ends
    if (currentTimer) {
        clearInterval(currentTimer);  // Clear the timer immediately after game ends
    }
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
document.getElementById('restart-game').addEventListener('click', function() {
    const difficulty = document.querySelector('input[name="difficulty"]:checked').value;
    startNewGame(difficulty);
});

// Add event listener for the difficulty selection
document.getElementById('easy').addEventListener('click', function() {
    startNewGame('easy');
});

document.getElementById('medium').addEventListener('click', function() {
    startNewGame('medium');
});

document.getElementById('hard').addEventListener('click', function() {
    startNewGame('hard');
});
