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
let gameHasStarted;
let gameMode = "normal";
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
  gameHasStarted = true;
  if (checkNameInput()) {
    deactivateMenu();
    showResponsiveGameCanvas();
    showLoadingScreen();
    setTimeout(() => hideSingleContainerById("canvas-option-container"), 3000);
    setTimeout(() => startGameIntervals(), 3000);
    setTimeout(() =>  checkFullscreenMode(), 3000);
    switch (gameMode) {
      case "normal":
        configNormalMode();
        break;

      case "chickenRush":
        configChickenRushMode();
        break;

      case "hard":
        configHardMode();
        break;
    }
  } else {
    playerNameError();
    audio.playSoundClone("menuError");
    addErrorAnimation("start-game-text", "shake-error");
    addErrorAnimation("name-error-text", "shake-error");
  }
}

function screenHeightSmallerThan(high) {
  return window.innerHeight <= high;
}

function showResponsiveGameCanvas(){
  if (screenHeightSmallerThan(830)) {
    let ref = document.getElementById("canvas-wrapper");
        ref.style.display = "block";
        requestAnimationFrame(() => {
          ref.classList.add("canvas-mobile-open")
        })
  }
}

function hideResponsiveGameCanvas(){
    if (screenHeightSmallerThan(830)) {
    let ref = document.getElementById("canvas-wrapper");
    ref.classList.remove("canvas-mobile-open")
    setTimeout(() => ref.style.display = "none", 300);
  }
}

function showLoadingScreen() {
  getTemplateToContent("canvas-option-container", getLoadingSpinnerTemp());
  showSingleContainerById("canvas-option-container");
}

function checkFullscreenMode() {
  if (fullScreen && gameHasStarted) {
    canvas.requestFullscreen();
    canvas.style.backgroundImage = "none";
    // canvas.width = "100%";
    // canvas.style.backgroundColor = "black";
    // canvas.webkitRequestFullscreen();
    // canvas.msRequestFullscreen();
  } else if (fullScreen && !gameHasStarted) {
    document.exitFullscreen();
    canvas.style.backgroundImage = 'url("img/9_intro_outro_screens/start/startscreen_2.png")';
    // canvas.webkitExitFullscreen();
    // canvas.msExitFullscreen();
  }
}

function addErrorAnimation(id, className) {
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

function playAgain() {
  startGame();
  let lostRef = document.getElementById("canvas-lost-container");
  let wonRef = document.getElementById("canvas-won-container");
  lostRef.classList.add("d-none");
  wonRef.classList.add("d-none");
}

function goToMainMenu() {
  let lostRef = document.getElementById("canvas-lost-container");
  let wonRef = document.getElementById("canvas-won-container");
  lostRef.classList.add("d-none");
  wonRef.classList.add("d-none");
}

function resetCanvas() {
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function deactivateMenu() {
  document.body.style.cursor = "none";
  showSingleContainerById("game-mask");
  hideSingleContainerById("canvas-option-container");
  const startBlinkRef = document.getElementById("start-game-text");
  startBlinkRef.classList.remove("start-game-text");
}

function activateMenu() {
  resetCanvas();
  hideSingleContainerById("game-mask");
  hideSingleContainerById("canvas-option-container");
  hideSingleContainerById("canvas-lost-container");
  hideSingleContainerById("canvas-won-container");
  document.getElementById("start-game-text").classList.add("start-game-text");
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
    case "normal":
      {
        ref.innerText = "Hard Mode";
        expRef.innerText = "More chickens, more boss health";
        gameMode = "hard";
        getActiveHighscores();
      }
      break;
    case "hard":
      {
        ref.innerText = "Chicken Rush";
        expRef.innerText = "Endless chickens, no boss";
        gameMode = "chickenRush";
        getActiveHighscores();
      }
      break;
    case "chickenRush":
      {
        ref.innerText = "Normal Mode";
        expRef.innerText = "Collect 10 coins to trigger the boss";
        gameMode = "normal";
        getActiveHighscores();
      }
      break;
  }
}

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

  document
    .querySelectorAll(".opt-wrapper, .sound-wrapper, #player-name-input")
    .forEach((element) => {
      element.addEventListener("click", () => {
        audio.playSoundClone("menuClick");
      });
    });
});

document.addEventListener("click", () => {
  if (!playMusicOnStart) audio.playMusicLoop("menuMusic");
  playMusicOnStart = true;
});


// diffrent color to menu
// if open options menu, darken background, deactivate and set close on click on background

// responsive for all screens
// turn to landscape if in portrait mode
// mobile controlling options

// documenatation


// show overlay onclick
  // story
  // controls
  // sound on/off

// hide overlay on click X in canvas option menu
// hide on click on the same option button

// set zindex for canvas an game points tabel---or hide the left and rigth content --- show highscore in game



// Shorten all functions

// CALL QUESTIONS - ANSWERES
// parallax mode
// Attack animation verkürzen???




// INTERVALLS:

// CHAR
// SOUNDINTERVAL
// ANIMATE INTERVAL
// MOVEINTERVAL
// IDLEINTERVAL

// CLOUD FRAME INTERVALL

// COININTERVAL

// BOSS
// ANIMATEINTERVAL
// endboss dead interval - selfclearing
// MOVEINTERVAL
// JUMPATTACKINTERVAL
// bossattackmovementinterval - selfclearing
// APPLY GRAVITY INTERVALL - BOSS - not clearing
// MOVEDIRECTIONINTERVAL

// ENEMIES
// WALKANIMATIONINTERVAL
// MOVEINTERVAL
// runawayinterval - selclearing

// GAMECONFIG
// normal mode - CHICKENSPAWNINTERVAL
// hard mode - CHICKENSPAWNINTERVAL

// APPLY GRAVITY TO ALL MOVEABLE OBJECTS

// THROWN BOTTLES
// GRAVITY INTERVAL

// WORLD
// ENEMYMOVEDIRECTIONINTERVAL
// CHECKIFGAMEOVERINTERVAL - selfclearing
// COLLISIONINTERVAL
// bottlesplash - self clearing
// UPDATESCOREINTERVAL
// BACKGROUNDMOVEINTERVAL
// CLUCKERINTERVAL
