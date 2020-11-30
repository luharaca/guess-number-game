"use strict";

let myNumber = generateNumber();
let isGameOver = false;
let highscore = 0;

// event listeners
document
  .querySelector("button.check")
  .addEventListener("click", playCheckNumberGame);

document.querySelector("button.again").addEventListener("click", restoreGame);

// funcitons
function playCheckNumberGame() {
  const guess = Number(document.querySelector("input.guess").value);

  if (!guess) {
    warnInvalidGuess();
    return;
  }

  if (!isGameOver) {
    if (guess === myNumber) {
      isGameOver = true;
      displayWinner();
      updateHighScore();
      return;
    }

    let currentScore = getCurrentScore();
    currentScore > 0 ? playGame(guess, currentScore) : stopGame();
  }
}

function warnInvalidGuess() {
  displayMessage("⛔️  No number is entered!");
}

function displayWinner() {
  displayMessage("🎊 🎉 Congratulations!!!");
  document.querySelector("body").style.backgroundColor = "#60b347";
  document.querySelector("#result").textContent = myNumber;
  document.querySelector("#result").style.width = "30rem";
}

function updateHighScore() {
  const currentScore = getCurrentScore();
  if (currentScore > highscore) {
    highscore = currentScore;
    document.querySelector("span.highscore").textContent = highscore;
  }
}

function playGame(guess, currentScore) {
  document.querySelector("span.score").textContent = --currentScore;
  displayMessage(
    guess > myNumber ? "The number is too high!" : "The number is too low!"
  );
}

function stopGame() {
  displayMessage("Sorry, the game is over 🙁");
}

function restoreGame() {
  isGameOver = false;
  myNumber = generateNumber();

  restoreContent();
  restoreStyle();
}

function generateNumber() {
  return Math.trunc(Math.random() * 20) + 1;
}

function restoreContent() {
  displayMessage("Start guessing...");
  document.querySelector("input.guess").value = "";
  document.querySelector("span.score").textContent = 20;
  document.querySelector("#result").textContent = "?";
}

function restoreStyle() {
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector("#result").style.width = "15rem";
}

function displayMessage(message) {
  document.querySelector("#alert").textContent = message;
}

function getCurrentScore() {
  return Number(document.querySelector("span.score").textContent);
}
