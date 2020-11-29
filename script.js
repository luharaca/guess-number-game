"use strict";

const myNumber = Math.trunc(Math.random() * 20) + 1;
let highScore = 20;

console.log(myNumber);

document.querySelector("button.check").addEventListener("click", function () {
  const guess = Number(document.querySelector("input.guess").value);
  document.querySelector(".highscore").textContent = highScore;

  if (!guess) {
    document.querySelector("#alert").textContent = "⛔️  No number is entered!";
    return;
  }

  if (guess === myNumber) {
    document.querySelector("#alert").textContent = "🎊 🎉 Congratulations!!!";
    document.querySelector("#result").textContent = myNumber;

    changeStyleForWinner();
    return;
  }

  if (highScore > 0) {
    document.querySelector(".highscore").textContent = --highScore;
    if (guess > myNumber) {
      document.querySelector("#alert").textContent = "Too high!";
    } else {
      document.querySelector("#alert").textContent = "Too low!";
    }
  } else {
    document.querySelector("#alert").textContent = "Sorry, the game is over 🙁";
  }
});

function changeStyleForWinner() {
  document.querySelector("body").style.backgroundColor = "#60b347";
  document.querySelector("#result").style.width = "30rem";
}
