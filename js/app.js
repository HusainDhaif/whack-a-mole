// // Your repo should have commits that date back to the very beginning of the project. 
// // If you start over with a new repo, do not delete the old one.
// //  Your commit messages should be descriptive of the work done in that commit.


// // peseudocode

// // INITIALIZE:
// // - get all HOLES from DOM
// // - set up click listeners for each hole
// // - set DISPLAY_ELEMENTS references

// // WHEN "Start" button clicked:
// // explain the win/lose situation
// // for example if two or more holes are left (not clicked), you lose, otherwise you win

// //   CALL startGame()

// // DURING GAME:
// // - popUpMole() runs recursively
// // - handleClick() validates hits

// // ON GAME END:
// // - Disable clicks
// // - Display final score


const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const timerDisplay = document.querySelector('.timer');
const missesDisplay = document.querySelector('.misses');
const playButton = document.querySelector('.play');

let lastHole;
let timeUp = false;
let score = 0;
let timeLeft = 15;
let misses = 0;
let countdown;
let moleTimer;

// pick random hole
function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) {
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

// make mole pop
function peep() {
  const hole = randomHole(holes);
  hole.classList.add('up');
  const time = 800;
  moleTimer = setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) {
      misses++;
      missesDisplay.textContent = misses;
      if (misses >= 2) {
        endGame("Game Over! You missed too many moles 😢");
        return;
      }
      peep();
    }
  }, time);
}

// start game
function startGame() {
  score = 0;
  misses = 0;
  scoreBoard.textContent = score;
  missesDisplay.textContent = misses;
  timeLeft = 15;
  timeUp = false;
  playButton.disabled = true;

  peep();
  countdown = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(countdown);
      timeUp = true;
      if (score >= 10) {
        endGame("🎉 You Win! Final Score: " + score);
      } else {
        endGame("⏰ Time’s up! Final Score: " + score);
      }
    }
  }, 1000);
}

// hit mole
function bonk(e) {
  if (!e.isTrusted) return; // prevent cheating
  if (!this.parentNode.classList.contains('up')) return;

  score++;
  this.parentNode.classList.remove('up');
  scoreBoard.textContent = score;

  if (score >= 10) {
    endGame("🎉 You Win! Final Score: " + score);
  }
}

// end game
function endGame(message) {
  clearInterval(countdown);
  clearTimeout(moleTimer);
  timeUp = true;
  playButton.disabled = false;
  alert(message);
}

document.querySelectorAll('.mole').forEach(mole => mole.addEventListener('click', bonk));
playButton.addEventListener('click', startGame);








