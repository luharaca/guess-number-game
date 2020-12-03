"use strict";

// Selecting elements
const scoreOfPlay1Element = document.getElementById("score--1");
const scoreOfPlay2Element = document.querySelector("#score--2");
const diceElement = document.getElementById("dice");
const rollButton = document.getElementById("rollButton");
const newButton = document.getElementById("newButton");
const holdButton = document.getElementById("holdButton");

let gameOver = false;

// initial conditions
setInitialConditions();

// events
rollButton.addEventListener("click", function () {
  if (!gameOver) {
    playGame();
  }
});

newButton.addEventListener("click", function () {
  setInitialConditions();
});

// functions
function playGame() {
  const diceNumber = Math.trunc(Math.random() * 6 + 1);

  displayDice(diceNumber);

  if (diceNumber === 1) {
    switchActivePlayer();
    return;
  }

  updateSocreForCurrentPlayer(diceNumber);
}

function displayDice(diceNumber) {
  diceElement.setAttribute("src", `dice-${diceNumber}.png`);
  diceElement.classList.remove("hidden");
}

function setInitialConditions() {
  scoreOfPlay1Element.textContent = 0; // 0 is converted to string automatically
  scoreOfPlay2Element.textContent = 0;
  resetCurrentScores();
  diceElement.classList.add("hidden");
  gameOver = false;
}

function updateSocreForCurrentPlayer(diceNumber) {
  document.querySelector(
    "section.player--active div.current p.current-score"
  ).textContent = diceNumber;

  let score = Number(
    document.querySelector("section.player--active p.score").textContent
  );
  document.querySelector(
    "section.player--active p.score"
  ).textContent = score += diceNumber;

  if (score >= 100) {
    gameOver = true;
    displayWinner();
  }
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
  console.log(
    "Winner is " +
      document.querySelector("section.player--active h2.name").textContent
  );
}
