"use strict";

/**
 * rules of the games
 * 1. Roll dice: the number will be added on top of CURRENT except for number one where the current point is lost and the current round stops
 * 2. Hold: Add the current number to the player's record and stop the current round
 * 3. Winning: player who fist get score 100
 */
// Selecting elements
const scoreOfPlay1Element = document.getElementById("score--1");
const scoreOfPlay2Element = document.querySelector("#score--2");
const diceElement = document.getElementById("dice");
const rollButton = document.getElementById("rollButton");
const newGameButton = document.getElementById("newButton");
const holdButton = document.getElementById("holdButton");

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
  diceElement.setAttribute("src", `dice-${diceNumber}.png`);
  diceElement.classList.remove("hidden");
}

function endCurrentRound() {
  // reset the current score
  document.querySelector(
    "section.player--active .current .current-score"
  ).textContent = "0";

  switchActivePlayer();
}

function addToCurrentScoreForPlayer(diceNumber) {
  const currentElement = document.querySelector(
    "section.player--active div.current p.current-score"
  );

  currentElement.textContent = `${
    Number(currentElement.textContent) + diceNumber
  }`;

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
  scoreOfPlay1Element.textContent = 0; // 0 is converted to string automatically
  scoreOfPlay2Element.textContent = 0;
  resetCurrentScores();
  diceElement.classList.add("hidden");
  document
    .querySelector("section.player--active")
    .classList.remove("player--winner");
  gameOver = false;
}

function switchActivePlayer() {
  const playerElement = document.querySelector(".player--active");
  if (playerElement !== null) {
    if ("player1" === playerElement.getAttribute("id")) {
      playerElement.classList.remove("player--active");
      const otherPlayerElement = document.getElementById("player2");
      if (otherPlayerElement !== null) {
        otherPlayerElement.classList.add("player--active");
      }
      return;
    }

    if ("player2" === playerElement.getAttribute("id")) {
      playerElement.classList.remove("player--active");
      const otherPlayerElement = document.getElementById("player1");
      if (otherPlayerElement !== null) {
        otherPlayerElement.classList.add("player--active");
      }
      return;
    }
  }
}

function resetCurrentScores() {
  const scoreList = document.querySelectorAll(
    "section div.current p.current-score"
  );

  for (let i = 0; i < scoreList.length; i++) {
    scoreList[i].textContent = 0;
  }
}

function displayWinner() {
  gameOver = true;
  document
    .querySelector("section.player--active")
    .classList.add("player--winner");
}
