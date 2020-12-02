"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnsOpenModal = document.querySelectorAll(".show-modal");

/**
 *  define event listeners
 * */
for (let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener("click", showModal);
}

btnCloseModal.addEventListener("click", closeWindow);
overlay.addEventListener("click", closeWindow);

document.addEventListener("keydown", function (keyEvent) {
  if (keyEvent.key === "Escape") {
    if (!modal.classList.contains("hidden")) {
      closeWindow();
    }
  }
});

/**
 *  functions
 * */
function showModal() {
  console.log("button clicked");
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function closeWindow() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}
