"use strict";

///////////////////////////////////////
const game = {
  team1: "Bayern Munich",
  team2: "Borrussia Dortmund",
  players: [
    [
      "Neuer",
      "Pavard",
      "Martinez",
      "Alaba",
      "Davies",
      "Kimmich",
      "Goretzka",
      "Coman",
      "Muller",
      "Gnarby",
      "Lewandowski",
    ],
    [
      "Burki",
      "Schulz",
      "Hummels",
      "Akanji",
      "Hakimi",
      "Weigl",
      "Witsel",
      "Hazard",
      "Brandt",
      "Sancho",
      "Gotze",
    ],
  ],
  score: "4:0",
  scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
  date: "Nov 9th, 2037",
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// Coding Challenge #1

/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀
*/

// Challenge 1
const [players1, players2] = game.players;
const [gk, ...fieldPlayers] = players1;
const allPlayers = [...players1, ...players2];
const players1Final = [...players1, "Thiago", "Coutinho", "Perisic"];
const { team1, x: draw, team2 } = game.odds;

function printGoals(...players) {
  let nameAndScoreMap = new Map();

  for (let i = 0; i < players.length; i++) {
    if (nameAndScoreMap.has(players[i])) {
      let score = nameAndScoreMap.get(players[i]);
      nameAndScoreMap.set(players[i], ++score);
    } else {
      nameAndScoreMap.set(players[i], 1);
    }
  }

  for (const [key, value] of nameAndScoreMap.entries()) {
    console.log(key + " scored " + value);
  }
}

team1 < team2 && console.log(`The winning team is team1`);
team1 > team2 && console.log(`The winning team is team2`);

// Test function
printGoals(...game.scored);
// printGoals("Davies", "Muller", "Lewandowski", "Kimmich");

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/

// 1
for (const [indexOfGoal, playerName] of game.scored.entries()) {
  console.log(`Goal ${indexOfGoal + 1} : ${playerName}`);
}

// 2
function calculateAverageOdd() {
  let sum = 0;
  for (const odd of Object.values(game.odds)) {
    sum += odd;
  }
  return sum / Object.values(game.odds).length;
}

console.log(calculateAverageOdd());

// 3
function printOdds() {
  const oddEntries = Object.entries(game.odds);

  for (const [key, odd] of oddEntries) {
    let printStr = "Odd of ";

    printStr += key === "x" ? `draw: ${odd}` : `victory ${game[key]}: ${odd}`;

    console.log(printStr);
  }
}

printOdds();

// BONUS
function buildScorers() {
  let scorers = {};
  for (const scorer of game.scored) {
    scorers[scorer] ? scorers[scorer]++ : (scorers[scorer] = 1);
  }
  return scorers;
}

console.log(buildScorers());

///////////////////////////////////////
// Coding Challenge #3

/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/

const gameEvents = new Map([
  [17, "⚽️ GOAL"],
  [36, "🔁 Substitution"],
  [47, "⚽️ GOAL"],
  [61, "🔁 Substitution"],
  [64, "🔶 Yellow card"],
  [69, "🔴 Red card"],
  [70, "🔁 Substitution"],
  [72, "🔁 Substitution"],
  [76, "⚽️ GOAL"],
  [80, "⚽️ GOAL"],
  [92, "🔶 Yellow card"],
]);

// 1
const events = [...new Set(gameEvents.values())];
console.log(events);

// 2
gameEvents.delete(64);

// 3
const calculateAverageEventInterval = function () {
  let numberOfEvents = 0;
  for (const key of gameEvents.keys()) {
    key > 90 || numberOfEvents++;
  }

  console.log(
    `An event happened, on average, every ${90 / numberOfEvents} minutes`
  );
};

calculateAverageEventInterval();

// 4
const markEvent = function () {
  for (const [time, event] of gameEvents) {
    console.log(`[${time > 45 ? "SECOND" : "FIRST"} HALF] ${time}: ${event}`);
  }
};

markEvent();

///////////////////////////////////////
// Coding Challenge #4

/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/

document.body.append(document.createElement("textarea"));
document.body.append(document.createElement("button"));

document.querySelector("button").addEventListener("click", function () {
  const text = document.querySelector("textarea").value;
  const words = text.split("\n");

  for (const [i, word] of words.entries()) {
    const subWords = word.trim().split("_");
    let newWord = "";
    for (const subWord of subWords) {
      newWord += subWord[0].toUpperCase() + subWord.toLowerCase().slice(1);
    }
    console.log(
      `${(newWord[0].toLowerCase() + newWord.slice(1)).padEnd(
        20,
        " "
      )}${"✅".repeat(i + 1)}`
    );
  }
});
