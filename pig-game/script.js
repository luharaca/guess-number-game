"use strict";

// Selecting elements
const scoreOfPlay1Element = document.getElementById("score--1");
const scoreOfPlay2Element = document.querySelector("#score--2");
const diceElement = document.getElementById("dice");

// initial conditions
scoreOfPlay1Element.textContent = 0; // 0 is converted to string automatically
scoreOfPlay2Element.textContent = 0;
diceElement.classList.add("hidden");
