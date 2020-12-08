"use strict";

/**
 * Rules of the games
 * 1. Roll dice: it will add the number on top of CURRENT except for number one where the current point is lost and the current round stops
 * 2. Hold: Add the current number to the player's record and stop the current round
 * 3. Winning: the player who first gets a score of 100
 */

// Selecting elements
const rollButton = document.getElementById("rollButton");
const newGameButton = document.getElementById("newButton");
const holdButton = document.getElementById("holdButton");

const diceElement = document.getElementById("dice");

const playerElements = document.querySelectorAll("section.player");
const currentScoreList = document.querySelectorAll(
  "section div.current p.current-score"
);
const totalScoreList = document.querySelectorAll("section p.score");

let gameOver = false;

// initial conditions
setInitialConditions();

// events
rollButton.addEventListener("click", function () {
  if (!gameOver) {
    rollDice();
  }
});

newGameButton.addEventListener("click", function () {
  setInitialConditions();
});

holdButton.addEventListener("click", function () {
  if (!gameOver) {
    addCurrentScoreToTotal();
  }
});

// functions
function rollDice() {
  const diceNumber = Math.trunc(Math.random() * 6 + 1);

  displayDice(diceNumber);

  if (diceNumber === 1) {
    endCurrentRound();
    return;
  }

  addToCurrentScoreForPlayer(diceNumber);
}

function displayDice(diceNumber) {
  // diceElement.src = `dice-${diceNumber}.png`;
  diceElement.setAttribute("src", `dice-${diceNumber}.png`);
  diceElement.classList.remove("hidden");
}

function endCurrentRound() {
  // reset the current score
  document.querySelector(
    "section.player--active .current .current-score"
  ).textContent = 0;

  switchActivePlayer();
}

function addToCurrentScoreForPlayer(diceNumber) {
  const currentElement = document.querySelector(
    "section.player--active div.current p.current-score"
  );

  currentElement.textContent = Number(currentElement.textContent) + diceNumber;

  if (checkHasWon()) {
    displayWinner();
  }
}

function addCurrentScoreToTotal() {
  const scoreElement = document.querySelector("section.player--active .score");

  scoreElement.textContent = `${
    Number(
      document.querySelector("section.player--active .current .current-score")
        .textContent
    ) + Number(scoreElement.textContent)
  }`;

  if (checkHasWon()) {
    displayWinner();
    return;
  }

  endCurrentRound();
}

function checkHasWon() {
  return (
    Number(
      document.querySelector("section.player--active p.score").textContent
    ) >= 100
  );
}

function setInitialConditions() {
  resetScores(currentScoreList);
  resetScores(totalScoreList);
  diceElement.classList.add("hidden");
  document
    .querySelector("section.player--active")
    .classList.remove("player--winner");
  gameOver = false;
}

function switchActivePlayer() {
  if (playerElements != null) {
    for (let i = 0; i < playerElements.length; i++) {
      playerElements[i].classList.toggle("player--active");
    }
  }
}

function resetScores(scores) {
  for (let i = 0; i < scores.length; i++) {
    scores[i].textContent = 0;
  }
}

function displayWinner() {
  gameOver = true;
  document
    .querySelector("section.player--active")
    .classList.add("player--winner");
}
