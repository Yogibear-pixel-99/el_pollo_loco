let canvas;
let world;
let keyboard = new Keyboard();
canvasHeight = 480;
canvasWidth = 720;
floorHeight = 58;

function init() {
  canvas = document.getElementById("gamecanvas");
  getHighscores();
  startGame();
}

function startGame() {
    deactivateMenu();
    let gameMode = document.getElementById("game-mode-txt");
    switch (gameMode.innerText) {
      case "Normal Mode":
        startNormalGame();
        break;

      case "Chicken Rush":
        startChickenRushGame();
        break;

      default:
        break;
    }
}

// function init() {
//   canvas = document.getElementById("gamecanvas");
//   getHighscores();
// }

// function startGame() {
//   if (checkNameInput()) {
//     deactivateMenu();
//     let gameMode = document.getElementById("game-mode-txt");
//     switch (gameMode.innerText) {
//       case "Normal Mode":
//         startNormalGame();
//         break;

//       case "Chicken Rush":
//         startChickenRushGame();
//         break;

//       default:
//         break;
//     }
//   } else {
//     playerNameError();
//   }
// }

function checkNameInput() {
  const nameInput = document.getElementById("player-name-input");
  return nameInput.value.trim() !== "";
}

function playerNameError() {
  const nameInput = document.getElementById("player-name-input");
  const errorTextRef = document.getElementById("name-error-text");
  nameInput.placeholder.color = "red";
  nameInput.classList.add("error-blink");
  errorTextRef.innerText = "Enter your name!";
}

function removeNameError() {
  removeClass("player-name-input", "error-blink");
  removeErrorMessage("name-error-text");
}

function removeClass(id, className) {
  const ref = document.getElementById(id);
  ref.classList.remove(className);
}

function removeErrorMessage(id) {
  const ref = document.getElementById(id);
  ref.innerText = "";
}

function startNormalGame() {
  canvas = document.getElementById("gamecanvas");
  world = new World(
    canvas,
    keyboard,
    pointConfig,
    canvasHeight,
    canvasWidth,
    floorHeight
  );
}

function startChickenRush() {}

function deactivateMenu() {
  // document.body.style.cursor = 'none';
  showSingleContainerById("game-mask");
  hideSingleContainerById("canvas-option-container");
  const startBlinkRef = document.getElementById("start-game-text");
  startBlinkRef.classList.remove("start-game-text");
}

function activateMenu() {
  // document.body.style.cursor = 'default';
  hideSingleContainerById("game-mask");
  showSingleContainerById("canvas-option-container");
  const startBlinkRef = document.getElementById("start-game-text");
  startBlinkRef.classList.add("start-game-text");
}

async function getHighscores() {
  await fetchHighscores();
  sortHighscores();
  // get high von api
  // wenn leer füge template ein.
  renderHighscores("normal");
  renderGamePointsTable();
  // bei spielende namen und highscore passend ins object einfügen.
  // object in die database - PUT
  // neu im HTML rendern.
}

// async function getHighscoreFromApi() {
//   try {
//     let response = await fetch(MAIN_URL + '.json');
//     if (!response.ok) {
//       throw new Error();
//     } else {
//       let data = await response.json();
//       if (data) {
//         highscores = Object.values(data);
//       }
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

function sortHighscores() {
  highscores.normal.sort((a, b) => b.score - a.score);
  highscores.chickenrush.sort((a, b) => b.score - a.score);
  console.log(highscores);
}

function renderHighscores(scorename) {
  let ref = document.getElementById("highscore");
  let data = "";
  for (
    let index = 0;
    index < highscores[scorename].length && index <= 30;
    index++
  ) {
    const element = highscores[scorename][index];
    data += highscoreTemp(element);
  }
  ref.innerHTML = data;
}

function renderGamePointsTable() {
  let ref = document.getElementById("game-points-table");
  let data = "";
  Object.entries(pointConfig).forEach((element) => {
    data += getPointsTemp(element);
  });
  ref.innerHTML = data;
}

function changeGameMode() {
  changeGameModeHeaderText();
  changeGameModeHighscoreTable();
}

function changeGameModeHeaderText() {
  let ref = document.getElementById("game-mode-txt");
  let expRef = document.getElementById("game-mode-exp");
  if (ref.innerText === "Normal Mode") {
    ref.innerText = "Chicken Rush";
    expRef.innerText = "Endless chicken, unlimited bottles, no jumpkill";
  } else {
    ref.innerText = "Normal Mode";
    expRef.innerText = "Standard Level";
  }
}

function changeGameModeHighscoreTable() {
  let ref = document.getElementById("game-mode-txt");
  if (ref.innerText === "Normal Mode") {
    renderHighscores('normal');
  } else {
    renderHighscores('chickenrush');
  }
}

const pointConfig = {
  chickenJumpKill: {
    name: "chicken jump",
    points: 10,
  },
  chickenBottleHit: {
    name: "chicken bottle hit",
    points: 20,
  },
  miniChickenJumpKill: {
    name: "mini chicken jump",
    points: 30,
  },
  miniChickenBottleHit: {
    name: "mini chicken bottle hit",
    points: 40,
  },
  collectCoin: {
    name: "collect coin",
    points: 10,
  },
  collectBottle: {
    name: "collect bottle",
    points: 5,
  },
  bottleMissed: {
    name: "bottle missed",
    points: -50,
  },
  endbossBottleHit: {
    name: "endboss hit",
    points: 50,
  },
  endbossKilled: {
    name: "endboss killed",
    points: 200,
  },
};

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowRight":
      keyboard.KEY_RIGHT = true;

      break;
    case "ArrowLeft":
      keyboard.KEY_LEFT = true;

      break;
    case "ArrowUp":
      keyboard.KEY_UP = true;

      break;
    case "ArrowDown":
      keyboard.KEY_DOWN = true;

      break;
    case " ":
      keyboard.KEY_JUMP = true;

      break;
    case "Control":
      keyboard.KEY_SHOT = true;

      break;
    case "Alt":
      keyboard.KEY_SHOT = true;

      break;

    default:
      break;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "ArrowRight":
      keyboard.KEY_RIGHT = false;

      break;
    case "ArrowLeft":
      keyboard.KEY_LEFT = false;

      break;
    case "ArrowUp":
      keyboard.KEY_UP = false;

      break;
    case "ArrowDown":
      keyboard.KEY_DOWN = false;

      break;
    case " ":
      keyboard.KEY_SPACE = false;

      break;
    case "Control":
      keyboard.KEY_SHOT = false;

      break;
    case "Alt":
      keyboard.KEY_SHOT = false;

      break;

    default:
      break;
  }
});



document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("mousedown", () => {
    document.body.style.cursor = "url('./img/cursor-active.png'), auto";
  });
  document.addEventListener("mouseup", () => {
    document.body.style.cursor = "url('./img/cursor.png'), auto";
  });
});






// SOUNDS FOR:
    // Pepe walking
    // pepe jumping
    // pepe throwing
    // pepe jumps on chicken
    // pepe is idle
    // pepe is sleeping snorring
    // pepe collects a coin
    // pepe collects a bottle
    // bottle is broken
    // wind is blowing


    // chicken cluckern
    // minichicken cluckern
    // loud cry for chicken if they are running back
    // chicken is killed

    // boss is walking
    // boss is attacking
    // boss gehts hittet
    // boss is killed

    // music for the menu
    // music for chickenrush


// 

// set boss back and bottle to not infinite and boss energy to 100 and collect coins to 10

// Gameend - boss right pic and call gameend screen

// set coin collision to 10 after boss animation

// rewrite the boss bottle hit function

// chars should not move until the game starts

// clear oll hitbos draw functions

// implement normal/hard/chickenrush mode


// display info to collect 10 coins to trigger boss

// game over screen
  // lost
  // win
  // update scoreboard after end game
  // restart button or display menu
// endboss - should move to pepe if jumps over him
// trigger final screen
// soundeffects
// music
// enemy bottle hit auslagern in enemies von world
// chickenrush

// update canvasWidth and canvasheight to global variable
  // change this in level for coins and emenies and backgrounds

// splice more than 30 entries


// start game
// game end
// save name and score in object
// put data to api
// render new highscoretable from api inkl sort etc.

// responsive for all screens
// turn to landscape if in portrait mode
// mobile controlling options

// documenatation

// close icon licenc