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
let gameHasStarted = false;
let gamePaused = false;
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
  checkScreensizeForFixFullscreen();
}

function startGame() {
  hideCursor();
  gameHasStarted = true;
  if (checkNameInput()) {
    deactivateMenu();
    showSingleContainerById("mobile-buttons-wrapper");
    checkScoreBoardAppearance();
    showResponsiveGameCanvas();
    showLoadingScreen();
    setTimeout(() => hideSingleContainerById("canvas-option-container"), 3000);
    setTimeout(() => startGameIntervals(), 3000);
    checkFullscreenMode();
    document.getElementById("player-score").innerText = "0";
    // setTimeout(() => checkFullscreenMode(), 3000);
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

function checkScoreBoardAppearance() {
  if (screenWidthSmallerThan(1300) || screenHeightSmallerThan(830)) {
    document.getElementById("right-content").style.zIndex = "0";
  } else {
    document.getElementById("right-content").style.zIndex = "100";
  }
}

function showLoadingScreen() {
  getTemplateToContent("canvas-option-container", getLoadingSpinnerTemp());
  showSingleContainerById("canvas-option-container");
}

function checkFullscreenMode() {
  if (fullScreen && gameHasStarted) {
    showFullscreen();
  } else if (fullScreen && !gameHasStarted) {
    hideFullscreen();
  }
}

function gameStartFalse() {
  gameHasStarted = false;
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
  hideWonLostPauseScreens();
  resetCanvas();
  startGame();
}

function hideWonLostPauseScreens() {
  let lostRef = document.getElementById("canvas-lost-container");
  let wonRef = document.getElementById("canvas-won-container");
  let pauseRef = document.getElementById("canvas-pause-container");
  lostRef.classList.add("d-none");
  wonRef.classList.add("d-none");
  pauseRef.classList.add("d-none");
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
  // hideCursor();
  showSingleContainerById("game-mask");
  hideSingleContainerById("canvas-option-container");
  const startBlinkRef = document.getElementById("start-game-text");
  startBlinkRef.classList.remove("start-game-text");
}

function activateMenu() {
  // if (fullScreen) {
  //   hideFullscreen();
  // }
  resetCanvas();
  hideResponsiveGameCanvas();
  hideSingleContainerById("game-mask");
  // hideSingleContainerById("canvas-option-container");
  hideSingleContainerById("canvas-lost-container");
  hideSingleContainerById("canvas-won-container");
  hideSingleContainerById("canvas-pause-container");
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

document.addEventListener("keyup", (event) => {
  if (
    (gameHasStarted && event.key === "p") ||
    event.key === "P" ||
    event.key === "Escape"
  ) {
    gamePaused ? resumeGame() : pauseGame();
  }
});

window.addEventListener("fullscreenchange", () => {
  if (document.fullscreenElement) {
    resizeDisplay();
    resizeMobileButtons();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("mousedown", () => {
    showActiveCursor();
  });
  document.addEventListener("mouseup", () => {
    showCursor();
  });

  document
    .querySelectorAll(
      ".opt-wrapper, .sound-wrapper, .open-points-table, .open-highscore, #player-name-input, .impressum-link"
    )
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

function gameOver() {
  if (!gamePaused) {
    saveScore();
  }
  hideSingleContainerById("mobile-buttons-wrapper");
  world.stopAllGameIntervals();
  stopGameMusic();
  checkFullscreenMode();
  showCursor();
  if (gamePaused) {
    gamePaused = false;
    return;
  }
  document.getElementById("right-content").style.zIndex = "150";
  playEndAudio();
  if (world.checkGameEnd()) {
    showGameOverScreen();
  }
}

function stopGameMusic() {
  audio.pauseMusic("chickenRushMusic");
  audio.pauseMusic("normalModeMusic");
  audio.pauseSound("cluckern");
  audio.pauseSound("gameAmbience");
}

function playEndAudio() {
  if (world.gameWon) {
    audio.playSound("gameWon");
  } else {
    console.trace();
    audio.playSound("gameLost");
  }
}

function showGameOverScreen() {
  world.gameWon
    ? showSingleContainerById("canvas-won-container")
    : showSingleContainerById("canvas-lost-container");
}

// sort all the variables in the classes and group them

// fix fullscreen bug, if tab is changed and back.

// check fullscreen in all browsere --- SAFARI IS MISSING and IPHONE OS
// check scrollbars in all browseres and container


// documentation

// Shorten all functions