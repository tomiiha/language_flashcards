var currentCard;
var currentCardIndex = 0; // We initialize it to 0

var flashcardContainer = document.querySelector('#flashcard-container');
var showAnswerButton = document.querySelector('#show-answer');
var previousButton = document.querySelector('#previous');
var nextButton = document.querySelector('#next');
var flashcardsData = [];

function showCardFront(index) {
    currentCardIndex = index; // We assign the value here
    currentCard = flashcardsData[index];
    flashcardContainer.innerHTML = currentCard['Front'];
}

function showCardBack() {
    console.log("currentCard:", currentCard);

    if (currentCard && currentCard['Back'] && currentCard['Back'].trim().length > 0) {
        flashcardContainer.innerHTML = currentCard['Back'];
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

// Event listeners
showAnswerButton.addEventListener('click', showCardBack);
previousButton.addEventListener('click', showPreviousCard);
nextButton.addEventListener('click', showNextCard);

// Load flashcards data and show first card front
$.get('./data.csv', function(data) {
    var results = Papa.parse(data, {header: true});
    flashcardsData = results['data'];
    flashcardsData = shuffle(flashcardsData);
    showCardFront(0); // We can call this with 0 since we're starting at the first card
});
