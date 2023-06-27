// Our static list of flashcards
let flashcards = [];
let currentCard = 0;

// URL of the published Google Sheet CSV
const csvUrl = 'PASTE_THE_LINK_HERE'; // Replace this with your Google Sheets link

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
    updateCard();
}

// Get DOM elements
const cardContainer = document.querySelector('.card-container');
const cardFront = document.querySelector('.card-front p');
const cardBack = document.querySelector('.card-back p');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

// Function to update the card display
function updateCard() {
    cardFront.innerText = flashcards[currentCard].front;
    cardBack.innerText = flashcards[currentCard].back;
    
    // Show the front of the card and hide the back
    cardFront.style.display = 'flex';
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

nextButton.addEventListener('click', function() {
    currentCard++;
    updateCard();
});

// Add event listener to the card to flip it
cardContainer.addEventListener('click', function() {
    const cardFrontDisplay = cardFront.style.display;
    cardFront.style.display = cardFrontDisplay === 'flex' ? 'none' : 'flex';
    cardBack.style.display = cardFrontDisplay === 'flex' ? 'flex' : 'none';
});

// Fetch data from Google Sheets and set the initial display
fetchData();
