    const cards = document.querySelectorAll('.card');
    const movesCounter = document.querySelector('.moves-counter');
    const timeContainer = document.querySelector('.timer');

    let gameOn = false;
    let flippedCard = false; //Checks if card has been clicked
    let lockBoard = false; // Keep the board locked until first pair of cards are flipped back - if no match
    let firstCard, secondCard; // Checks if cards match
    let moves = 0;


// Sound effects 
    const noMatchSound = document.getElementById('noMatchSound');
    const matchSound = document.getElementById('matchSound');
    const victorySound = document.getElementById('VictorySound');
    const flipSound = document.getElementById('flipSound');
    const cardSounds = [noMatchSound, matchSound, victorySound, flipSound];

// Audio buttons 
    const soundButton = document.getElementById('volume-up');
    const muteButton = document.getElementById('volume-mute');
    const audio = document.getElementById('audio-container');
    let soundOn = true;

// Events
cards.forEach(card => card.addEventListener('click', flipCard));
shuffle();


function showInstructions() {
    instructions.style.display = "block";
}

function closeInstructions() {
    instructions.style.display = "none";
}

// Click function for cards 
// Click, Flip, ResetBoard and Shuffle function code taken form https://marina-ferreira.github.io/tutorials/js/memory-game/ 

function flipCard() {
   // if timer(); 

    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');
    flipSound.play();

        // first card click
    if(!flippedCard) {  
        flippedCard = true;
        firstCard = this;

        return;
    }
        // second click
        secondCard = this; 
        checkIfCardMatch();
}

function checkIfCardMatch() {

    let isMatch = firstCard.dataset.flipper === secondCard.dataset.flipper;
        isMatch ? matchPair() : noMatch();
        
}

function matchPair() {

    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    matchSound.play();

    resetBoard();  
}

function noMatch() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        noMatchSound.play();

        resetBoard();
      }, 800);

      addMove();
}

// Moves Counter
// Moves Counter and Timer taken from: https://github.com/moirahartigan/Portfolio-2---Alien-Memory-Game/blob/master/assets/js/script.js
    moves = 0;
    movesCounter.innerHTML = 0;

function addMove() {
    moves++;
    movesCounter.innerHTML = moves;
}

// Timer
    let time;
    let minutes = 0;
    let seconds = 0;
    let timeStart = false;
    timeContainer.innerHTML = '${minutes} Mins ${seconds} Secs';

    function timer() {
        time = setInterval(function() {
            seconds++;
            if (seconds === 60) {
                minutes++;
                seconds = 0;
            }
            timeContainer.innerHTML = '${minutes} Mins ${seconds} Secs';
        }, 1000);
}

function finishTime() {
    clearInterval(time);
} 

// Cards are reset after each round
function resetBoard() {
    [flippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function shuffle() {
    cards.forEach(card => {
      let randomPos = Math.floor(Math.random() * 12);
      card.style.order = randomPos;
    });
  }
  
function winGame() {
    finishTime();
    winMessage();
}

// Win game message
function winMessage() {
    modal-outer
}

function reset() {

}

// Audio Buttons
// Function for audio inspired and taken from: https://github.com/kerekmarci/ms2/blob/master/assets/js/game.js

audio.addEventListener('click', () => {    
    soundButton.classList.toggle('show');
    muteButton.classList.toggle('show');
    if (soundOn) {
        for (let i = 0; i < cardSounds.length; i++) {
            cardSounds[i].muted = true;            
        }; 
        soundOn = false; 
    } else {
        for (let i = 0; i < cardSounds.length; i++) {
            cardSounds[i].muted = false;            
        }; 
        soundOn = true;
    }     
})