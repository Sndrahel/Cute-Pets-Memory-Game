    const cards = document.querySelectorAll('.card');
    const movesCounter = document.querySelector('.moves-counter');
    const instructions = document.getElementById('instructions');
    const timeContainer = document.querySelector('.timer');
    const modalBtn = document.getElementById('modal-btn');
    const playBtn = document.getElementById('play-btn');
    const winModal = document.getElementById('win-modal');

// Sound effects 
    const noMatchSound = document.getElementById('noMatchSound');
    const matchSound = document.getElementById('matchSound');
    const winSound = document.getElementById('winSound');
    const flipSound = document.getElementById('flipSound');
    const cardSounds = [noMatchSound, matchSound, winSound, flipSound];

// Audio buttons 
    const soundButton = document.getElementById('volume-up');
    const muteButton = document.getElementById('volume-mute');
    const audio = document.getElementById('audio-control');
    let soundOn = true;

    let gameOn = false;
    let flippedCard = false; //Checks if card has been clicked
    let lockBoard = false; // Keep the board locked until first pair of cards are flipped back - if no match
    let firstCard, secondCard; // Checks if cards match
    let moves = 0;
    let totalTime = "";


// Events
cards.forEach(card => card.addEventListener('click', flipCard));
shuffle();

// Button fuction
// Button function taken from: https://github.com/moirahartigan/Portfolio-2---Alien-Memory-Game/blob/master/assets/js/script.js

modalBtn.addEventListener('click', showInstructions); // listen for open click of how to play instructions modal
playBtn.addEventListener('click', closeInstructions); // listen for open click of how to play instructions modal


function showInstructions() {
    instructions.style.display = "block";
}

function closeInstructions() {
    instructions.style.display = "none";
}

// Click function for cards 
// Cards: Click and Flip function code taken from: https://marina-ferreira.github.io/tutorials/js/memory-game/ 

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

// Checks if firstCard and secondCard match
// Card match function code taken from: https://marina-ferreira.github.io/tutorials/js/memory-game/ 
 
function checkIfCardMatch() { 

    let isMatch = firstCard.dataset.flipper === secondCard.dataset.flipper;
        isMatch ? disableCard() : noMatch();
        
}

// Cards will be disabled for clicks once they are matched
function disableCard() { 

    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    matchSound.play();

    resetBoard();  
}

// Keeps board locked and flips card back if no match 
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

// Moves Counter count moves when firstcard is clicked
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
    timeContainer.innerHTML = `${minutes} Min ${seconds} Sec`;


// Timer function is called the first time the firstCard is clicked
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

function finishTime() {
    clearInterval(time);
} 


// Cards are reset after each round
// Cards: ResetBoard and Shuffle function code taken from: https://marina-ferreira.github.io/tutorials/js/memory-game/ 
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
    winModal();
}

// Win game message
function winModal() {
    winModal.style.display ="block";
    totalTime = timeContainer.innerHTML;
    document.getElementById("total-time").innerHTML = totalTime;
    document.getElementById("final-move").innerHTML = finalMove;
    
    startGame();
} 

window.onclick = function(event) {
    if (event.target.id == 'close') {
        document.getElementById("win-modal").style.display = "none"
    }
}; 

// Resets game and starts a new game
function startGame() {
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
        cards.forEach(card => card.addEventListener('click', flipCard))
    }, 500);

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