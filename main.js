document.addEventListener('DOMContentLoaded', function() {
    const url = 'https://docs.google.com/spreadsheets/d/1oY7UJ1zXIKjctRPStg1-l9L8mEkLHsCI_y7xyHcGOy0/gviz/tq?tqx=out:csv';
    let items = [];
    let index = 0;

    Papa.parse(url, {
        download: true,
        header: true,
        complete: function(results) {
            items = results.data;
            items = items.sort(() => Math.random() - 0.5); // Shuffling the array
            updateCard();
        }
    });

    function updateCard() {
        const card = document.querySelector('.card');
        const front = document.querySelector('.card-front p');
        const back = document.querySelector('.card-back p');
        const note = document.getElementById('note');

        front.textContent = items[index].Front;
        back.textContent = items[index].Back;
        note.textContent = ''; // Clear note when showing the front of the card

        card.style.transform = 'rotateY(0deg)';
    }

    function showBack() {
        const card = document.querySelector('.card');
        const note = document.getElementById('note');

        note.textContent = "Note: " + items[index].Note;

        card.style.transform = 'rotateY(180deg)';
    }

    document.getElementById('show').addEventListener('click', showBack);
    document.getElementById('prev').addEventListener('click', function() {
        index = index === 0 ? items.length - 1 : index - 1;
        updateCard();
    });
    document.getElementById('next').addEventListener('click', function() {
        index = (index + 1) % items.length;
        updateCard();
    });
});
