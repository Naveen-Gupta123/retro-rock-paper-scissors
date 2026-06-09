// 1. Set up variables to track the scores
let userScore = 0;
let compScore = 0;

// 2. Tell JavaScript to watch our buttons for clicks
document.getElementById('rock').addEventListener('click', () => playGame('rock'));
document.getElementById('paper').addEventListener('click', () => playGame('paper'));
document.getElementById('scissors').addEventListener('click', () => playGame('scissors'));

// 3. The main game function
function playGame(playerChoice) {
    // Get the computer's random choice
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * 3); // Picks 0, 1, or 2
    const computerChoice = choices[randomIndex];

    let result = "";

    // Compare choices to see who won
    if (playerChoice === computerChoice) {
        result = "IT'S A TIE! 🤝";
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        result = "YOU WIN! 🎉";
        userScore++; // Increase player score by 1
    } else {
        result = "COMPUTER WINS! 🤖";
        compScore++; // Increase computer score by 1
    }

    // 4. Update the text on the HTML screen
    document.getElementById('gameResult').innerHTML = 
        `You chose <b>${playerChoice.toUpperCase()}</b>. <br> 
         Computer chose <b>${computerChoice.toUpperCase()}</b>. <br><br> 
         ${result}`;

    document.getElementById('playerScore').innerText = userScore;
    document.getElementById('computerScore').innerText = compScore;
}