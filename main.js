$(document).ready(function() {
    var data;
    var currentCard = 0;
    var card = $('.card-content');
    var cardFront = $('.card-front');
    var cardBack = $('.card-back');
    var note = document.getElementById('note');
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
            note.textContent = '';
        } else {
            console.log("Error: data is not available or currentCard index is out of range.");
        }
    }

    function showCardBack() {
        if(data && data[currentCard]) {
            if(data[currentCard].Back && data[currentCard].Note){
                cardBack.find('p').first().text(data[currentCard].Back);
                note.textContent = 'Note: ' + data[currentCard].Note;
            }else{
                console.log("Error: Back or Note data is not available for currentCard index " + currentCard);
            }
        } else {
            console.log("Error: data is not available or currentCard index is out of range.");
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
