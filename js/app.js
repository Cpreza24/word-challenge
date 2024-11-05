import { levelOneQuestions, levelTwoQuestions } from './questions.js';
console.log(levelTwoQuestions);

const gameArea = document.querySelector('.game-area'); 
const playGameButton = document.getElementById('play-button');
const wordDescription = document.querySelector('.description');
const levelCounter = document.querySelector('.level-counter');
const triesCounter = document.querySelector('.tries-counter');
const playerInput = document.querySelector('.player-input');
const submitBtn = document.querySelector('#submit-button');
const randomNum = Math.floor(Math.random() * 4) + 1;

let playerLevel;
let playerTries = 5;
let playerAnswer = '';

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
    playerLevel = parseInt(levelCounter.innerText);
    if (playerLevel === 1) {
        //let levelOne = levelOneQuestions.map((ques, index) => {ques[index]}) 
        //console.log(levelOne);
        wordDescription.innerText = levelOneQuestions[randomNum - 1].question;
    } else if (playerLevel === 2) {
        wordDescription.innerText = levelTwoQuestions[randomNum - 1].question
    }
};


function renderGame() {
    levelCounter.innerText = 1;
    triesCounter.innerText = 5;
    //hides the game board and shows only the play button
}

const handlePlayerInput = e => {
    playerAnswer = e.target.value;
    console.log(playerAnswer);
    //playerInput.value = ''
    return playerAnswer;
}

//check to see if the string in the input mathches the object answer
//conditional to see if the string value of playerAnswer is equal to the question thats displayed answer

//When the player submits the correct answer, the level increases and the level two questions are displayed. 
function handleSubmit() {
    console.log(playerAnswer, playerInput.value);
    let lowerCaseAnswer = playerAnswer.toLowerCase();
    if (lowerCaseAnswer === levelOneQuestions[randomNum - 1].answer && playerInput.value !== '') {
        playerInput.value = '';
        playerAnswer = '';
        console.log(playerInput.value);
        playerLevel += 1;
        levelCounter.innerText = playerLevel;
        showQuestion();
        console.log(playerLevel, 'correct!');
    } else if (lowerCaseAnswer !== levelOneQuestions[randomNum - 1].answer || playerInput.value === '') {
        playerInput.value = '';
        playerAnswer = '';
        playerTries -= 1;
        triesCounter.innerText = playerTries;
        console.log('try again')
    }
}

function handleLoss() {
    //if tries reaches 0 the game is over
    //shows the user a game over message and what level they reached in the game.
    //also shoes a Play Again? button that will start the game from the beginning.
    //hides the game board  
}

//Starts the game
// function handleStartClick(e) {
//     let button = e.target;
//     if (button) {
//         gameArea.classList.remove('hidden');
//         playGameButton.classList.add('hidden');
//         init();
//     }
// }

// the user clicks the play button and the class of hidden is added and the game starts. 
//
//playGameButton.addEventListener('click', handleStartClick);

// user types an answer and logs the value to the console.
//user clicks the submit button and checks so see if the answer belongs to that object
playerInput.addEventListener('keyup', handlePlayerInput);
submitBtn.addEventListener('click', handleSubmit);
