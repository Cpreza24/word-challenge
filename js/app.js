import { questionsObj } from './questions.js';
//console.log(levelTwoQuestions);

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
let playerLevelToNum;
let playerTries = 5;
let playerAnswer = '';

// shows the user a play button when the game is loaded and clears any previous inputs and levels
// restarts the game starting from level 1 and tries resets. 
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
    console.log('game start');
    playerInput.focus();
    renderGame();
    displayQuestion();
}

//init();

function renderGame() {
    levelCounter.innerText = 1;
    triesCounter.innerText = 5;
    //hides the game board and shows only the play button
}

// function showQuestion() {
//     playerLevel = parseInt(levelCounter.innerText);
//     if (playerLevel === 1) {
//         //let levelOne = levelOneQuestions.map((ques, index) => {ques[index]}) 
//         //console.log(levelOne);
//         wordDescription.innerText = levelOneQuestions[randomNum - 1].question;
//     } else if (playerLevel === 2) {
//         //wordDescription.innerText = levelTwoQuestions[randomNum - 1].question
//     }
// };

// function showQuestion() {
//     playerLevelToNum = parseInt(levelCounter.innerText);
//     questionsObj.forEach((ques) => {
//     //levelOneArr = [];
//         //console.log(question);
//         if (playerLevelToNum === 1) {
//             if (ques.level === 1) {
//                 levelOneArr.push(ques);
//                 wordDescription.innerText = levelOneArr;
//                 console.log(levelOneArr);
//             };
//         } else if (playerLevelToNum === 2) {
//             if (question.level === 2) {
//                 console.log(question);
//             }
//         }
//     })
// }

// const getRandomNum = function() {
//     return Math.floor(Math.random() * 3);
// }

function displayQuestion() {
    playerLevelToNum = parseInt(levelCounter.innerText);
    //console.log(playerLevelToNum)
    if (playerLevelToNum === 1) {
      //push the objects with a level of 1 into the levelsQuestions array
        for (const ques of questionsObj) {
            if (ques.level === 1) {
            levelOneArr.push(ques);
        }
        //console.log(levelQuestions.length);
        }
        wordDescription.innerText = levelOneArr[randomNum].question
        //console.log(levelOneArr[randomNum].answer);
    } else if (playerLevelToNum === 2) {
      //levelOneArr = [];
        for (const ques of questionsObj) {
        //levelsQuestions = [];
        if (ques.level === 2) {
            levelTwoArr.push(ques) 
        }
        }
        wordDescription.innerText = levelTwoArr[randomNum].question
        //console.log(wordDescription.innerText, levelTwoArr);
    } else if (playerLevelToNum === 3) {
        for (const ques of questionsObj) {
        //levelsQuestions = [];
        if (ques.level === 3) {
            levelThreeArr.push(ques) 
        }
        }
        wordDescription.innerText = levelThreeArr[randomNum].question
        //console.log(wordDescription.innerText, levelThreeArr);
    } else if (playerLevelToNum === 4) {
        for (const ques of questionsObj) {
        //levelsQuestions = [];
        if (ques.level === 4) {
            levelFourArr.push(ques) 
        }
        }
        wordDescription.innerText = levelFourArr[randomNum].question
        //console.log(wordDescription.innerText, levelThreeArr);
    } else if (playerLevelToNum === 5) {
        for (const ques of questionsObj) {
        //levelsQuestions = [];
        if (ques.level === 5) {
            levelFiveArr.push(ques) 
        }
        }
        wordDescription.innerText = levelFiveArr[randomNum].question
        console.log(wordDescription.innerText, levelFiveArr);
    }
};

const handlePlayerInput = e => {
    playerAnswer = e.target.value;
    //console.log(playerAnswer);
    //playerInput.value = ''
    return playerAnswer;
}

//check to see if the string in the input mathches the object answer
//conditional to see if the string value of playerAnswer is equal to the question thats displayed answer

//When the player submits the correct answer, the level increases and the level two questions are displayed. 
// function handleSubmit() {
//     console.log(playerAnswer, playerInput.value);
//     let lowerCaseAnswer = playerAnswer.toLowerCase();
//     if (lowerCaseAnswer === levelOneQuestions[randomNum - 1].answer && playerInput.value !== '') {
//         playerInput.value = '';
//         playerAnswer = '';
//         console.log(playerInput.value);
//         playerLevelToNum += 1;
//         levelCounter.innerText = playerLevelToNum;
//         showQuestion();
//         console.log(playerLevelToNum, 'correct!');
//     } else if (lowerCaseAnswer !== levelOneQuestions[randomNum - 1].answer || playerInput.value === '') {
//         playerInput.value = '';
//         playerAnswer = '';
//         playerTries -= 1;
//         playerLevel.innerText = playerTries;
//         console.log('try again')
//     }
// }

function handleSubmit() {
    handlePlayerAnswer();
    playerLoss();
    playerWin();
    rightOrWongAnswerMsg();
}

function rightOrWongAnswerMsg() {
    const answerMsg = document.createElement('p');
    answerMsg.setAttribute('id', 'answer-msg');
    if (correctAnswer) {
        answerMsg.innerText = 'Correct!';
        descriptionContainer.appendChild(answerMsg);
    } else {
        answerMsg.innerText = 'Incorrect, try again.';
        descriptionContainer.appendChild(answerMsg);
    };

    setTimeout(() => {
        answerMsg.remove();
    }, 1500);
}

function handlePlayerAnswer() {
    let lowerCaseAnswer = playerAnswer.toLowerCase();
    //handleCorrectAnswer();
    // filter the questionsObj to include only the level 1 questions. 
    // display the level 1 object. 
    const filteredQuestions = questionsObj.filter(q => q.level === playerLevelToNum);
    console.log(`answer: ${filteredQuestions[randomNum].answer}`);
    //compate the displayed question to the answer of that object.
    if (lowerCaseAnswer === filteredQuestions[randomNum].answer) {
        playerLevelToNum += 1;
        levelCounter.innerText = playerLevelToNum;
        playerInput.value = '';
        playerAnswer = '';
        correctAnswer = true;
        displayQuestion();
        console.log(correctAnswer);
    } else if (lowerCaseAnswer !== filteredQuestions[randomNum].answer && playerAnswer !== ''){
        correctAnswer = false;
        playerTries -= 1;
        triesCounter.innerText = playerTries;
        playerInput.value = '';
        playerAnswer = '';
        console.log(correctAnswer);
    } else if (playerAnswer === '') {
        console.log('please enter an answer')
    }
    playerInput.focus();
}

function handleWinOrLose() {
    restartBtn.setAttribute('id', 'restart-button');
    restartBtn.innerText = 'Retry'
    gameOverMsg.setAttribute('id', 'game-over-message');
    gameOverMsg.innerText = `GameOver! You made it to level ${playerLevelToNum} out of 5`;
    gameOverContainer.setAttribute('id', 'game-over-container');
    gameOverContainer.classList.remove('hidden');
    body.appendChild(gameOverContainer);
    gameArea.classList.add('hidden');
    gameOverContainer.appendChild(gameOverMsg);
    gameOverContainer.appendChild(restartBtn);
    console.log('Game Over!', gameOverMsg);
    restartBtn.addEventListener('click', init);

    if (playerTries === 0) {
        gameOverMsg.innerText = `GameOver! You made it to level ${playerLevelToNum} out of 5`;
        restartBtn.innerText = 'Retry';
        randomNum;
        //getRandomNum();
    } else if (levelCounter.innerText > 5) {
        gameOverMsg.innerText = `You won with ${playerTries} trie(s) remaining!`;
        restartBtn.innerText = 'Play Again';
        randomNum;
        //getRandomNum();
    }
}

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
        //rules.classList.add('hidden');
        init();
    }
}

//user clicks restart button
//Message displays in the nav "Are you sure?"
//two buttons display, one yes one no
//yes button starts the game over calling init
//no button removes the two buttons from the dom returns out of the function
function handleRestartGame() {
    restartGameBtn.classList.add('hidden');
    const verifyRestartBtn = document.createElement('button');
    const cancelRestartBtn = document.createElement('button');
    const restartGameContainer = document.createElement('div');
    restartGameContainer.setAttribute('class', 'restart-game-container');
    cancelRestartBtn.setAttribute('class', 'cancel-restart-btn');
    verifyRestartBtn.setAttribute('class', 'verify-restart-btn');
    gameOverMsg.innerText = 'Are you sure?'
    verifyRestartBtn.innerText = 'Yes';
    cancelRestartBtn.innerText = 'No'
    navBar.appendChild(restartGameContainer);
    restartGameContainer.appendChild(gameOverMsg);
    restartGameContainer.appendChild(verifyRestartBtn);
    restartGameContainer.appendChild(cancelRestartBtn);

    verifyRestartBtn.addEventListener('click', e => {
        const yesBtn = e.target;
        if (yesBtn) {
            restartGameContainer.remove();
            restartGameBtn.classList.remove('hidden');
            init();
        }
    });

    cancelRestartBtn.addEventListener('click', e => {
        const noBtn = e.target;
        if(noBtn) {
            restartGameContainer.remove();
            restartGameBtn.classList.remove('hidden');
        }
    });

}



// user types an answer and logs the value to the console.``
//user clicks the submit button and checks so see if the answer belongs to that object
playGameButton.addEventListener('click', handleStartClick);
restartGameBtn.addEventListener('click', handleRestartGame);
playerInput.addEventListener('keyup', handlePlayerInput);
submitBtn.addEventListener('click', handleSubmit);
submitForm.addEventListener('submit', e => {
    e.preventDefault();
});
