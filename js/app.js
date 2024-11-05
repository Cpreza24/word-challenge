import { levelOneQuestions } from './questions.js';
//console.log(questions);

const gameArea = document.querySelector('.game-area'); 
const playGameButton = document.getElementById('play-button');
const wordDescription = document.querySelector('.description');
//wordDescription.innerHTML = questions[0].question;
const levelCounter = document.querySelector('.level-counter');
const playerInput = document.querySelector('.player-input');
const triesCounter = document.querySelector('.tries-counter');
const randomNum = Math.floor(Math.random() * 3) + 1;

// shows the user a play button when the game is loaded and clears any previous inputs and levels
// restarts the game starting from level 1 and tries resets. 
function init() {
    console.log('game start');
    playerInput.focus();
    renderGame()
    showQuestion();

}

init();

function showQuestion() {
    const playerLevel = parseInt(levelCounter.innerText);
    if (playerLevel === 1) {
        //console.log(questions[playerLevel - 1].question);
        wordDescription.innerText = levelOneQuestions[randomNum - 1].question;
    };
};


function renderGame() {
    levelCounter.innerText = 1;
    triesCounter.innerText = 5;

    //hides the game board and shows only the play button
}

function handlePlayerInput(e) {
    let playerAnswer = e.target.value;
    console.log(playerAnswer);
}

//Starts the game
// function handleStartClick(e) {
//     let button = e.target;
//     if (button) {
//         gameArea.classList.remove('hidden');
//         playGameButton.classList.add('hidden');
//     }
// }

// the user clicks the play button and the class of hidden is added and the game starts. 
//playGameButton.addEventListener('click', handleStartClick);

// user types an answer and logs the value to the console.
//user clicks the submit button and checks so see if the answer belongs to that object
playerInput.addEventListener('keyup', handlePlayerInput);
