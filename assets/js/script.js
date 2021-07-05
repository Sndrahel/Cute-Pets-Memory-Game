const cards = document.querySelectorAll('.card');

    let flippedCard = false; //checks if card has been clicked
    let lockBoard = false;
    let firstCard, secondCard;

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

 // Click function for cards, add flip class for css effects code taken form https://marina-ferreira.github.io/tutorials/js/memory-game/  

function flipCard() {
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

// board are locked until cards flip back - if no match
function noMatch() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        noMatchSound.play();

        resetBoard();
      }, 800);
}

//cards are reset after each round
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

function movesCounter() {

}

function timer() {

}

// Create a function that stops the timer once all 16 cards are matched.
function finishTime() {

}
 
function reset() {

}

function winGame() {

}

function winModal() {

}

/* ---- Audio Buttons ---- */
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