/**
 * Toggles the display of the settings option menu.
 * 
 * Retrieves the HTML template using the provided callback function.
 * Displays the settings menu differently depending on the screen size.
 * Hides the menu if it's already visible and matches the current menu state.
 * 
 * @param {Function} getTemp - A function that returns the settings HTML template (as a string or DOM element).
 * @param {string} settingsMenu - The identifier of the settings menu to compare with the current session state.
 */
function toggleOptionMenu(getTemp, settingsMenu) {
  const ref = document.getElementById("canvas-option-container");
  const template = getTemp();
  if (isSmallScreen()) {
    showResponsiveGameCanvas();
    deactivateMenu();
  }
  if (
    sessionStorage.getItem("menu") === settingsMenu &&
    !ref.classList.contains("d-none")
  ) {
    if (isSmallScreen()) {
      requestAnimationFrame(() => {
        hideResponsiveGameCanvas();
      });
    }
    setTimeout(() => {
      ref.classList.add("d-none");
    }, 300);
  } else {
    showLargeScreenSizeSettingsMenu(template, settingsMenu);
  }
}

/**
 * Displays the settings option menu on large screens.
 * 
 * Inserts the provided template into the container and updates the sessionStorage
 * with the current menu identifier. If the container is hidden, it will be shown first.
 * 
 * @param {HTMLElement|string} template - The HTML content to display in the menu container.
 * @param {string} settingsMenu - The identifier of the settings menu to store in sessionStorage.
 */
function showLargeScreenSizeSettingsMenu(template, settingsMenu) {
  const ref = document.getElementById("canvas-option-container");
  if (ref.classList.contains("d-none")) {
    showSingleContainerById("canvas-option-container");
  }
    getTemplateToContent("canvas-option-container", template);
    sessionStorage.setItem("menu", settingsMenu);
}

/**
 * Closes the currently open settings menu unless the game has already started.
 * 
 * Closes the specified settings content, depending on the screensize and plays a click sound.
 * 
 * @returns {void}
 */
function closeSettings() {
  const right = document.getElementById("right-content");
  const left = document.getElementById("left-content");
  if (gameHasStarted) return;
  document.getElementById("canvas-wrapper").style.zIndex = "150";
  if (screenWidthSmallerThan(1300)) {
    right.classList.remove("open-score-table");
    left.classList.remove("open-score-table");
    activateMenu();
  }
  if (isSmallScreen()) {
    hideResponsiveGameCanvas();
    activateMenu();
  } else {
    hideSingleContainerById("canvas-option-container");
  }
  audio.playSoundClone("menuClick");
}



function showResponsiveGameCanvas() {
  if (isSmallScreen()) {
    let ref = document.getElementById("canvas-wrapper");
    ref.style.display = "block";
    requestAnimationFrame(() => {
      ref.classList.add("canvas-mobile-open");
    });
  }
}

function hideResponsiveGameCanvas() {
  if (isSmallScreen()) {
    let ref = document.getElementById("canvas-wrapper");
    ref.style.display = "none";
    ref.classList.remove("canvas-mobile-open");
    setTimeout(() => (ref.style.display = "none"), 300);
  }
}

function toggleResponsiveScoreTablePoints(id) {
  document.getElementById("left-content").classList.remove("open-score-table");
  let ref = document.getElementById(id);
  ref.classList.contains("open-score-table")
    ? hideResponsiveScoreTable(id)
    : showResponsiveScoreTable(id);
}

function toggleResponsiveScoreTableHighscore(id) {
  document.getElementById("right-content").classList.remove("open-score-table");
  let ref = document.getElementById(id);
  ref.classList.contains("open-score-table")
    ? hideResponsiveScoreTable(id)
    : showResponsiveScoreTable(id);
}

function showResponsiveScoreTable(id) {
  document.getElementById("canvas-wrapper").style.zIndex = "0";
  deactivateMenu();
  let ref = document.getElementById(id);
  ref.style.display = "block";
  requestAnimationFrame(() => {
    ref.classList.add("open-score-table");
  });
}

function hideResponsiveScoreTable(id) {
  document.getElementById("canvas-wrapper").style.zIndex = "150";
  activateMenu();
  let ref = document.getElementById(id);
  ref.classList.remove("open-score-table");
  setTimeout(() => {
    ref.style.display = "none";
  }, 300);
}

/**
 * This function hides a html container. It adds the class d-none.
 *
 * @param {string} containerId - The id of the HTML container.
 */
function hideSingleContainerById(containerId) {
  let content = document.getElementById(containerId);
  content.classList.add("d-none");
}

function checkScreensizeForFixFullscreen() {
  if (window.innerWidth <= 720 || window.innerHeight <= 480) {
    let buttonRef = document.getElementById("full-screen-button");
    fullScreen = true;
    buttonRef.classList.add("full-screen-button");
  }
}

function toggleFullScreen() {
  let buttonRef = document.getElementById("full-screen-button");
  if (window.innerWidth <= 720 || window.innerHeight <= 480) {
    showJustFullscreenInfo();
  } else if (fullScreen) {
    buttonRef.classList.remove("full-screen-button");
    fullScreen = false;
  } else {
    fullScreen = true;
    buttonRef.classList.add("full-screen-button");
  }
}

function showJustFullscreenInfo() {
  let ref = document.getElementById("name-error-text");
  ref.innerText = "Screen is to small, just fullscreen possible";
  setTimeout(() => {
    ref.innerText = "";
  }, 10000);
}

function returnOnlyLettersAndNumbers(id) {
  let regex = /[^\u00c4\u00e4\u00d6\u00f6\u00dc\u00fc\u00dfA-Za-z0-9\s+]/g;
  let userInput = id.value;
  userInput = userInput.replace(regex, "");
  id.value = userInput;
}

function unblurInput(event, element) {
  if (event.key === "Enter") {
    element.blur();
    audio.playSoundClone("menuClick");
  }
}

function trimPlayerName(element) {
  element.value = element.value.trim();
}

function getSoundSettings() {
  sfxMute = localStorage.getItem("sfxMute") === "true";
  console.log(sfxMute);
  musicMute = localStorage.getItem("musicMute") === "true";
  console.log(musicMute);
  sfxVolume = localStorage.getItem("sfxVolume");
  musicVolume = localStorage.getItem("musicVolume");

  if (sfxMute === null) sfxMute = false;
  if (musicMute === null) musicMute = false;
  if (sfxVolume === null) sfxVolume = 7;
  if (musicVolume === null) musicVolume = 4;
}

function assignSoundSettings() {
  calculateVolumesForAssign();
  assignMuteAndVolume("sfx", sfxMute, sfxVolume);
  assignMuteAndVolume("music", musicMute, musicVolume);
}

function calculateVolumesForAssign() {
  sfxVolume === 10 ? (sfxVolume = 1) : (sfxVolume = sfxVolume / 10);
  musicVolume === 10 ? (musicVolume = 1) : (musicVolume = musicVolume / 10);
}

function assignMuteAndVolume(src, mute, vol) {
  Object.values(audio[src]).forEach((audio) => {
    checkArrayAndSetMuteAndVol(audio, mute, vol);
  });
}

function checkArrayAndSetMuteAndVol(audio, mute, vol) {
  if (Array.isArray(audio)) {
    audio.forEach((audio) => {
      checkArrayAndSetMuteAndVol(audio, mute, vol);
    });
  } else {
    audio.muted = mute;
    audio.volume = vol;
  }
}

function toggleSoundsOnOff() {
  sfxMute ? (sfxMute = false) : (sfxMute = true);
  console.log(sfxMute);
  assignMuteAndVolume("sfx", sfxMute, sfxVolume);
  localStorage.setItem("sfxMute", sfxMute.toString());
  initSoundSettings();
}

function toggleMusicOnOff() {
  musicMute ? (musicMute = false) : (musicMute = true);
  assignMuteAndVolume("music", musicMute, musicVolume);
  localStorage.setItem("musicMute", musicMute.toString());
  initSoundSettings();
}

function initSoundSettings() {
  let soundOnRef = document.getElementById("sound-on");
  let soundOffRef = document.getElementById("sound-off");
  let musicOnRef = document.getElementById("music-on");
  let musicOffRef = document.getElementById("music-off");
  let musicInputRef = document.getElementById("menu-music-vol");
  let sfxInputRef = document.getElementById("menu-sound-vol");
  if (sfxMute === false) {
    soundOnRef.classList.add("selected");
    soundOffRef.classList.remove("selected");
  } else {
    soundOnRef.classList.remove("selected");
    soundOffRef.classList.add("selected");
  }
  if (musicMute === false) {
    musicOnRef.classList.add("selected");
    musicOffRef.classList.remove("selected");
  } else {
    musicOnRef.classList.remove("selected");
    musicOffRef.classList.add("selected");
  }
  musicInputRef.value = musicVolume * 10;
  sfxInputRef.value = sfxVolume * 10;
  assignMuteAndVolume("sfx", sfxMute, sfxVolume);
  assignMuteAndVolume("music", musicMute, musicVolume);
}

function setVolume() {
  let musicInputRef = document.getElementById("menu-music-vol");
  musicVolume = musicInputRef.value;
  localStorage.setItem("musicVolume", musicVolume.toString());
  let sfxInputRef = document.getElementById("menu-sound-vol");
  sfxVolume = sfxInputRef.value;
  localStorage.setItem("sfxVolume", sfxVolume.toString());
  calculateVolumesForAssign();
  initSoundSettings();
}

function styleResponsiveNameInput() {
  let ref = document.getElementById("player-name-input");
  ref.value === ""
    ? ref.classList.add("responsive-input-placeholder")
    : ref.classList.remove("responsive-input-placeholder");
}

function pauseGame() {
  showCursor();
  world.stopAllGameIntervals();
  gamePaused = true;
  showSingleContainerById("canvas-pause-container");
  audio.pauseSound("cluckern");
}

function resumeGame() {
  hideCursor();
  world.continueGameIntervals();
  gamePaused = false;
  hideSingleContainerById("canvas-pause-container");
  audio.playSound("menuClick");
}

function showFullscreen() {
  const ref = document.getElementById("canvas-wrapper");
  const canvas = document.getElementById("gamecanvas");
  if (!document.fullscreenElement && fullScreen) {
    if (ref.requestFullscreen) {
      ref.requestFullscreen();
    } else if (ref.webkitRequestFullscreen) {
      ref.webkitRequestFullscreen();
    } else if (ref.msRequestFullscreen) {
      ref.msRequestFullscreen();
    }
    canvas.style.backgroundImage = "none";
    setTimeout(resizeDisplay, 100);
    setTimeout(resizeMobileButtons, 100);
  }
}

function resizeMobileButtons() {
  let buttonsWrapper = document.querySelectorAll(".mobile-game-button");
  let buttonImg = document.querySelectorAll(".mobile-game-button img");
  const size = window.innerHeight / 7;
  buttonsWrapper.forEach((button) => {
    button.style.padding = `${size / 2}`;
    button.style.width = `${size * 1.5}px`;
    button.style.height = `${size}px`;
  });
  buttonImg.forEach((img) => {
    img.style.width = `${size / 2.5}px`;
    img.style.height = `${size / 2.5}px`;
  });
}

function resizeDisplay() {
  const canvas = document.getElementById("gamecanvas");
  const buttonsRef = document.getElementById("mobile-buttons-wrapper");
  const gameWidth = 720;
  const gameHeight = 480;
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const scaleX = windowWidth / gameWidth;
  const scaleY = windowHeight / gameHeight;
  const scale = Math.min(scaleX, scaleY);
  const scaledWidth = gameWidth * scale;
  const scaledHeight = gameHeight * scale;

  canvas.style.width = `${scaledWidth}px`;
  canvas.style.height = `${scaledHeight}px`;
  canvas.style.left = `${(windowWidth - scaledWidth) / 2}px`;
  canvas.style.top = `${(windowHeight - scaledHeight) / 2}px`;
  buttonsRef.style.width = `${scaledWidth - 40}px`;
  buttonsRef.style.bottom = `${(windowHeight - scaledHeight) / 2 + 8}px`;
  // buttonsRef.width = `${windowWidth - 40}`;
}

function hideFullscreen() {
  if (document.fullscreenElement) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
  canvas.style.width = "720px";
  canvas.style.height = "480px";
  canvas.style.left = "0";
  canvas.style.top = "0";
  canvas.style.backgroundImage =
    'url("img/9_intro_outro_screens/start/startscreen_2.png")';

  const buttonsRef = document.getElementById("mobile-buttons-wrapper");
  buttonsRef.style.width = "680px";
  buttonsRef.style.bottom = "8px";
  buttonsRef.width = "64px";

  let buttonsWrapper = document.querySelectorAll(".mobile-game-button");
  let buttonImg = document.querySelectorAll(".mobile-game-button img");
  buttonsWrapper.forEach((button) => {
    button.style.padding = "12px";
    button.style.width = "64px";
    button.style.height = "64px";
  });
  buttonImg.forEach((img) => {
    img.style.width = "40px";
    img.style.height = "40px";
  });
}

function resetGame() {
  gameOver();
}

function backToMainMenu() {
  document.getElementById("right-content").style.zIndex = "150";
  activateMenu();
  audio.playMusicLoop("menuMusic");
  hideResponsiveGameCanvas();
  gameStartFalse();
  checkFullscreenMode();
  audio.playSound("menuClick");
}

