"use strict";

//Selecting elements of the DOM
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

//starting conditions:
let scores, currentScore, activePlayer, playing;

//It has to be outside the function because I want to keep the value actual. If it goes inside the handler function, it will be set 0 each time that the user click the button. thats why it need to be outside.

//
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

//Rolling dice functionality:
btnRoll.addEventListener("click", function () {
  //1. Generating a random dice roll.
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2. Display the dice.
    diceEl.classList.remove("hidden");
    diceEl.src = `./images/dice-${dice}.png`;
    console.log(dice);
    //3. Check for rolled 1: if true,
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to the next player.
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    //1. add current score to active player's score
    scores[activePlayer] += currentScore;
    console.log(scores[activePlayer]);
    //scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. Check if player's score is >=100 (at least 100) if so --> finish the game /if no,

    if (scores[activePlayer] >= 50) {
      //finish the game
      diceEl.classList.add("hidden");
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      //Si el jugador activo gana el juego (el juego ha acabado), no queremos 'switch the player', pero si eso no acontece, ahí queremos que cambie el jugador
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
