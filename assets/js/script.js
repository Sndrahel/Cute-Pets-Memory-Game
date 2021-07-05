const cards = document.querySelectorAll('.card');

    let flippedCard = false; //checks if card has been clicked
    let firstCard, secondCard;

cards.forEach(card => card.addEventListener('click', flipCard));

function showInstructions() {

}

function closeInstructions() {

}

function shuffle(arr) {

}

function flipCard() {
    this.classList.add('flip');

        if(!flippedCard) {
            // first click
            flippedCard = true;
            firstCard = this;
        } else {
            // second click
            flippedCard = false;
            secondCard = this;

            //do cards match?
        }
}

function checkCardMatch() {

}

function matchPair() {

}

function noMatch() {

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
