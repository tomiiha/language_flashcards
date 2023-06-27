var currentCard;
var currentCardIndex = 0; // Define currentCardIndex variable

function showCardFront(index) {
    currentCard = flashcardsData[index];
    flashcardContainer.innerHTML = currentCard['Front'];
}

function showCardBack() {
    console.log("currentCard:", currentCard);

    if (currentCard && currentCard['Back'] && currentCard['Back'].trim().length > 0) {
        flashcardContainer.innerHTML = currentCard['Back'];
    } else {
        throw new Error(`Back data is not available for currentCard index ${currentCardIndex}.`); // Use currentCardIndex here
    }
}

function showNextCard() {
    if (currentCardIndex < flashcardsData.length - 1) {
        currentCardIndex++; // Increment currentCardIndex when showing next card
    } else {
        currentCardIndex = 0; // Reset currentCardIndex when reaching end of flashcardsData
    }
    showCardFront(currentCardIndex);
}

function showPreviousCard() {
    if (currentCardIndex > 0) {
        currentCardIndex--; // Decrement currentCardIndex when showing previous card
    } else {
        currentCardIndex = flashcardsData.length - 1; // Set currentCardIndex to last index when reaching start of flashcardsData
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
    showCardFront(currentCardIndex);
});
