const cards = document.querySelectorAll('.card');

    let flippedCard = false; //checks if card has been clicked
    let lockboard = false;
    let firstCard, secondCard;


function showInstructions() {

}

function closeInstructions() {

}

function shuffle(arr) {

}

function flipCard() {
    if (lockboard) return;
    this.classList.add('flip');

    if(!flippedCard) {
        // first click
        flippedCard = true;
        firstCard = this;

        return;
    }

        // second click
        flippedCard = false;
        secondCard = this;
         
        checkCardMatch();
}

cards.forEach(card => card.addEventListener('click', flipCard));

function checkCardMatch() {

    let isMatch = firstCard.dataset.flipper === 
    secondCard.dataset.flipper;

    isMatch ? matchPair() : noMatch();
}

function matchPair() {

    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
}

function noMatch() {
    lockboard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        lockboard = false;
      }, 800);
}

function movesCounter() {

}

function timer() {

}

// Create a function that stops the timer once all 16 cards are matched.
function finishTime() {

}

function resetGame() {

}

function winGame() {

}

function winModal() {

}
