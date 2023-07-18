// flashcards.module.js

var flashcardsData = [];
var currentCardIndex;
var currentCard;
var flashcardContainer;

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function showCardFront(index) {
    if (!flashcardsData.length) return;

    currentCardIndex = index;
    console.log("In showCardFront, currentCardIndex:", currentCardIndex);
    currentCard = flashcardsData[index];

    // Show front content
    var frontContent = flashcardContainer.querySelector('.card-front p');
    frontContent.textContent = currentCard['Front'];
    
    var cardFront = flashcardContainer.querySelector('.card-front');
    cardFront.classList.replace('inactive', 'active');

    // Hide back content
    var cardBack = flashcardContainer.querySelector('.card-back');
    cardBack.classList.replace('active', 'inactive');
}

function showCardBack() {
    console.log("currentCard:", currentCard);

    if (currentCard && currentCard['Back'] && currentCard['Back'].trim().length > 0) {
        // Populate back content
        var backContent = flashcardContainer.querySelector('.card-back p');
        backContent.textContent = currentCard['Back'];
        
        var cardBack = flashcardContainer.querySelector('.card-back');
        cardBack.classList.replace('inactive', 'active');

        // Hide front content
        var cardFront = flashcardContainer.querySelector('.card-front');
        cardFront.classList.replace('active', 'inactive');
    } else {
        // Default value for Back property
        currentCard['Back'] = '';
        showCardBack();
    }
}

document.addEventListener("DOMContentLoaded", function() {
    flashcardContainer = document.querySelector('.card');

    fetch('./data.csv')
        .then(response => response.text())
        .then(data => {
            var results = Papa.parse(data, {header: true});
            flashcardsData = results['data'];
            flashcardsData = shuffle(flashcardsData);
            showCardFront(0);
        });

    // Add event listener to show answer button
    var showAnswerButton = document.querySelector('#show-answer');
    showAnswerButton.addEventListener('click', showCardBack);

    // Add event listener to previous button
    var prevButton = document.querySelector('#prev');
    prevButton.addEventListener('click', function() {
        if (currentCardIndex > 0) {
            currentCardIndex--;
            showCardFront(currentCardIndex);
        }
    });

    // Add event listener to next button
    var nextButton = document.querySelector('#next');
    nextButton.addEventListener('click', function() {
        if (currentCardIndex < flashcardsData.length - 1) {
            currentCardIndex++;
            showCardFront(currentCardIndex);
        }
    });
});
