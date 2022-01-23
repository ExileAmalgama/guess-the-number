'use strict';

// State variable
let score = 20;
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let highscore = 0;

const playButton = document.querySelector('.check');
const boxColor = document.querySelector('.number');
const lineColor = document.querySelector('header');

const message = function(text) {
  document.querySelector('.message').textContent = text;
}

const miss = function () {
  boxColor.style.backgroundColor = '#ff0000';
  lineColor.style.borderBottom = '7px solid #ff0000';
}

const scoreSubtract = function() {
  if(score > 1) {
    score--;
  } else {
    score = 0;
    message('You lost the game');
    playButton.disabled = true;
  }
  document.querySelector('.score').textContent = score;
  miss();
}

const success = function () {
  playButton.disabled = true;
  document.querySelector('.number').textContent = secretNumber;
  if(score > highscore) {
    highscore = score;
    document.querySelector('.highscore').textContent = highscore;
  }
  boxColor.style.backgroundColor  = '#60b347';
  lineColor.style.borderBottom   = '7px solid #60b347';
}

// Play
playButton.addEventListener('click', function() {
  const guess = Number(document.querySelector('.guess').value);
  if (!guess) {
    message('No number!');
  } else if (guess < 1 || guess > 20) {
    message('Out of range!');
    scoreSubtract();
  } else if(guess !== secretNumber) {    
    guess > secretNumber ? message('Too high!') : message('Too low!');
    scoreSubtract();
  } else if(guess === secretNumber) {
    message('Correct!');
    success();
  }
});

// Reset
document.querySelector('.reset').addEventListener('click', function() {
  score = 20;
  document.querySelector('.score').textContent = score;
  document.querySelector('.guess').value = '';
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  document.querySelector('.number').textContent = '?';
  // document.querySelector('.number').textContent = secretNumber;
  boxColor.style.backgroundColor  = '#eee';
  lineColor.style.borderBottom  = '7px solid #eee';
  playButton.disabled = false;
});

// if(document.querySelector('.numBlock').textContent > score) {
//   background-color: grey;
// }