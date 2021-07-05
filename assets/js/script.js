const cards = document.querySelectorAll('.card');

    let flippedCard = false; //checks if card has been clicked
    let lockBoard = false;
    let firstCard, secondCard;

// events
cards.forEach(card => card.addEventListener('click', flipCard));
shuffle();


function showInstructions() {
    instructions.style.display = "block";
}

function closeInstructions() {
    instructions.style.display = "none";
}

function shuffle(arr) {

}

(function shuffle() {
    cards.forEach(card => {
      let randomPos = Math.floor(Math.random() * 12);
      card.style.order = randomPos;
    });
  })();

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if(!flippedCard) {  // first card click
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

    resetBoard();  
}

// board are locked until cards flip back - if no match
function noMatch() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
      }, 800);
}

//cards are reset after each round
function resetBoard() {
    [flippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
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