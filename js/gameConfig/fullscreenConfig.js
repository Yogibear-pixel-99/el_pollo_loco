/**
 * Handles fullscreen mode display based on current state.
 * Shows fullscreen UI if enabled and game started, hides otherwise.
 */
function checkFullscreenMode() {
  if (fullScreen && gameHasStarted) {
    showFullscreen();
    setTimeout(resizeDisplay, 200);
  if (fullScreen) {
    setTimeout(setMobileGameButtonSize, 200);
  }
  canvas.style.backgroundImage = "none";
  } else {
    resetFullscreenElementsToDefault();
  }
}

/**
 * Resets all elements after fullscreen mode to the default values.
 */
function resetFullscreenElementsToDefault(){
  fullScreen = false;
      hideFullscreen();
      setTimeout(setGameCanvasToDefault, 200);
    setTimeout(setMobileGameButtonDefault, 200);
    checkScreensizeForFixFullscreen();
    canvas.style.backgroundImage =
      'url("img/9_intro_outro_screens/start/startscreen_2.png")';
}

/**
 * Sets the game canvas to the default size of 720 x 480 px.
 * Sets the default background.
 */
function setGameCanvasToDefault() {
  if ((window.innerWidth < 720 || window.innerHeight < 480) && !fullScreen) {
    resizeDisplay();
    setTimeout(setMobileGameButtonSize, 200);
  } else {
    setGameCanvasToDefaultSize();
    setMobileGameButtonDefault();
  }
}

/**
 * Sets the game canvas to the default width and height.
 */
function setGameCanvasToDefaultSize() {
  canvas.style.width = "720px";
  canvas.style.height = "480px";
}

/**
 * Resizes the game canvas and buttons responsively based on the window size.
 */
function resizeDisplay() {
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
}

/**
 * Sets the mobile buttons to a new size, depending on actually screensize.
 */
function setMobileGameButtonSize() {
  let buttonWrapper = document.getElementById("mobile-buttons-wrapper");
  let buttons = document.querySelectorAll(".mobile-game-button");
  let buttonImg = document.querySelectorAll(".mobile-game-button svg");
  const scaleX = window.innerWidth / 720;
  const scaleY = window.innerHeight / 480;
  const scale = Math.min(scaleX, scaleY);
  buttonWrapper.style.width = `${scale * 700}px`;
  buttons.forEach((button) => {
    button.style.width = `${scale * 70}px`;
    button.style.height = `${scale * 70}px`;
  });
  buttonImg.forEach((img) => {
    img.style.width = `${scale * 26}px`;
    img.style.height = `${scale * 26}px`;
  });
}

/**
 * Sets the mobile button wrapper and the buttons to the default size.
 */
function setMobileGameButtonDefault() {
  let buttonWrapper = document.getElementById("mobile-buttons-wrapper");
  let buttons = document.querySelectorAll(".mobile-game-button");
  let buttonImg = document.querySelectorAll(".mobile-game-button svg");
  buttonWrapper.style.width = "700px";
  buttons.forEach((button) => {
    button.style.width = "80px";
    button.style.height = "70px";
  });
  buttonImg.forEach((img) => {
    img.style.width = "34px";
    img.style.height = "34px";
  });
}

/**
 * Enters fullscreen mode and resizes the canvas and buttons.
 */
function showFullscreen() {
  const ref = document.getElementById("canvas-wrapper");
  if (
    !navigator.userAgent.includes("iPhone") &&
    fullScreen &&
    !document.fullscreenElement &&
    !document.webkitFullscreenElement &&
    !document.mozFullScreenElement &&
    !document.msFullscreenElement
  ) {
    if (ref.requestFullscreen) {
      ref.requestFullscreen();
    } else if (ref.mozRequestFullScreen) {
      ref.mozRequestFullScreen();
    } else if (ref.webkitRequestFullscreen) {
      ref.webkitRequestFullscreen();
    } else if (ref.msRequestFullscreen) {
      ref.msRequestFullscreen();
    }
  }
}

/**
 * Exits fullscreen mode and restores the original canvas and button styles.
 */
function hideFullscreen() {
  if (
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement
  ) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
}

/**
 * In case that the screen size is to small for the game overlay, the fullscreen mode on is set
 * permanent.
 *
 */
function checkScreensizeForFixFullscreen() {
  let buttonRef = document.getElementById("full-screen-button");
  if (window.innerWidth <= 720 || window.innerHeight <= 480) {
    fullScreen = true;
    buttonRef.classList.add("full-screen-button");
  } else {
    fullScreen = false;
    buttonRef.classList.remove("full-screen-button");
  }
}

/**
 * In case that the screen is large enough for a game overlay, the fullscreen button can be toggled.
 * In case the screen is to small, an error message appears that only fullscreen is possible.
 */
function toggleFullScreenButton() {
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
 * Listens to fullscreen changes and adjusts display and controls accordingly.
 */
document.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement) {
     resetFullscreenElementsToDefault();
  }
});

/**
 * Listens to fullscreen changes and adjusts display and controls accordingly for Firefox.
 */
document.addEventListener("mozfullscreenchange", () => {
  if (!document.mozFullScreenElement) {
       resetFullscreenElementsToDefault();
  }
});
