/**
 * Handles fullscreen mode display based on current state.
 * Shows fullscreen UI if enabled and game started, hides otherwise.
 */
function checkFullscreenMode() {
  if (fullScreen && gameHasStarted) {
    showFullscreen();
    setMobileGameButtonSize();
  } else if (fullScreen && !gameHasStarted) {
    hideFullscreen();
    setGameCanvasToDefaultSize();
  }
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
    setTimeout(setMobileGameButtonSize, 100);
    // setTimeout(resizeMobileButtons, 100);
  }
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
}

/**
 * Resizes the game canvas and buttons responsively based on the window size.
 */
function resizeDisplay() {
  const canvas = document.getElementById("gamecanvas");
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
}

  /**
   * Sets the mobile buttons to a new size, depending on actually screensize.
   */
  function setMobileGameButtonSize() {
  let buttonWrapper = document.getElementById("mobile-buttons-wrapper");
  let buttons = document.querySelectorAll(".mobile-game-button");
  let buttonImg = document.querySelectorAll(".mobile-game-button svg");
  const scaleX = window.innerWidth / 720; // 1
  const scaleY = window.innerHeight / 480;  // 1
  const scale = Math.min(scaleX, scaleY);
  buttonWrapper.style.width = `${scale * 700}px`;
  buttons.forEach((button) => {
    button.style.padding = `${scale * 10}px`;
    button.style.width = `${scale * 64}px`;
    button.style.height = `${scale * 64}px`;
  });
  buttonImg.forEach((img) => {
    img.style.width = `${scale * 26}px`;
    img.style.height = `${scale * 26}px`;
  });
}

/**
 * Sets the game canvas to the default size of 720 x 480 px.
 * Sets the default background.
 */
function setGameCanvasToDefaultSize(){
    canvas.style.width = "720px";
  canvas.style.height = "480px";
  canvas.style.left = "0";
  canvas.style.top = "0";
  canvas.style.backgroundImage =
    'url("img/9_intro_outro_screens/start/startscreen_2.png")';
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
 * Listens to fullscreen changes and adjusts display and controls accordingly.
 */
window.addEventListener("fullscreenchange", () => {
  if (document.fullscreenElement) {
    resizeDisplay();
    setMobileGameButtonSize();
  }
});

window.addEventListener("visibilitychange", () => {
  if (!document.hidden && gameHasStarted && isSmallScreen()) {
    canvas.style.backgroundImage = "none";
    resizeDisplay();
    setMobileGameButtonSize();
  }
});