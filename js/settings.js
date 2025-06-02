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


/**
 * Shows the gamecanvas and settings menu overlay on smaller screens.
 */
function showResponsiveGameCanvas() {
  if (isSmallScreen()) {
    let ref = document.getElementById("canvas-wrapper");
    ref.style.display = "block";
    requestAnimationFrame(() => {
      ref.classList.add("canvas-mobile-open");
    });
  }
}

/**
 * Hides the gamecanvas and settings menu overlay on smaller screens.
 */
function hideResponsiveGameCanvas() {
  if (isSmallScreen()) {
    let ref = document.getElementById("canvas-wrapper");
    ref.classList.remove("canvas-mobile-open");
    setTimeout(() => (ref.style.display = "none"), 300);
  }
}

/**
 * Checks if the points table overlay is opened and calls a show or hide function.
 */
function toggleResponsiveScoreTablePoints() {
  document.getElementById("right-content").classList.contains("open-score-table")
    ? hideResponsiveScoreTable("right-content")
    : showResponsiveScoreTable("right-content");
}

/**
 * Checks if the score table overlay is opened and calls a show or hide function.
 */
function toggleResponsiveScoreTableHighscore() {
  document.getElementById("left-content").classList.contains("open-score-table")
    ? hideResponsiveScoreTable("left-content")
    : showResponsiveScoreTable("left-content");
}

/**
 * Shows the score or pointstable overlay by adding display block.
 * Darkens the game canvas by setting it behind the game mask with z index.
 * 
 * @param {string} id - The id of the right (points table) or left (score table) HTML element.
 */
function showResponsiveScoreTable(id) {
  document.getElementById("canvas-wrapper").style.zIndex = "0";
  deactivateMenu();
  let ref = document.getElementById(id);
  ref.style.display = "block";
  requestAnimationFrame(() => {
    ref.classList.add("open-score-table");
  });
}

/**
 * Hiddes the score or pointstable overlay by adding display block.
 * Darkens the game canvas by setting it behind the game mask with z index.
 * 
 * @param {string} id - The id of the right (points table) or left (score table) HTML element.
 */
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
 * In case that the screen size is to small for the game overlay, the fullscreen mode on is set
 * permanent.
 * 
 */
function checkScreensizeForFixFullscreen() {
  if (window.innerWidth <= 720 || window.innerHeight <= 480) {
    let buttonRef = document.getElementById("full-screen-button");
    fullScreen = true;
    buttonRef.classList.add("full-screen-button");
  }
}

/**
 * In case that the screen is large enough for a game overlay, the fullscreen button can be toggled.
 * In case the screen is to small, an error message appears that only fullscreen is possible.
 */
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

/**
 * The error message, that appears if just fullscreen is possible.
 */
function showJustFullscreenInfo() {
  let ref = document.getElementById("name-error-text");
  ref.innerText = "Screen is to small, just fullscreen possible";
  setTimeout(() => {
    ref.innerText = "";
  }, 10000);
}

/**
 * Blurs the input field after pressing enter and plays the standard click sound.
 * 
 * @param {KeyboardEvent} event - The standard event from the input field.
 * @param {HTMLElement} element - The HTML input field to blur.
 */
function blurInput(event, element) {
  if (event.key === "Enter") {
    element.blur();
    audio.playSoundClone("menuClick");
  }
}

/**
 * Trims the input string.
 * 
 * @param {HTMLElement} element - The HTML input field to trim.
 */
function trimPlayerName(element) {
  element.value = element.value.trim();
}

/**
 * Gets the volume settings from the local storage.
 * Sets a standard volume to the audio files, if local storage is null.
 */
function getSoundSettings() {
  sfxMute = localStorage.getItem("sfxMute") === "true";
  musicMute = localStorage.getItem("musicMute") === "true";
  sfxVolume = localStorage.getItem("sfxVolume");
  musicVolume = localStorage.getItem("musicVolume");

  if (sfxVolume === null) sfxVolume = 7;
  if (musicVolume === null) musicVolume = 4;
}

/**
 * Applies the current volume and mute settings to all audio elements.
 * 
 * First calculates the effective volume levels, then assigns the
 * mute state and volume values for both sound effects and music.
 */
function assignSoundSettings() {
  calculateVolumesForAssign();
  assignMuteAndVolume("sfx", sfxMute, sfxVolume);
  assignMuteAndVolume("music", musicMute, musicVolume);
}

/**
 * Calculaters the effective volume levels.
 */
function calculateVolumesForAssign() {
  sfxVolume === 10 ? (sfxVolume = 1) : (sfxVolume = sfxVolume / 10);
  musicVolume === 10 ? (musicVolume = 1) : (musicVolume = musicVolume / 10);
}

/**
 * Assigns the calculated volume to the specified audio elements in the audio object.
 * 
 * @param {string} src - The category of the soundfiles - sfx or music.
 * @param {boolean} mute - A boolean to mute or unmute the audio elements.
 * @param {number} vol - The effective sound volume for the audio elements (0 - 1).
 */
function assignMuteAndVolume(src, mute, vol) {
  Object.values(audio[src]).forEach((audio) => {
    checkArrayAndSetMuteAndVol(audio, mute, vol);
  });
}

/**
 * An algorythmus to itterate through the audio object and sets the effective volume and mute settings.
 * 
* @param {HTMLAudioElement|Array} audio - A single audio element or a nested array of audio elements.
 * @param {boolean} mute - A boolean to mute or unmute the audio elements.
 * @param {number} vol - The effective sound volume for the audio elements (0 - 1).
 */
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

/**
 * Toggles sound effects on or off and updates settings.
 */
function toggleSoundsOnOff() {
  sfxMute ? (sfxMute = false) : (sfxMute = true);
  console.log(sfxMute);
  assignMuteAndVolume("sfx", sfxMute, sfxVolume);
  localStorage.setItem("sfxMute", sfxMute.toString());
  initSoundSettings();
}

/**
 * Toggles music on or off and updates settings.
 */
function toggleMusicOnOff() {
  musicMute ? (musicMute = false) : (musicMute = true);
  assignMuteAndVolume("music", musicMute, musicVolume);
  localStorage.setItem("musicMute", musicMute.toString());
  initSoundSettings();
}

/**
 * Initializes the sound and music UI settings and applies volume/mute state.
 */
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

/**
 * Sets the music and sound effects volume from the UI sliders and stores the values.
 */
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

/**
 * Styles the name input field on small screens by toggling a placeholder class.
 */
function styleResponsiveNameInput() {
  let ref = document.getElementById("player-name-input");
  ref.value === ""
    ? ref.classList.add("responsive-input-placeholder")
    : ref.classList.remove("responsive-input-placeholder");
}

/**
 * Pauses the game and shows the pause screen.
 */
function pauseGame() {
  showCursor();
  world.stopAllGameIntervals();
  gamePaused = true;
  showSingleContainerById("canvas-pause-container");
  audio.pauseSound("cluckern");
}

/**
 * Resumes the game from pause state.
 */
function resumeGame() {
  hideCursor();
  world.continueGameIntervals();
  gamePaused = false;
  hideSingleContainerById("canvas-pause-container");
  audio.playSound("menuClick");
}

/**
 * Enters fullscreen mode and resizes the canvas and buttons.
 */
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

/**
 * Resizes mobile game control buttons based on window height.
 */
function resizeMobileButtons() {
  let buttonsWrapper = document.querySelectorAll(".mobile-game-button");
  let buttonSvg = document.querySelectorAll(".mobile-game-button svg");
  const size = window.innerHeight / 7;
  buttonsWrapper.forEach((button) => {
    button.style.padding = `${size / 2}`;
    button.style.width = `${size * 1.5}px`;
    button.style.height = `${size}px`;
  });
  buttonSvg.forEach((svg) => {
    svg.style.width = `${size / 2.5}px`;
    svg.style.height = `${size / 2.5}px`;
  });
}

/**
 * Resizes the game canvas and buttons responsively based on the window size.
 */
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
}

/**
 * Exits fullscreen mode and restores the original canvas and button styles.
 */
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

/**
 * Ends the current game session.
 */
function resetGame() {
  gameOver();
}

/**
 * Returns the game to the main menu and resets relevant states and UI.
 */
function backToMainMenu() {
  document.getElementById("right-content").style.zIndex = "150";
  activateMenu();
  audio.playMusicLoop("menuMusic");
  hideResponsiveGameCanvas();
  gameStartFalse();
  checkFullscreenMode();
  audio.playSound("menuClick");
}
