const gameContainer = document.getElementById("game");

let newCards = []
let matchedCards = []
let clickable = true

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  let currentCard = event.target
  
  if ( !clickable ) return
  if ( currentCard.clicked ) return

  currentCard.style.backgroundColor = currentCard.getAttribute('class')
  currentCard.clicked = true
  newCards.push(currentCard)

  if (newCards.length === 2 ) {
    clickable = false

    if ( newCards[0].getAttribute("class") == newCards[1].getAttribute("class") ) {
      newCards[0].matched = true
      newCards[1].matched = true
      matchedCards = [...matchedCards, ...newCards]
      newCards.length = 0
      clickable = true
    } else {
      setTimeout(function() {
        for ( let resetCard of newCards ) {
          resetCard.clicked = false
          resetCard.removeAttribute("style")
        }
        newCards.length = 0
        clickable = true
      }, 1000)
    }
  }

  if (matchedCards.length === COLORS.length) alert('you won!')
}

// when the DOM loads
createDivsForColors(shuffledColors);

// game restart button
const restartButton = document.getElementById('restart-button')
restartButton.addEventListener('click', function(e) {
  e.preventDefault()
  matchedCards.length = 0
  gameContainer.innerHTML = ""
  shuffledColors = shuffle(COLORS)
  createDivsForColors(shuffledColors);
})

/* */