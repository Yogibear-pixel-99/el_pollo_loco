/**
 * The HTML canvas element used for rendering the game.
 * @type {HTMLCanvasElement}
 */
let canvas;

/**
 * The game world instance managing game state and logic.
 * @type {World}
 */
let world;

/**
 * Keyboard input handler instance.
 * @type {Keyboard}
 */
let keyboard = new Keyboard();

/**
 * Audio manager instance for sounds and music.
 * @type {Audiofiles}
 */
let audio = new Audiofiles();

/**
 * Current volume level for sound effects (0.0 to 1.0).
 */
let sfxVolume = 7;

/**
 * Current volume level for music (0.0 to 1.0).
 */
let musicVolume = 4;

/**
 * Flag indicating whether sound effects are muted.
 * @type {boolean}
 */
let sfxMute;

/**
 * Flag indicating whether music is muted.
 * @type {boolean}
 */
let musicMute;

/**
 * Canvas height in pixels.
 */
let canvasHeight = 480;

/**
 * Canvas width in pixels.
 */
let canvasWidth = 720;

/**
 * Height of the floor in the game world.
 */
let floorHeight = 58;

/**
 * Flag whether music should start playing on game start.
 */
let playMusicOnStart = false;

/**
 * Flag indicating if the game is in fullscreen mode.
 */
let fullScreen = false;

/**
 * Flag indicating if the game has started.
 */
let gameHasStarted = false;

/**
 * Flag indicating if the game is currently paused.
 */
let gamePaused = false;

/**
 * Current game mode string identifier.
 * Possible values: "normal", "chickenRush", "hard"
 */
let gameMode = "normal";

/**
 * Base URL for the Firebase real-time database (highscore).
 */
const MAIN_URL =
  "https://el-pollo-loco-79444-default-rtdb.europe-west1.firebasedatabase.app/";

/**
 * Object holding highscore data fetched from the database.
 */
let highscores = {};

let time = new Date().getTime();

/**
 * Initializes the game setup:
 * - Sets the canvas element.
 * - Loads and applies sound settings.
 * - Loads highscores.
 * - Renders the points table.
 * - Adjusts fullscreen settings based on screen size.
 */
function init() {
  canvas = document.getElementById("gamecanvas");
  getSoundSettings();
  assignSoundSettings();
  getActiveHighscores();
  renderGamePointsTable();
  checkScreensizeForFixFullscreen();
}

/**
 * Starts the game if the player name input is valid.
 * Handles UI updates and configures the game mode.
 * Plays error animations and sounds if name input is invalid.
 */
function startGame() {
  if (checkNameInput()) {
    gameHasStarted = true;
    hideCursor();
    deactivateMenu();
    showSingleContainerById("mobile-buttons-wrapper");
    checkScoreBoardAppearance();
    showResponsiveGameCanvas();
    showLoadingScreen();
    checkFullscreenMode();
    resetScore();
    selectGameMode();
    setTimeout(() => hideSingleContainerById("canvas-option-container"), 3000);
    setTimeout(() => startGameIntervals(), 3000);
  } else {
    setPlayerNameError();
  }
}

/**
 * Displays the no player name input error message, adds an error animation and sound.
 */
function setPlayerNameError(){
  playerNameError();
    audio.playSoundClone("menuError");
    addErrorAnimation("start-game-text", "shake-error");
    addErrorAnimation("name-error-text", "shake-error");
}

/**
 * Configure the selected game mode.
 */
function selectGameMode(){
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
}


/**
 * Resets the player score to 0.
 */
function resetScore() {
  document.getElementById("player-score").innerText = "0";
}

/**
 * Adjusts the scoreboard's z-index depending on the screen size
 * to ensure proper visibility on smaller screens.
 */
function checkScoreBoardAppearance() {
  if (screenWidthSmallerThan(1300) || screenHeightSmallerThan(830)) {
    document.getElementById("right-content").style.zIndex = "0";
  } else {
    document.getElementById("right-content").style.zIndex = "100";
  }
}

/**
 * Displays the loading spinner screen while game assets load.
 */
function showLoadingScreen() {
  getTemplateToContent("canvas-option-container", getLoadingSpinnerTemp());
  showSingleContainerById("canvas-option-container");
}

/**
 * Sets the flag indicating the game has not started.
 */
function gameStartFalse() {
  gameHasStarted = false;
}

/**
 * Adds a CSS animation class to an element by id for 1 second.
 * @param {string} id - The element's id.
 * @param {string} className - The CSS class to add and remove.
 */
function addErrorAnimation(id, className) {
  let ref = document.getElementById(id);
  ref.classList.add(className);
  setTimeout(() => ref.classList.remove(className), 1000);
}

/**
 * Validates if the player name input is non-empty.
 * @returns {boolean} True if the input contains text, false otherwise.
 */
function checkNameInput() {
  const nameInput = document.getElementById("player-name-input");
  return nameInput.value.trim() !== "";
}

/**
 * Displays an error on the player name input field prompting user to enter a name.
 */
function playerNameError() {
  const nameInput = document.getElementById("player-name-input");
  const errorTextRef = document.getElementById("name-error-text");
  nameInput.placeholder.color = "red";
  nameInput.classList.add("error-blink");
  errorTextRef.innerText = "Enter your name!";
}

/**
 * Removes the error styles and messages from the player name input field.
 */
function removeNameError() {
  removeClass("player-name-input", "error-blink");
  removeErrorMessage("name-error-text");
}

/**
 * Clears the inner text of an element identified by id.
 * @param {string} id - The element's id.
 */
function removeErrorMessage(id) {
  const ref = document.getElementById(id);
  ref.innerText = "";
}

/**
 * Restarts the game by hiding overlay screens, resetting canvas and starting new.
 */
function playAgain() {
  hideWonLostPauseScreens();
  resetCanvas();
  startGame();
}

/**
 * Hides the "won", "lost", and "pause" overlay screens.
 */
function hideWonLostPauseScreens() {
  let lostRef = document.getElementById("canvas-lost-container");
  let wonRef = document.getElementById("canvas-won-container");
  let pauseRef = document.getElementById("canvas-pause-container");
  lostRef.classList.add("d-none");
  wonRef.classList.add("d-none");
  pauseRef.classList.add("d-none");
}

/**
 * Clears the entire canvas rendering context.
 */
function resetCanvas() {
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/**
 * Deactivates the main menu UI and shows the game mask overlay.
 */
function deactivateMenu() {
  showSingleContainerById("game-mask");
  hideSingleContainerById("canvas-option-container");
  const startBlinkRef = document.getElementById("start-game-text");
  startBlinkRef.classList.remove("start-game-text");
}

/**
 * Activates the main menu UI and hides game overlays and canvas.
 */
function activateMenu() {
  resetCanvas();
  hideResponsiveGameCanvas();
  hideSingleContainerById("game-mask");
  hideSingleContainerById("canvas-lost-container");
  hideSingleContainerById("canvas-won-container");
  hideSingleContainerById("canvas-pause-container");
  document.getElementById("start-game-text").classList.add("start-game-text");
}

/**
 * Cycles through the available game modes and updates UI accordingly.
 * Also fetches active highscores for the selected mode.
 */
function toggleGameMode() {
  let ref = document.getElementById("game-mode-txt");
  let expRef = document.getElementById("game-mode-exp");
  switch (gameMode) {
    case "normal":
      ref.innerText = "Hard Mode";
      expRef.innerText = "Collect 10 coins to trigger the boss";
      gameMode = "hard";
      break;
    case "hard":
      ref.innerText = "Chicken Rush";
      expRef.innerText = "Endless chickens, beat a new highscore";
      gameMode = "chickenRush";
      break;
    case "chickenRush":
      ref.innerText = "Normal Mode";
      expRef.innerText = "Collect 10 coins to trigger the boss";
      gameMode = "normal";
      break;
  }
}

/**
 * Ends the game by stopping intervals, hiding UI elements, saving scores,
 * stopping music and playing endgame sounds.
 */
function gameOver() {
  gameHasStarted = false;
  if (!gamePaused) {
    saveScore();
  }
  hideSingleContainerById("mobile-buttons-wrapper");
  stopAllGameIntervals();
  audio.stopGameMusic();
  showCursor();
  if (gamePaused) {
    gamePaused = false;
    return;
  }
  document.getElementById("right-content").style.zIndex = "150";
  audio.playEndAudio();
  if (world.checkGameEnd()) {
    showGameOverScreen();
  }
}

/**
 * Shows the game over screen depending on whether the player won or lost.
 */
function showGameOverScreen() {
  world.gameWon
    ? showSingleContainerById("canvas-won-container")
    : showSingleContainerById("canvas-lost-container");
}