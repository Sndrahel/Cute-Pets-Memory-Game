/**
 * Purpose: Remove comments pollution
 * 
 * Attribution -
 *      A - 1: Function taken / adapted from: https://github.com/moirahartigan/Portfolio-2---Alien-Memory-Game/blob/master/assets/js/script.js
 *      A - 2: Function taken from: https://marina-ferreira.github.io/tutorials/js/memory-game/
 *      A - 3: Function taken / adapted from: https://github.com/sandraisrael/Memory-Game-fend/blob/master/js/app.js
 */

// Variable Declaration
    const cards = document.querySelectorAll('.card');
    const movesCounter = document.querySelector('.moves-counter');
    const instructions = document.getElementById('instructions');
    const timeContainer = document.querySelector('.timer');
    const MAX_MATCH = 8;
    const winModal = document.getElementById('win-modal');
    const closeIcon = document.querySelector(".close-win-modal");

// Play buttons
    const modalBtn = document.getElementById('modal-btn');
    const playBtn = document.getElementById('play-btn');
    const playAgainBtn = document.getElementById('play-again-btn'); 

// Audio buttons 
    const muteBtn = document.getElementById('mute-btn');
    const audioControl = document.getElementById('audio-control');

// Sound effects 
    const noMatchSound = document.getElementById('noMatchSound');
    const matchSound = document.getElementById('matchSound');
    const winSound = document.getElementById('winSound');
    const flipSound = document.getElementById('flipSound');
    const shuffleSound = document.getElementById('shuffleSound');
    const cardSounds = ["noMatchSound", "matchSound", "winSound", "flipSound"];
    
    let gameOn = false;
    let perfectMatch = 0;
    let flippedCard = false; //Checks if card has been clicked
    let lockBoard = false; // Keep the board locked until first pair of cards are flipped back - if no match
    let firstCard, secondCard; // Checks if cards match
    let moves = 0;
    let totalTime = "";
    let soundOn = true;  

// Timer
    let time;
    let minutes = 0;
    let seconds = 0;
    let timeStart = false;
    

function init() {
// Events
cards.forEach(card => card.addEventListener('click', flipCard));
shuffle();

// Moves Counter and Timer. ( A - 1 ) 
moves = 0;
movesCounter.innerHTML = 0;


// Game Buttons. 
modalBtn.addEventListener('click', () => { 
    toggleInstructions('block');
}); // listen for open click of how to play instructions modal
playBtn.addEventListener('click', () => { 
    toggleInstructions('none');
}); // listen for click to close how to play instructions modal


timeContainer.innerHTML = `${minutes} Min ${seconds} Sec`;

}

init();


// Instruction Pop Up. ( A - 1 )
function toggleInstructions(withValue) {
    instructions.style.display = withValue;
}


// Click and Flip function for cards. ( A - 2 )
function flipCard() {
    if (!gameOn) {
        gameOn = true;
        timer();
    } 

    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');
    flipSound.play();

        
    if(!flippedCard) {  // First card clicked

        flippedCard = true;
        firstCard = this; // Stores this as the first card

        return;
    }
        
        secondCard = this; // Second card clicked

        checkIfCardMatch();
}


// Checks if cards match. ( A - 1 )
function checkIfCardMatch() { 

    let isMatch = firstCard.dataset.flipper === secondCard.dataset.flipper;
        if (isMatch) perfectMatch += 1;

        if (isMatch) disableCard();
        else noMatch();

        if (perfectMatch === MAX_MATCH) winGame();
}


// Cards will be disabled for clicks once they are matched. ( A - 2 ) 
function disableCard() {  

    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    matchSound.play();

    resetBoard();  
}


// Keeps board locked and flips card back if no match. ( A - 1 / A -2 )
function noMatch() {
    lockBoard = true;

    setTimeout(() => { 
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        noMatchSound.play();

        resetBoard();
      }, 1000); // Used to keep the cards visible for a short time

      addMove();
}

// Adds moves to the counter ( A - 2)
function addMove() {
    moves++;
    movesCounter.innerHTML = moves;
}


// Timer function is called the first time the firstCard is clicked. ( A - 2 / A - 3 )
function timer() {
        time = setInterval(function() {
            seconds++;
            if (seconds === 60) {
                minutes++;
                seconds = 0;
            }
            timeContainer.innerHTML = `${minutes} Min ${seconds} Sec`;
        }, 1000);
}

// ( A - 2 )
function finishTime() {
    clearInterval(time);
} 


// Cards are reset after each round. ( A - 2 )
function resetBoard() {

    [flippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}


// Submits functions when game is won. ( A - 1 )
function winGame() {
    finishTime();
    winMessage();
}

// Pops Up when game is won. ( A - 3 )
function winMessage() {
    winModal.style.display = "block";
    totalTime = timeContainer.innerHTML;
    document.getElementById("final-move").innerHTML = moves;
    document.getElementById("total-time").innerHTML = totalTime;
    winSound.play();

    closeModal(); 
} 

// ( A - 3 )
function closeModal() {
    closeIcon.addEventListener('click', function() {
        winModal.style.display = "none";

       resetGame();
    });
}

// ( A - 3 )
function playAgain() {
    winModal.style.display = "none";
    resetGame();
}       


// Cards are reset after each round. ( A - 2 )
function shuffle() {
    cards.forEach(card => {
      let randomPos = Math.floor(Math.random() * 16);
      card.style.order = randomPos;
    });
}


// Resets game and starts a new game ( A - 1 )
function resetGame() {
    setTimeout(() => {
        finishTime();
        gameOn = false;
        timeStart = false;
        seconds = 0;
        minutes = 0;
        timeContainer.innerHTML = `${minutes} Min ${seconds} Sec`;
        moves = 0;
        movesCounter.innerHTML = 0;
        flippedCard = false;
        [firstCard, secondCard] = [null, null]; 
        cards.forEach(cardReset => cardReset.classList.remove('flip'));
        shuffle();
        shuffleSound.play();
        cards.forEach(card => card.addEventListener('click', flipCard));
        perfectMatch = 0;
        soundOn = true; //Ny
    }, 700);
}



