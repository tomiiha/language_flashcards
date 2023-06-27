// Our static list of flashcards
let flashcards = [];
let currentCard = 0;

// URL of the published Google Sheet CSV
const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR8AaBycR0DAZyg2ejm9KpgXFxf9YUVNO78t7m1E5SOWKv6gq1dP9jR6WT0khiPZ6IOu-R6l8Y9hCK-/pub?gid=0&single=true&output=csv'; // Replace this with your Google Sheets link

// Function to fetch the CSV data and convert it to JSON
async function fetchData() {
    const response = await fetch(csvUrl);
    const csvText = await response.text();
    const csvData = Papa.parse(csvText, {header: true}); // using Papa Parse library to convert CSV to JSON
    flashcards = csvData.data.map(card => ({
        front: card.Front,
        back: card.Back,
        note: card.Note
    }));
    shuffle(flashcards); // Shuffle the cards
    updateCard();
}

// Fisher-Yates (aka Knuth) Shuffle
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
}

// Get DOM elements
const cardContainer = document.querySelector('.card-container');
const cardFront = document.querySelector('.card-front p');
const cardBack = document.querySelector('.card-back p');
const noteElement = document.getElementById('note');
const prevButton = document.getElementById('prev');
const showButton = document.getElementById('show');
const nextButton = document.getElementById('next');

// Function to update the card display
function updateCard() {
    cardFront.innerText = flashcards[currentCard].front;
    cardBack.innerText = flashcards[currentCard].back;
    noteElement.innerText = 'Note: ' + flashcards[currentCard].note;

    // Show the front of the card and hide the back
    cardFront.style.display = 'block';
    cardBack.style.display = 'none';

    // Disable or enable buttons
    prevButton.disabled = currentCard === 0;
    nextButton.disabled = currentCard === flashcards.length - 1;
}

// Add event listeners to the buttons
prevButton.addEventListener('click', function() {
    currentCard--;
    updateCard();
});

showButton.addEventListener('click', function() {
    cardFront.style.display = 'none';
    cardBack.style.display = 'block';
});

nextButton.addEventListener('click', function() {
    currentCard++;
    updateCard();
});

// Fetch data from Google Sheets and set the initial display
fetchData();
