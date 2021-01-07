"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/////////////////////////////////////////////////
// Functions

const displayMovements = function (account, sort = false) {
  containerMovements.innerHTML = "";

  const movementsToDisplay = sort
    ? account.movements.slice().sort((a, b) => a - b)
    : account.movements;

  movementsToDisplay.forEach(function (movement, i) {
    const type = movement > 0 ? "deposit" : "withdrawal";

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${movement}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

function createUsernames(accounts) {
  accounts.forEach(account => {
    account.username = account.owner
      .toLowerCase()
      .split(" ")
      .map(name => name[0])
      .join("");
  });
}

createUsernames(accounts);

function calculateAndDisplayBalance(account) {
  const balance = account.movements.reduce(
    (accumulator, current) => accumulator + current
  );
  labelBalance.textContent = `${balance} €`;
  account.balance = balance;
}

function calculateAndDisplaySummary(account) {
  const movements = account.movements;
  // calculate income
  const totalIncome = movements
    .filter(movement => movement > 0)
    .reduce((sum, movement) => sum + movement);
  labelSumIn.textContent = `${totalIncome} €`;

  // calculate total expense
  const totalExpense = movements
    .filter(movement => movement < 0)
    .reduce((sum, movement) => sum + movement);
  labelSumOut.textContent = `${Math.abs(totalExpense)} €`;

  // calculate interest
  const totalInterest = movements
    .filter(movement => movement > 0)
    .map(movement => (movement * account.interestRate) / 100)
    .reduce((sum, movement) => sum + movement);
  labelSumInterest.textContent = `${totalInterest} €`;
}

///////////////////////////////////////////////////
// Event handlers

let currentAccount;
let sort = true;

btnLogin.addEventListener("click", function (event) {
  // prevent from submitting
  event.preventDefault();

  currentAccount = accounts.find(
    account => account.username === inputLoginUsername.value
  );

  if (Number(inputLoginPin.value) === currentAccount?.pin) {
    labelWelcome.textContent = `Welcome back, ${
      currentAccount?.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = "1";
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    displayBankingDetails(currentAccount);
  }
});

btnTransfer.addEventListener("click", function (event) {
  event.preventDefault();

  const transferUsername = inputTransferTo.value;
  const transferAccount = accounts.find(
    account => account.username === transferUsername
  );

  if (transferAccount) {
    const transferAmount = Number(inputTransferAmount.value);

    if (transferAmount > 0 && transferAmount < currentAccount?.balance) {
      currentAccount.movements.push(-1 * transferAmount);
      transferAccount.movements.push(transferAmount);

      displayBankingDetails(currentAccount);
    }
  }

  inputTransferTo.value = inputTransferAmount.value = "";
});

btnClose.addEventListener("click", function (event) {
  event.preventDefault();

  if (
    currentAccount?.username === inputCloseUsername.value &&
    currentAccount?.pin === Number(inputClosePin.value)
  ) {
    const accountIndex = accounts.findIndex(
      account => account.username === currentAccount.username
    );
    accounts.splice(accountIndex, 1);

    labelWelcome.textContent = "Log in to get started";
    containerApp.style.opacity = "0";
  }

  inputCloseUsername.value = inputClosePin.value = "";
});

btnLoan.addEventListener("click", function (event) {
  event.preventDefault();

  const loanAmount = Number(inputLoanAmount.value);

  if (
    loanAmount &&
    currentAccount.movements.some(movement => movement >= loanAmount * 0.1)
  ) {
    currentAccount.movements.push(loanAmount);
    displayBankingDetails(currentAccount);
  }

  inputLoanAmount.value = "";
});

btnSort.addEventListener("click", function (event) {
  event.preventDefault();

  displayMovements(currentAccount, sort);
  sort = !sort;
});

function displayBankingDetails(currentAccount) {
  displayMovements(currentAccount);
  calculateAndDisplayBalance(currentAccount);
  calculateAndDisplaySummary(currentAccount);
}
