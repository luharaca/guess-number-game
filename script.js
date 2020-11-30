"use strict";

let myNumber = generateNumber();
let isGameOver = false;
let highscore = 0;

// for debug use
console.log(myNumber);

// event listeners
document
  .querySelector("button.check")
  .addEventListener("click", playCheckNumberGame);

document.querySelector("button.again").addEventListener("click", restoreGame);

// funcitons
function playCheckNumberGame() {
  const guess = Number(document.querySelector("input.guess").value);

  let currentScore = Number(document.querySelector("span.score").textContent);

  if (isGameOver) {
    return;
  }

  if (!guess) {
    warnInvalidGuess();
  } else if (guess === myNumber) {
    displayWinner();
    isGameOver = true;
  } else if (currentScore > 0) {
    continueGame(guess, currentScore);
  } else {
    stopGame();
  }
}

function warnInvalidGuess() {
  document.querySelector("#alert").textContent = "⛔️  No number is entered!";
}

function displayWinner() {
  document.querySelector("#alert").textContent = "🎊 🎉 Congratulations!!!";
  document.querySelector("#result").textContent = myNumber;
  document.querySelector("body").style.backgroundColor = "#60b347";
  document.querySelector("#result").style.width = "30rem";
}

function continueGame(guess, currentScore) {
  document.querySelector(".score").textContent = --currentScore;
  if (guess > myNumber) {
    document.querySelector("#alert").textContent = "The number is too high!";
  } else {
    document.querySelector("#alert").textContent = "The number is too low!";
  }
}

function stopGame() {
  document.querySelector("#alert").textContent = "Sorry, the game is over 🙁";
}

function restoreGame() {
  myNumber = generateNumber();

  updateHighScore();

  document.querySelector("span.score").textContent = 20;
  document.querySelector("#alert").textContent = "Start guessing...";
  document.querySelector("input.guess").value = "";
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector("#result").style.width = "15rem";
  document.querySelector("#result").textContent = "?";
  isGameOver = false;

  // for debug use
  console.log(myNumber);
}

function generateNumber() {
  return Math.trunc(Math.random() * 20) + 1;
}

function updateHighScore() {
  const currentScore = Number(document.querySelector("span.score").textContent);
  if (currentScore > highscore) {
    highscore = currentScore;
    document.querySelector("span.highscore").textContent = highscore;
  }
}
