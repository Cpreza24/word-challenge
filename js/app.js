import { questionsObj } from './questions.js';

const body = document.querySelector('body');
const navBar = document.querySelector('nav');
const header = document.querySelector('header');
const gameArea = document.querySelector('.game-area'); 
const playGameButton = document.getElementById('play-button');
const wordDescription = document.querySelector('.description');
const descriptionContainer = document.querySelector('.word-description-container');
const rules = document.querySelector('#rules-list');
const restartGameBtn = document.querySelector('.restart-game-btn')
const levelCounter = document.querySelector('.level-counter');
const triesCounter = document.querySelector('.tries-counter');
const submitBtn = document.querySelector('#submit-button');
const submitForm = document.getElementById('player-submit-form');
const gameOverContainer = document.createElement('div');
const restartBtn = document.createElement('button');
const gameOverMsg = document.createElement('p');

let playerInput = document.querySelector('.player-input');
let levelOneArr = [];
let levelTwoArr = [];
let levelThreeArr = [];
let levelFourArr = [];
let levelFiveArr = [];

let randomNum;
let correctAnswer = false;
let answeredQuestion;
let playerLevelToNum;
let playerTries = 5;
let playerAnswer = '';

// shows the user a play button when the game is loaded and clears any previous inputs and levels
// restarts the game starting from level 1 and tries resets to 5. 
function init() {
    randomNum = Math.floor(Math.random() * 4);
    playerTries = 5;
    correctAnswer = false;
    playerAnswer = '';
    playerInput.value = '';
    levelOneArr = [];
    levelTwoArr = [];
    levelThreeArr = [];
    levelFourArr = [];
    levelFiveArr = [];
    header.classList.remove('hidden');
    gameArea.classList.remove('hidden');
    gameOverContainer.remove();
    levelCounter.innerText = 1;
    triesCounter.innerText = playerTries;
    renderGame();
    displayQuestion();
};


function renderGame() {
    levelCounter.innerText = 1;
    triesCounter.innerText = 5;
};

//push the objects with the corresponding level into the levelsQuestions array
function displayQuestion() {
    playerLevelToNum = parseInt(levelCounter.innerText);
    if (playerLevelToNum === 1) {
        for (const ques of questionsObj) {
            if (ques.level === 1) {
            levelOneArr.push(ques);
            };
        };
        wordDescription.innerText = levelOneArr[randomNum].question;
    } else if (playerLevelToNum === 2) {
        for (const ques of questionsObj) {
        if (ques.level === 2) {
            levelTwoArr.push(ques);
            };
        };
        wordDescription.innerText = levelTwoArr[randomNum].question;
    } else if (playerLevelToNum === 3) {
        for (const ques of questionsObj) {
        if (ques.level === 3) {
            levelThreeArr.push(ques); 
            };
        };
        wordDescription.innerText = levelThreeArr[randomNum].question;
    } else if (playerLevelToNum === 4) {
        for (const ques of questionsObj) {
        if (ques.level === 4) {
            levelFourArr.push(ques); 
            };
        };
        wordDescription.innerText = levelFourArr[randomNum].question;
    } else if (playerLevelToNum === 5) {
        for (const ques of questionsObj) {
        if (ques.level === 5) {
            levelFiveArr.push(ques); 
            };
        };
        wordDescription.innerText = levelFiveArr[randomNum].question;
    };
};

const handlePlayerInput = e => {
    playerAnswer = e.target.value;
    return playerAnswer;
};


//handles when the player submits the form
function handleSubmit() {
    handlePlayerAnswer();
    playerLoss();
    playerWin();
    rightOrWongAnswerMsg();
};

function rightOrWongAnswerMsg() {
    const answerMsg = document.createElement('p');

    if (playerInput.innerText === '' && answeredQuestion === false) {
        answerMsg.setAttribute('id', 'empty-answer-msg');
        answerMsg.innerText = 'Enter an answer!';
        descriptionContainer.appendChild(answerMsg);
    };

    if (correctAnswer) {
        answerMsg.setAttribute('id', 'correct-answer-msg');
        answerMsg.innerText = 'Correct!';
        descriptionContainer.appendChild(answerMsg);
        correctAnswer = false;
    } else if (correctAnswer !== true && answeredQuestion === true) {
        answerMsg.setAttribute('id', 'incorrect-answer-msg');
        answerMsg.innerText = `Incorrect. ${playerTries} trie(s) left`;
        descriptionContainer.appendChild(answerMsg);
    };

    setTimeout(() => {
        answerMsg.remove();
        answeredQuestion = false;
    }, 2000);
};

function disableSubmit() {
    setTimeout(() => {
        submitBtn.disabled = true;
    });
    setTimeout(() => {
        submitBtn.disabled = false;
    }, 2000);
};

function handlePlayerAnswer() {
    let lowerCaseAnswer = playerAnswer.toLowerCase();
    const filteredQuestions = questionsObj.filter(q => q.level === playerLevelToNum);
    if (lowerCaseAnswer === filteredQuestions[randomNum].answer) {
        playerLevelToNum += 1;
        levelCounter.innerText = playerLevelToNum;
        playerInput.value = '';
        playerAnswer = '';
        correctAnswer = true;
        answeredQuestion = true;
        disableSubmit();
        displayQuestion();
    } else if (lowerCaseAnswer !== filteredQuestions[randomNum].answer && playerAnswer !== ''){
        correctAnswer = false;
        answeredQuestion = true;
        playerTries -= 1;
        triesCounter.innerText = playerTries;
        playerInput.value = '';
        playerAnswer = '';
        disableSubmit();
    } else if (playerAnswer === '') {
        answeredQuestion = false;
        disableSubmit();
    }
};

function handleWinOrLose() {
    restartBtn.setAttribute('id', 'restart-button');
    restartBtn.innerText = 'Retry'
    gameOverMsg.innerText = `GameOver! You made it to level ${playerLevelToNum} out of 5`;
    gameOverContainer.setAttribute('id', 'game-over-container');
    gameOverContainer.classList.remove('hidden');
    body.appendChild(gameOverContainer);
    gameArea.classList.add('hidden');
    gameOverContainer.appendChild(gameOverMsg);
    gameOverContainer.appendChild(restartBtn);
    restartBtn.addEventListener('click', init);
    
    if (playerTries === 0) {
        gameOverMsg.setAttribute('id', 'player-lost-message');
        gameOverMsg.innerText = `GameOver! You made it to level ${playerLevelToNum} out of 5`;
        restartBtn.innerText = 'Retry';
        randomNum;
    } else if (levelCounter.innerText > 5) {
        gameOverMsg.setAttribute('id', 'player-won-message');
        gameOverMsg.innerText = `You won with ${playerTries} trie(s) remaining!`;
        restartBtn.innerText = 'Play Again';
        randomNum;
    };
};

function playerLoss() {
    if (playerTries > 0) {
        return;
    } else if (playerTries === 0) {
        handleWinOrLose();
    };
};

function playerWin() {
    if (levelCounter.innerText > 5) {
        handleWinOrLose();
    };
};

//Starts the game
function handleStartClick(e) {
    let startBtn = e.target;
    if (startBtn) {
        gameArea.classList.remove('hidden');
        header.classList.remove('hidden');
        playGameButton.classList.add('hidden');
        restartGameBtn.classList.remove('hidden');
        init();
    };
};

function handleRestartGame() {
    restartGameBtn.classList.add('hidden');
    const verifyRestartBtn = document.createElement('button');
    const cancelRestartBtn = document.createElement('button');
    const restartGameContainer = document.createElement('div');
    const restartGameMsg = document.createElement('p');
    restartGameContainer.setAttribute('class', 'restart-game-container');
    cancelRestartBtn.setAttribute('class', 'cancel-restart-btn');
    verifyRestartBtn.setAttribute('class', 'verify-restart-btn');
    restartGameMsg.setAttribute('id', 'restart-question');
    restartGameMsg.innerText = 'Are you sure?';
    verifyRestartBtn.innerText = 'Yes';
    cancelRestartBtn.innerText = 'No';
    navBar.appendChild(restartGameContainer);
    restartGameContainer.appendChild(restartGameMsg);
    restartGameContainer.appendChild(verifyRestartBtn);
    restartGameContainer.appendChild(cancelRestartBtn);

    verifyRestartBtn.addEventListener('click', e => {
        const yesBtn = e.target;
        if (yesBtn) {
            restartGameContainer.remove();
            restartGameBtn.classList.remove('hidden');
            init();
        };
    });

    cancelRestartBtn.addEventListener('click', e => {
        const noBtn = e.target;
        if(noBtn) {
            restartGameContainer.remove();
            restartGameBtn.classList.remove('hidden');
        };
    });
};

playGameButton.addEventListener('click', handleStartClick);
restartGameBtn.addEventListener('click', handleRestartGame);
playerInput.addEventListener('keyup', handlePlayerInput);
submitBtn.addEventListener('click', handleSubmit);
submitForm.addEventListener('submit', e => {
    e.preventDefault();
});
