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

    // Hide back content
    flashcardContainer.querySelector('.card-back').style.display = 'none';

    // Show front content
    var frontContent = flashcardContainer.querySelector('.card-front p');
    frontContent.textContent = currentCard['Front'];
    frontContent.style.display = 'block';
}

function showCardBack() {
    console.log("currentCard:", currentCard);

    if (currentCard && currentCard['Back'] && currentCard['Back'].trim().length > 0) {
        // Toggle front and back content with a transition effect
        var cardFront = flashcardContainer.querySelector('.card-front');
        var cardBack = flashcardContainer.querySelector('.card-back');

        cardFront.style.transform = 'rotateY(-180deg)';
        cardBack.style.transform = 'rotateY(0deg)';

        setTimeout(function () {
            cardFront.style.display = 'none';
            cardBack.style.display = 'block';
        }, 500); // Delay of 500 milliseconds for the transition effect
    } else {
        // Default value for Back property
        currentCard['Back'] = '';
        showCardBack();
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
    return array.shuffle();
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
