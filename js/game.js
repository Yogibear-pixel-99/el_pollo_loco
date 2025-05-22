let canvas;
let world;
let keyboard = new Keyboard();
let audio = new Audiofiles();
let sfxVolume;
let musicVolume;
let sfxMute;
let musicMute;
let canvasHeight = 480;
let canvasWidth = 720;
let floorHeight = 58;
let playMusicOnStart = false;
let fullScreen = false;
let gameMode = 'normal';
const MAIN_URL =
  "https://el-pollo-loco-79444-default-rtdb.europe-west1.firebasedatabase.app/";

let highscores = {};


function init() {
  canvas = document.getElementById("gamecanvas");
  getSoundSettings();
  assignSoundSettings();
  getActiveHighscores();
   renderGamePointsTable();
}

function startGame() {
  if (checkNameInput()) {
    deactivateMenu();
    switch (gameMode) {
      case "normal":
        startNormalGame();
        break;

      case "chickenRush":
        startChickenRushGame();
        break;

      case "hard":
        startHardGame();
        break;
    }
  } else {
    playerNameError();
    audio.playSound('menuError');
    addErrorAnimation('start-game-text', 'shake-error');
    addErrorAnimation('name-error-text', 'shake-error');
  }
}

function addErrorAnimation(id, className){
  let ref = document.getElementById(id);
      ref.classList.add(className);
  setTimeout(() => ref.classList.remove(className), 1000);
}

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

function playAgain(){
  resetGame();
  startGame();
  let lostRef = document.getElementById('canvas-lost-container');
  let wonRef = document.getElementById('canvas-won-container');
      lostRef.classList.add('d-none');
      wonRef.classList.add('d-none');
}

function goToMainMenu(){
  let lostRef = document.getElementById('canvas-lost-container');
  let wonRef = document.getElementById('canvas-won-container');
      lostRef.classList.add('d-none');
      wonRef.classList.add('d-none');
}

function resetGame(){
  world = '';
  level1 = '';
}

function startNormalGame() {
  // canvas = document.getElementById("gamecanvas");
  initNormalLevel();
  world = new World(
    canvas,
    keyboard,
    pointConfig,
    audio
  );
}

function startChickenRush() {
    // canvas = document.getElementById("gamecanvas");
  initChickenRushLevel();
  world = new World(
    canvas,
    keyboard,
    pointConfig,
    audio
  );
  configChickenRushMode();
}

function deactivateMenu() {
  document.body.style.cursor = 'none';
  showSingleContainerById("game-mask");
  hideSingleContainerById("canvas-option-container");
  const startBlinkRef = document.getElementById("start-game-text");
  startBlinkRef.classList.remove("start-game-text");
}

function activateMenu() {
  hideSingleContainerById("game-mask");
  showSingleContainerById("canvas-option-container");
    hideSingleContainerById("canvas-lost-container");
  hideSingleContainerById("canvas-won-container");
  cancelAnimationFrame(world.drawInterval);
  let ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  // canvas.style.backgroundImage = 'url("img/9_intro_outro_screens/start/startscreen_2.png")';
  const startBlinkRef = document.getElementById("start-game-text");
  startBlinkRef.classList.add("start-game-text");
}








function renderGamePointsTable() {
  let ref = document.getElementById("game-points-table");
  let data = "";
  Object.entries(pointConfig).forEach((element) => {
    data += getPointsTemp(element);
  });
  ref.innerHTML = data;
}


function toggleGameMode() {
    let ref = document.getElementById("game-mode-txt");
  let expRef = document.getElementById("game-mode-exp");
  switch (gameMode) {
    case 'normal': {
      ref.innerText = 'Hard Mode';
      expRef.innerText = 'more Chickens, more Bosslife';
      gameMode = 'hard';
      getActiveHighscores();
    }
      break;
    case 'hard': {
      ref.innerText = 'Chicken Rush';
      expRef.innerText = 'endless Chickens, no Boss';
      gameMode = 'chickenRush';
       getActiveHighscores();
    }
      break;
    case 'chickenRush': {
      ref.innerText = 'Normal Mode';
      expRef.innerText = 'Standard Level';
      gameMode = 'normal';
       getActiveHighscores();
    }
      break;
  
  }
}


// function changeGameModeHeaderText() {
//   let ref = document.getElementById("game-mode-txt");
//   let expRef = document.getElementById("game-mode-exp");
//   if (ref.innerText === "Normal Mode") {
//     ref.innerText = "Chicken Rush";
//     expRef.innerText = "Endless chicken, unlimited bottles";
//   } else {
//     ref.innerText = "Normal Mode";
//     expRef.innerText = "Standard Level";
//   }
// }

// function changeGameModeHighscoreTable() {
//   let ref = document.getElementById("game-mode-txt");
//   if (ref.innerText === "Normal Mode") {
//     renderHighscores('normal');
//   } else {
//     renderHighscores('chickenrush');
//   }
// }

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

  document.querySelectorAll('.opt-wrapper, .sound-wrapper, #player-name-input').forEach((element) => {
    element.addEventListener('click', () => {

      audio.playSound('menuClick');
    })
  })
});

document.addEventListener('click', () => {
  if (!playMusicOnStart)
  audio.playMusicOnce('menuMusic');
  playMusicOnStart = true;
})



// SOUNDS FOR:

    // loud cry for chicken if they are running back
    // music for chickenrush



// set boss back and bottle to not infinite and boss energy to 100 and collect coins to 10
// set coin collision to 10 after boss animation




// implement normal/hard/chickenrush mode

// pepe dont show animation if throw bottle

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

// Boss kill animation not smooth
// parallax is not workin
// bottle throw is not normal triggerd
// adding random spawn point

// controll all intervals!!!! and stop them after game finished.
// change the splice array method for scores to 100 from 10