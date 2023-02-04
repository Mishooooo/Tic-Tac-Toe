"use strict";
const placeHolder = document.querySelectorAll(".place_holder");
const hideMain = document.querySelector("main");
const hideLobby = document.querySelector(".lobby");
const whoWins = document.querySelector(".who_wins");
const whoWon = document.getElementById("who_won");
const quitBtn = document.querySelector(".quit");
const body = document.querySelector("body");
const nextRound = document.querySelector(".next_round");
const restartBtn = document.querySelector(".restart");
const whoseTurn = document.querySelector(".whose_turn img");
const restartPop = document.querySelector(".restart_pop");
const player1 = document.querySelector(`.player_1`);
const player2 = document.querySelector(`.player_2`);
const computer = document.querySelector(".computer");
const friendly = document.querySelector(".friendly");
const cover = document.querySelector(`.cover`);

hideMain.style.display = "none";
whoWins.style.display = "none";

let placeHolderArrX = ["", "", "", "", "", "", "", "", ""];
let placeHolderArrO = ["", "", "", "", "", "", "", "", ""];
let winningArr = [
  [1, 2, 3],
  [1, 5, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [3, 5, 7],
  [4, 5, 6],
  [7, 8, 9],
];

let activePlayer = 0;

const showWhoWins = function (displayBlock) {
  displayBlock.style.display = "block";

  hideMain.style.opacity = "0.3";
  body.style.background = "#000000";
};

let tieIndicator = 0;
let scoreXIndicator = 0;
let scoreOIndicator = 0;

let vsPlayer;
let vsComputer;

friendly.addEventListener("click", () => {
  hideMain.style.display = "block";
  hideLobby.style.display = "none";
  vsPlayer = true;
  document.querySelector(`#x_score_label`).textContent = `X (P2)`;
  document.querySelector(`#o_score_label`).textContent = `O (P1)`;
});

let player1or2 = 1;
const random1To9Fun = () => Math.floor(Math.random() * 9) + 1;
let random1To9 = random1To9Fun();

computer.addEventListener("click", () => {
  hideMain.style.display = "block";
  hideLobby.style.display = "none";
  vsComputer = true;

  document.querySelector(`#x_score_label`).textContent =
    player1or2 === 1 ? `X (YOU)` : `O (CPU)`;
  document.querySelector(`#o_score_label`).textContent =
    player1or2 === 1 ? `O (CPU)` : `O (YOU)`;

  if (player1or2 === 2) {
    placeHolder[random1To9 - 1].insertAdjacentHTML("afterbegin", xIcon);
    placeHolderArrX.push(random1To9);
    whoseTurn.src = "./assets/icon-o.svg";
  }
});

const marked_x = document.querySelector(`.marked_x`);
const marked_o = document.querySelector(`.marked_o`);
marked_x.classList.add("marked_xo");

marked_o.addEventListener("click", () => {
  player1or2 = 2;
  marked_o.classList.add("marked_xo");
  marked_x.classList.remove("marked_xo");
  player1.textContent = player1or2 == 1 ? "1" : "2";
  player2.textContent = player1or2 == 2 ? "1" : "2";
});

marked_x.addEventListener("click", () => {
  marked_x.classList.add("marked_xo");
  marked_o.classList.remove("marked_xo");
  player1or2 = 1;
});

let removeNumsArr = [];
let randomNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let validRandomNums;
let randomNum;

const oIcon = `<img src="./assets/icon-o.svg" alt="O Icon">`;
const xIcon = `<img src="./assets/icon-x.svg" alt="X Icon">`;

for (let i = 1; i <= 9; i++) {
  let markedX = false;
  let markedO = false;

  placeHolder[i - 1].addEventListener("click", function () {
    if (
      vsComputer &&
      !placeHolderArrO.includes(i) &&
      !placeHolderArrX.includes(i)
    ) {
      removeNumsArr.push(i);
      removeNumsArr.push(random1To9);

      validRandomNums = randomNumber.filter(function (e) {
        return this.indexOf(e) < 0;
      }, removeNumsArr);

      randomNum = Math.floor(Math.random() * validRandomNums.length);
      removeNumsArr.push(validRandomNums[randomNum]);

      placeHolder[i - 1].insertAdjacentHTML(
        "afterbegin",
        player1or2 == 1 ? xIcon : oIcon
      );

      if (validRandomNums.length !== 0)
        setTimeout(
          () =>
            placeHolder[validRandomNums[randomNum] - 1].insertAdjacentHTML(
              "afterbegin",
              player1or2 == 1 ? oIcon : xIcon
            ),
          150
        );

      placeHolderArrX[i - 1] = player1or2 == 1 ? i : validRandomNums[randomNum];
      placeHolderArrO[i - 1] = player1or2 == 1 ? validRandomNums[randomNum] : i;

      whoseTurn.src =
        player1or2 === 1 ? "./assets/icon-o.svg" : "./assets/icon-x.svg";
      setTimeout(
        () =>
          (whoseTurn.src =
            player1or2 === 1 ? "./assets/icon-x.svg" : "./assets/icon-o.svg"),
        150
      );
    }

    if (vsPlayer) {
      if (activePlayer === 0 && !markedO && placeHolderArrX[i - 1] !== i) {
        placeHolder[i - 1].insertAdjacentHTML("afterbegin", xIcon);
        placeHolderArrX[i - 1] = i;

        markedX = i;
        activePlayer = 1;
      } else if (
        activePlayer === 1 &&
        !markedX &&
        placeHolderArrO[i - 1] !== i
      ) {
        placeHolder[i - 1].insertAdjacentHTML("afterbegin", oIcon);

        placeHolderArrO[i - 1] = i;
        markedO = i;
        activePlayer = 0;
      }

      whoseTurn.src =
        activePlayer === 0 ? "./assets/icon-x.svg" : "./assets/icon-o.svg";
    }

    function whoWonGame(whowonInnerHTML) {
      whoWon.innerHTML = "";
      whoWon.insertAdjacentHTML("afterbegin", whowonInnerHTML);
      cover.classList.add(`cover1`);
    }

    let tie = placeHolderArrO
      .concat(placeHolderArrX)
      .filter((int) => {
        return typeof int === "number";
      })
      .reduce((acc, cur) => {
        return (acc += cur);
      }, 0);

    const win = (playerArray, color, marked_xo) => {
      for (let index = 0; index < winningArr.length; index++) {
        let count = 0;
        for (let j = 0; j < winningArr[index].length; j++)
          if (playerArray.includes(winningArr[index][j])) count++;

        if (count === 3) {
          setTimeout(() => {
            winningArr[index].forEach((val) => {
              placeHolder[val - 1].style.background = color;
              placeHolder[val - 1].classList.add(marked_xo);
            });
          }, 150);

          return true;
        }
      }
      return false;
    };

    let winX;
    let winO = win(placeHolderArrO);

    winX =
      winO && player1or2 === 2
        ? false
        : win(placeHolderArrX, "#31C3BD", "marked_xo");

    winO = winX ? false : win(placeHolderArrO, "#F2B137", "marked_xo");

    let oneOrTwo;

    const notPushInArr = (el) =>
      el.splice(
        el.findIndex((ind) => ind === validRandomNums[randomNum]),
        1
      );
    if (vsPlayer) {
      oneOrTwo = activePlayer === 1 ? "PLAYER 1 WINS!" : "PLAYER 2 WINS!";
    } else if (vsComputer) {
      if (winO) {
        oneOrTwo = player1or2 === 2 ? "YOU WON!" : "OH NO, YOU LOST...";
        notPushInArr(placeHolderArrX);
      } else if (winX) {
        oneOrTwo = player1or2 === 1 ? "YOU WON!" : "OH NO, YOU LOST...";
        notPushInArr(placeHolderArrO);
      }
    }

    if (winX || winO) {
      tie = 0;

      if (
        vsComputer &&
        validRandomNums.length !== 0 &&
        (player1or2 == 1 ? winX : winO)
      )
        setTimeout(
          () => (placeHolder[validRandomNums[randomNum] - 1].innerHTML = ""),
          150
        );

      setTimeout(() => showWhoWins(whoWins), 1200);

      whoWonGame(`<div><h2>${oneOrTwo} </h2></div>
  <div>  <h1><img src=${
    winX ? "./assets/icon-x.svg" : "./assets/icon-o.svg"
  } alt="XO icon"> TAKES THE ROUND</h1></div>`);

      winX ? scoreXIndicator++ : scoreOIndicator++;

      document.querySelector(`.XorOscored${winX ? 1 : 0}`).textContent = winX
        ? scoreXIndicator
        : scoreOIndicator;
    }

    if (tie === 45) {
      setTimeout(() => showWhoWins(whoWins), 1000);
      whoWonGame(`<div>  <h2 class ='game_tied'> ROUND TIED</h2></div>`);

      tieIndicator++;
      document.querySelector(`#tie_score`).textContent = tieIndicator;
    }
  });

  const changeToOutline = function () {
    let xoOutline;
    if (vsComputer) {
      xoOutline = player1or2 == 1 ? "x" : "o";
    } else if (vsPlayer) {
      xoOutline = activePlayer === 0 ? "x" : "o";
    }

    if (!placeHolderArrO.includes(i) && !placeHolderArrX.includes(i))
      return placeHolder[i - 1].insertAdjacentHTML(
        "afterbegin",
        `<img src="./assets/icon-${xoOutline}-outline.svg" alt="O Icon">`
      );
  };

  const clearPlaceholder = function () {
    if (!placeHolderArrO.includes(i) && !placeHolderArrX.includes(i))
      return (placeHolder[i - 1].innerHTML = "");
  };
  placeHolder[i - 1].addEventListener("mouseover", changeToOutline);
  placeHolder[i - 1].addEventListener("mouseleave", clearPlaceholder);

  const restartScores = function () {
    document.querySelector(`.XorOscored1`).textContent = 0;
    document.querySelector(`.XorOscored0`).textContent = 0;
    document.querySelector("#tie_score").textContent = 0;
    tieIndicator = 0;
    scoreXIndicator = 0;
    scoreOIndicator = 0;
  };

  const restart = function () {
    activePlayer = 0;
    removeNumsArr = [];
    markedO = false;
    markedX = false;

    whoseTurn.src = "./assets/icon-x.svg";
    restartPop.style.display = "none";
    hideMain.style.display = "block";
    whoWins.style.display = "none";

    hideMain.style.opacity = "1";

    body.style.background = "#1a2a33";

    cover.classList.remove("cover1");

    for (let index = 0; index < 9; index++) {
      placeHolder[index].style.backgroundColor = "#1F3641";
      placeHolder[index].innerHTML = ``;
      placeHolder[index].classList.remove("marked_xo");
    }

    placeHolderArrO = ["", "", "", "", "", "", "", "", ""];
    placeHolderArrX = ["", "", "", "", "", "", "", "", ""];
  };

  nextRound.addEventListener("click", function () {
    restart();

    if (vsComputer && player1or2 === 2) {
      random1To9 = random1To9Fun();
      placeHolder[random1To9 - 1].insertAdjacentHTML("afterbegin", xIcon);
      placeHolderArrX.push(random1To9);
    }

    if (vsComputer && player1or2 == 2) whoseTurn.src = "./assets/icon-o.svg";
  });

  quitBtn.addEventListener("click", function () {
    restart();
    restartScores();
    hideMain.style.display = "none";
    hideLobby.style.display = "block";
    marked_x.classList.add("marked_xo");
    marked_o.classList.remove("marked_xo");
    player1or2 = 1;
    player1.textContent = 1;
    player2.textContent = 2;
    vsComputer = false;
    vsPlayer = false;
  });

  restartBtn.addEventListener("click", () => {
    cover.classList.add(`cover1`);
    showWhoWins(restartPop);
  });

  document.querySelector(".yes_rest").addEventListener("click", () => {
    restart();
    restartScores();
  });

  document.querySelector(".no_quit").addEventListener("click", () => {
    restartPop.style.display = "none";
    hideMain.style.display = "block";
    hideMain.style.opacity = "1";
    body.style.background = "#1a2a33";
    cover.classList.remove(`cover1`);
  });
}
































