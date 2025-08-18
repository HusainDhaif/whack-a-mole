// Your repo should have commits that date back to the very beginning of the project. 
// If you start over with a new repo, do not delete the old one.
//  Your commit messages should be descriptive of the work done in that commit.


// peseudocode

// INITIALIZE:
// - get all HOLES from DOM
// - set up click listeners for each hole
// - set DISPLAY_ELEMENTS references

// WHEN "Start" button clicked:
// explain the win/lose situation
// for example if two or more holes are left (not clicked), you lose, otherwise you win

//   CALL startGame()

// DURING GAME:
// - popUpMole() runs recursively
// - handleClick() validates hits

// ON GAME END:
// - Disable clicks
// - Display final score



// DOM Elements //
const holes = document.querySelectorAll('.hole');
const scoreDisplay = document.querySelector('.score span');
let score = 0;
let lastHole; // prevents same hole twice in a row

// Random time (200ms to 1s) //
function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// Random hole (0 - 8) //
function randomHole() {
  const idx = Math.floor(Math.random() * holes.length);
  return holes[idx];
}


// make a mole appear
function peep() {
  const time = randomTime(200, 1000);
  const hole = randomHole();
  hole.classList.add('active');
  
  setTimeout(() => {
    hole.classList.remove('active');
    if (!gameOver) peep(); // continuing the game
  }, time);
}

// starting the game
function startGame() {
  score = 0;
  scoreDisplay.textContent = score;
  peep();
  setTimeout(() => gameOver = true, 10000); // 10-second game
}

// if a hit is detected
holes.forEach(hole => {
  hole.addEventListener('click', () => {
    if (hole.classList.contains('active')) {
      score++;
      scoreDisplay.textContent = score;
      hole.classList.remove('active');
    }
  });
});


// to start 
startGame();

let timeLeft = 10;
const timerDisplay = document.createElement('div');
timerDisplay.textContent = timer; $(timeLeft);
document.body.insertBefore(timerDisplay, document.querySelector('.game-container'));

const timer = setInterval(() => {
  timeLeft--;
  timerDisplay.textContent = timer; $(timeLeft);
  if (timeLeft <= 0) clearInterval(timer);
}, 1000);