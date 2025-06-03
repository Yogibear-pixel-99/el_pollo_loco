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
    !ref.classList.contains("d-none") &&
    isSmallScreen()
  ) {
    requestAnimationFrame(() => {
      hideResponsiveGameCanvas();
    });
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
  stopAllGameIntervals();
  gamePaused = true;
  showSingleContainerById("canvas-pause-container");
  audio.pauseSound("cluckern");
}

/**
 * Resumes the game from pause state.
 */
function resumeGame() {
  hideCursor();
  continueGameIntervals();
  gamePaused = false;
  hideSingleContainerById("canvas-pause-container");
  audio.playSound("menuClick");
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
  world.character.resetIdleAudio();
  document.getElementById("right-content").style.zIndex = "150";
  activateMenu();
  audio.playMusicLoop("menuMusic");
  hideResponsiveGameCanvas();
  gameStartFalse();
  checkFullscreenMode();
  audio.playSound("menuClick");
}

  /**
   * Stops all game-related intervals and animation frames.
   * Used for pausing or ending the game.
   */
  function stopAllGameIntervals() {
    cancelAnimationFrame(world.drawInterval);
    world.character.stopAllCharIntervals();
    world.level.enemies.forEach((enemy) => {
      enemy.stopAllEnemyIntervals();
    });
    world.level.endboss.stopAllBossIntervals();
    clearInterval(world.level.endboss.moveDirectionInterval);
    clearInterval(world.level.endboss.gravityInterval);
    world.thrownBottles.forEach((bottle) => {
      clearInterval(bottle.gravityInterval);
    });
    world.level.coins.forEach((coin) => {
      clearInterval(coin.coinInterval);
    });
    clearInterval(world.collisionInterval);
    clearInterval(world.worldInterval);
    clearInterval(chickenSpawnInterval);
    world.level.skyObjects.forEach((cloud) => cloud.cancelAutoMove());
  }

  /**
   * Continues game intervals after a pause or resume.
   */
  function continueGameIntervals() {
    world.draw();
    world.character.startChar();
    world.level.endboss.bossMoveDirection();
    world.level.endboss.applyGravity();
    world.runCollisions();
    world.runWorldIntervals();
    world.level.enemies.forEach((enemy) => {
      enemy.startEnemy();
    });
    if (world.level.endboss.isTriggered) {
      world.level.endboss.startBossIntervals();
    }
    world.level.skyObjects.forEach((cloud) => {
      cloud.autoMoveLeft();
    });
    world.thrownBottles.forEach((bottle) => {
      bottle.applyBottleGravity();
    });
    world.level.coins.forEach((coin) => {
      coin.animate();
    });
  }
