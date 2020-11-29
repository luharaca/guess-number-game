"use strict";

const myNumber = Math.trunc(Math.random() * 20) + 1;
console.log(myNumber);

document.querySelector("button.check").addEventListener("click", function () {
  const guess = Number(document.querySelector("input.guess").value);

  if (!guess) {
    document.querySelector("#alert").textContent = "⛔️  No number is entered!";
    return;
  }

  if (guess === myNumber) {
    document.querySelector("#alert").textContent = "🎊 🎉 Congratulations!!!";
    document.querySelector("#result").textContent = myNumber;
  } else if (guess > myNumber) {
    document.querySelector("#alert").textContent = "Too high!";
  } else {
    document.querySelector("#alert").textContent = "Too low!";
  }
});
