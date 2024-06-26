var flashcardsData = [];
var previousCards = [];
var currentCardIndex;
var currentCard;
var isReversed = false;

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function showCard(index, isBack = false) {
    if (!flashcardsData.length) return;

    currentCardIndex = index;
    currentCard = flashcardsData[index];

    var cardContent = document.querySelector('.card .card-content p');
    cardContent.textContent = (isReversed !== isBack) ? currentCard['Back'] : currentCard['Front'];
}

document.addEventListener("DOMContentLoaded", function() {
    fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vR8AaBycR0DAZyg2ejm9KpgXFxf9YUVNO78t7m1E5SOWKv6gq1dP9jR6WT0khiPZ6IOu-R6l8Y9hCK-/pub?output=csv')
        .then(response => response.text())
        .then(data => {
            var results = Papa.parse(data, {header: true});
            flashcardsData = shuffle(results['data']);
            previousCards.push(flashcardsData[0]);
            showCard(0);
        });

    var showAnswerButton = document.querySelector('#show-answer');
    showAnswerButton.addEventListener('click', function() {
        showCard(currentCardIndex, true);
    });

    var prevButton = document.querySelector('#prev');
    prevButton.addEventListener('click', function() {
        if (previousCards.length > 1) {
            previousCards.pop();
            var previousCard = previousCards[previousCards.length - 1];
            currentCardIndex = flashcardsData.indexOf(previousCard);
            showCard(currentCardIndex);
        }
    });

    var nextButton = document.querySelector('#next');
    nextButton.addEventListener('click', function() {
        if (currentCardIndex < flashcardsData.length - 1) {
            var nextCardIndex = Math.floor(Math.random() * flashcardsData.length);
            while (nextCardIndex === currentCardIndex) {
                nextCardIndex = Math.floor(Math.random() * flashcardsData.length);
            }
            previousCards.push(flashcardsData[nextCardIndex]);
            showCard(nextCardIndex);
        }
    });

    var reverseButton = document.querySelector('#reverse');
    reverseButton.addEventListener('click', function() {
        isReversed = !isReversed;
        var languageDirectionP = document.querySelector('#language-direction');
        languageDirectionP.textContent = isReversed ? 'Vietnamese-to-English' : 'English-to-Vietnamese';
        showCard(currentCardIndex);
    });

    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.maxHeight){
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            } 
        });
    }
});
