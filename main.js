var currentCard;
var currentCardIndex = 0;

var flashcardContainer = document.querySelector('#flashcard-container');
var showAnswerButton = document.querySelector('#show-answer');
var previousButton = document.querySelector('#previous');
var nextButton = document.querySelector('#next');
var flashcardsData = [];

function showCardFront(index) {
    if (!flashcardsData.length) return;

    currentCardIndex = index;
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
