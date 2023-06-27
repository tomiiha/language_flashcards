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
    flashcardContainer.innerHTML = currentCard['Front'];
}

function showCardBack() {
    if (!flashcardsData.length) return;
    
    console.log("currentCard:", currentCard);

    if (currentCard && currentCard['Back'] && currentCard['Back'].trim().length > 0) {
        flashcardContainer.innerHTML = currentCard['Back'];
    } else {
        throw new Error(`Back data is not available for currentCard index ${currentCardIndex}.`);
    }
}

function showNextCard() {
    if (!flashcardsData.length) return;

    if (currentCardIndex < flashcardsData.length - 1) {
        currentCardIndex++;
    } else {
        currentCardIndex = 0;
    }
    showCardFront(currentCardIndex);
}

function showPreviousCard() {
    if (!flashcardsData.length) return;

    if (currentCardIndex > 0) {
        currentCardIndex--;
    } else {
        currentCardIndex = flashcardsData.length - 1;
    }
    showCardFront(currentCardIndex);
}

// Load flashcards data and show first card front
$.get('./data.csv', function(data) {
    var results = Papa.parse(data, {header: true});
    flashcardsData = results['data'];
    flashcardsData = shuffle(flashcardsData);
    showCardFront(0);
});

document.addEventListener('DOMContentLoaded', (event) => {
    flashcardContainer = document.querySelector('#flashcard-container');
    showAnswerButton = document.querySelector('#show-answer');
    previousButton = document.querySelector('#previous');
    nextButton = document.querySelector('#next');

    // Event listeners
    showAnswerButton.addEventListener('click', showCardBack);
    previousButton.addEventListener('click', showPreviousCard);
    nextButton.addEventListener('click', showNextCard);
});
