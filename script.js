// 1. Set up variables to track the scores and streaks
let userScore = parseInt(localStorage.getItem('userScore')) || 0;
let compScore = parseInt(localStorage.getItem('compScore')) || 0;
let winStreak = parseInt(localStorage.getItem('winStreak')) || 0;

// Update UI with cached scores on load
document.getElementById('playerScore').innerText = userScore;
document.getElementById('computerScore').innerText = compScore;
document.getElementById('winStreak').innerText = winStreak;

// 2. Event Listeners
document.getElementById('rock').addEventListener('click', () => playGame('rock'));
document.getElementById('paper').addEventListener('click', () => playGame('paper'));
document.getElementById('scissors').addEventListener('click', () => playGame('scissors'));
document.getElementById('resetBtn').addEventListener('click', resetGame);

// 3. The main game function
function playGame(playerChoice) {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * 3);
    const computerChoice = choices[randomIndex];

    let result = "";
    let status = ""; // win, lose, or tie

    const resultBox = document.getElementById('gameResult');
    // Clear previous animation classes
    resultBox.classList.remove('win-animate', 'lose-animate');

    // Compare choices
    if (playerChoice === computerChoice) {
        result = "IT'S A TIE! 🤝";
        status = "tie";
        document.getElementById('tieSound').play().catch(()=>{});
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        result = "YOU WIN! 🎉";
        status = "win";
        userScore++;
        winStreak++;
        document.getElementById('winSound').play().catch(()=>{});
        setTimeout(() => resultBox.classList.add('win-animate'), 10);
    } else {
        result = "COMPUTER WINS! 🤖";
        status = "lose";
        compScore++;
        winStreak = 0; // Break the streak
        document.getElementById('loseSound').play().catch(()=>{});
        setTimeout(() => resultBox.classList.add('lose-animate'), 10);
    }

    // Save progress to LocalStorage
    localStorage.setItem('userScore', userScore);
    localStorage.setItem('compScore', compScore);
    localStorage.setItem('winStreak', winStreak);

    // Update screen text
    resultBox.innerHTML = 
        `You chose <b>${playerChoice.toUpperCase()}</b>. <br> 
         Computer chose <b>${computerChoice.toUpperCase()}</b>. <br><br> 
         ${result}`;

    document.getElementById('playerScore').innerText = userScore;
    document.getElementById('computerScore').innerText = compScore;
    document.getElementById('winStreak').innerText = winStreak;

    // Add entry to history log
    addHistoryLog(playerChoice, computerChoice, status);
}

// 4. Reset Game Function
function resetGame() {
    userScore = 0;
    compScore = 0;
    winStreak = 0;
    localStorage.clear();
    
    document.getElementById('playerScore').innerText = userScore;
    document.getElementById('computerScore').innerText = compScore;
    document.getElementById('winStreak').innerText = winStreak;
    document.getElementById('gameResult').innerText = "Scores cleared! Start playing.";
    document.getElementById('historyList').innerHTML = "";
}

// 5. Add History Log Function
function addHistoryLog(player, computer, status) {
    const historyList = document.getElementById('historyList');
    const li = document.createElement('li');
    
    let statusText = "Tied";
    if (status === 'win') statusText = "Won";
    if (status === 'lose') statusText = "Lost";

    li.innerHTML = `Player: <b>${player}</b> vs Comp: <b>${computer}</b> — <i>${statusText}</i>`;
    
    // Insert at the top of the history list
    historyList.insertBefore(li, historyList.firstChild);

    // Limit log to last 5 matches
    if (historyList.children.length > 5) {
        historyList.removeChild(historyList.lastChild);
    }
}