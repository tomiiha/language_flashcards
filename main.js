var currentCard;
var currentCardIndex = 0;
var flashcardContainer;
var showAnswerButton;
var previousButton;
var nextButton;
var flashcardsData = [];

function showCardFront(index) {
    if (!flashcardsData.length) return;

    currentCardIndex = index;
    console.log("In showCardFront, currentCardIndex:", currentCardIndex);
    currentCard = flashcardsData[index];
    flashcardContainer.querySelector('.card-front p').textContent = currentCard['Front'];
}

function showCardBack() {
    console.log("currentCard:", currentCard);

    if (currentCard && currentCard['Back'] && currentCard['Back'].trim().length > 0) {
        flashcardContainer.querySelector('.card-back p').textContent = currentCard['Back'];
        flashcardContainer.querySelector('#note').textContent = currentCard['Note'];
    } else {
        throw new Error(`Back data is not available for currentCard index ${currentCardIndex}.`);
    }
}

function showNextCard() {
    if (currentCardIndex < flashcardsData.length - 1) {
        currentCardIndex++;
    } else {
        currentCardIndex = 0;
    }
    showCardFront(currentCardIndex);
}

function showPreviousCard() {
    if (currentCardIndex > 0) {
        currentCardIndex--;
    } else {
        currentCardIndex = flashcardsData.length - 1;
    }
    showCardFront(currentCardIndex);
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle
    while (0 !== currentIndex) {
        // Pick a remaining element
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // Swap it with the current element
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

document.addEventListener('DOMContentLoaded', (event) => {
    flashcardContainer = document.querySelector('.card');

    showAnswerButton = document.querySelector('#show-answer');
    previousButton = document.querySelector('#prev');
    nextButton = document.querySelector('#next');

    // Event listeners
    showAnswerButton.addEventListener('click', showCardBack);
    previousButton.addEventListener('click', showPreviousCard);
    nextButton.addEventListener('click', showNextCard);

    // Load flashcards data and show first card front
    $.get('./data.csv', function(data) {
        var results = Papa.parse(data, {header: true});
        flashcardsData = results['data'];
        flashcardsData = shuffle(flashcardsData);
        showCardFront(0);
    });
});
