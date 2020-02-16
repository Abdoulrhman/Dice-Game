/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, diceDom, gamePlaying, prevDice1;
let rollDiceBtn = document.querySelector(".btn-roll");
let holdDiceBtn = document.querySelector(".btn-hold");
let holdNewBtn = document.querySelector(".btn-new");
initGame();

rollDiceBtn.addEventListener("click", () => {
  if (gamePlaying) {
    // Add random number
    let dice = Math.floor(Math.random() * 6) + 1;
    let dice2 = Math.floor(Math.random() * 6) + 1;

    //check if prviosdice = dice = 6
    if ((dice === prevDice1) === 6) {
      // here we go
      nextPlayer();
    }
    //Display the dice image
    diceDom.style.display = "block";
    diceDom2.style.display = "block";
    diceDom.src = `images/dice-${dice}.png`;
    diceDom2.src = `images/dice-${dice2}.png`;

    // change the player if reached one
    if (dice !== 1 && dice2 !== 1) {
      roundScore += dice + dice2;
      document.getElementById(
        `current-${activePlayer}`
      ).textContent = roundScore;
    } else {
      //next palyer
      nextPlayer();
    }

    /*  if (dice === 6 && prevDice1 === 6) {
      //Player looses score
      scores[activePlayer] = 0;
      document.querySelector("#score-" + activePlayer).textContent = "0";
      nextPlayer();
    } else if (dice !== 1) {
      //Add score
      roundScore += dice;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      //Next player
      nextPlayer();
    }
    prevDice1 = dice;
    console.log(prevDice1);
    */
  }
});

holdDiceBtn.addEventListener("click", () => {
  if (gamePlaying) {
    scores[activePlayer] += roundScore;
    document.getElementById("score-" + activePlayer).innerHTML =
      scores[activePlayer];

    let input = document.querySelector(".input-score").value;
    let winningScore;

    // Undefined, 0, null or "" are COERCED to false
    // Anything else is COERCED to true
    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }
    console.log(scores[activePlayer]);

    if (scores[activePlayer] >= winningScore) {
      gamePlaying = false;
      document.querySelector(`#name-${activePlayer}`).textContent = "WINNER !";
      diceDom.style.display = "none";
      diceDom2.style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
    } else {
      nextPlayer();
    }
  }
});

holdNewBtn.addEventListener("click", initGame);

function initGame() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  diceDom = document.querySelector(".dice");
  diceDom2 = document.querySelector(".dice2");
  diceDom.style.display = "none";
  diceDom2.style.display = "none";
  document.getElementById("current-0").textContent = 0;
  document.getElementById("current-1").textContent = 0;
  document.getElementById("score-0").textContent = 0;
  document.getElementById("score-1").textContent = 0;
  document.querySelector(`#name-0`).textContent = "Player 1 ";
  document.querySelector(`#name-1`).textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}

function nextPlayer() {
  //document.getElementById(`current-${activePlayer}`).textContent = 0;
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  diceDom.style.display = "none";
  diceDom2.style.display = "none";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
}
/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/
