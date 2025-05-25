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
  gameHasStarted = true;
  if (checkNameInput()) {
    deactivateMenu();
    checkFullscreenMode();
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
    audio.playSound('menuError');
    addErrorAnimation('start-game-text', 'shake-error');
    addErrorAnimation('name-error-text', 'shake-error');
  }
}

function checkFullscreenMode(){
  if (fullScreen && gameHasStarted) {
    canvas.requestFullscreen();
    // canvas.webkitRequestFullscreen();
    // canvas.msRequestFullscreen();
  }
   else if (fullScreen && !gameHasStarted) {
    document.exitFullscreen();
    // canvas.webkitExitFullscreen();
    // canvas.msExitFullscreen();
  }
};

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

function resetCanvas(){
  let ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function deactivateMenu() {
  document.body.style.cursor = 'none';
  showSingleContainerById("game-mask");
  hideSingleContainerById("canvas-option-container");
  const startBlinkRef = document.getElementById("start-game-text");
  startBlinkRef.classList.remove("start-game-text");
}

function activateMenu() {
  gameHasStarted = false;
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
    case 'normal': {
      ref.innerText = 'Hard Mode';
      expRef.innerText = 'More chickens, more boss health';
      gameMode = 'hard';
      getActiveHighscores();
    }
      break;
    case 'hard': {
      ref.innerText = 'Chicken Rush';
      expRef.innerText = 'Endless chickens, no boss';
      gameMode = 'chickenRush';
       getActiveHighscores();
    }
      break;
    case 'chickenRush': {
      ref.innerText = 'Normal Mode';
      expRef.innerText = 'Collect 10 coins to trigger the boss';
      gameMode = 'normal';
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

// ladebildschirm
// boss animation
// reset idle check

// set boss back and bottle to not infinite and boss energy to 100 and collect coins to 10
// set coin collision to 10 after boss animation
// kurez immunität nach hit.

// ebenso clucker intervall
// Sounds alle zusammenfassen und in die enemies stecken bzw. in die boss klasse.

// change this in level for coins and emenies and backgrounds

// responsive for all screens
// turn to landscape if in portrait mode
// mobile controlling options

// documenatation

// Boss kill animation not smooth
// boss attack sound interval still working after game end!
// parallax is not workin
// bottle throw is not normal triggerd
// adding random spawn point

// controll all intervals!!!! and stop them after game finished.
// change the splice array method for scores to 100 from 10

// parallax effect

// check all object with console logs for undefined values

// collect all intervals and reduce them.

// Shorten all functions
// intevalle reduzieren auf ein minimum.

// CALL QUESTIONS - ANSWERES
  // parallax mode



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