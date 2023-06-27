$(document).ready(function() {
    var data;
    var currentCard = 0;
    var card = $('.card-content');
    var cardFront = $('.card-front');
    var cardBack = $('.card-back');
    var note = document.getElementById('note');
    var show = document.getElementById('show');

    function getData() {
        Papa.parse('https://docs.google.com/spreadsheets/d/1oY7UJ1zXIKjctRPStg1-l9L8mEkLHsCI_y7xyHcGOy0/gviz/tq?tqx=out:csv', {
            download: true,
            header: true,
            complete: function(results) {
                data = results.data;
                shuffleArray(data);
                showCardFront();
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
        cardFront.find('p').text(data[currentCard].Front);
        card.removeClass('flipped');
        note.textContent = '';
    }

    function showCardBack() {
        cardBack.find('p').first().text(data[currentCard].Back);
        note.textContent = 'Note: ' + data[currentCard].Note;
    }

    $('#next').click(function() {
        if (currentCard < data.length - 1) {
            currentCard++;
            showCardFront();
        }
    });

    $('#prev').click(function() {
        if (currentCard > 0) {
            currentCard--;
            showCardFront();
        }
    });

    card.click(function() {
        card.toggleClass('flipped');
        if (card.hasClass('flipped')) {
            showCardBack();
        } else {
            showCardFront();
        }
    });

    show.onclick = function() {
        card.addClass('flipped');
        showCardBack();
    }

    getData();
});
