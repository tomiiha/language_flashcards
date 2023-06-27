$(document).ready(function() {
    var data;
    var currentCard = 0;
    var card = $('.card-content');
    var cardFront = $('.card-front');
    var cardBack = $('.card-back');
    var show = document.getElementById('show');
    var next = document.getElementById('next');
    var prev = document.getElementById('prev');

    function getData() {
        Papa.parse('https://tomiiha.github.io/language_flashcards/data.csv', {
            download: true,
            header: true,
            complete: function(results) {
                data = results.data;
                console.log("Data loaded successfully. Number of entries: " + data.length);
                shuffleArray(data);
                showCardFront();
            },
            error: function(err, file, inputElem, reason) {
                console.log("Error occurred while loading data: ", err, reason);
            }
        });
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function showCardFront() {
        if(data && data[currentCard]) {
            cardFront.find('p').text(data[currentCard].Front);
            card.removeClass('flipped');
        } else {
            console.log("Error: data is not available or currentCard index is out of range.");
        }
    }

    function showCardBack() {
        console.log("currentCard:", currentCard); 
    
        if (currentCard['Back'] && currentCard['Back'].trim().length > 0) {
            flashcardContainer.innerHTML = currentCard['Back'];
        } else {
            throw new Error("Back data is not available for currentCard.");
        }
    }

    show.addEventListener('click', function() {
        if (!card.hasClass('flipped')) {
            showCardBack();
            card.addClass('flipped');
        }
    });

    next.addEventListener('click', function() {
        if (currentCard < data.length - 1) {
            currentCard++;
            showCardFront();
        }
    });

    prev.addEventListener('click', function() {
        if (currentCard > 0) {
            currentCard--;
            showCardFront();
        }
    });

    getData();
});
