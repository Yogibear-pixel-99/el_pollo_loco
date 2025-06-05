/**
 * Handles keyboard and touch input for controlling the character.
 * Manages movement, jumping, and throwing actions on both desktop and mobile.
 */
class Keyboard {
  /**
   * Indicates whether the right movement key is pressed.
   */
  KEY_RIGHT = false;

  /**
   * Indicates whether the left movement key is pressed.
   */
  KEY_LEFT = false;

  /**
   * Indicates whether the jump key is pressed.
   */
  KEY_JUMP = false;

  /**
   * Indicates whether the shot key is pressed.
   */
  KEY_SHOT = false;

  /**
   * Initializes the keyboard by setting up event listeners for touch and key controls.
   */
  constructor() {
    this.startKeyboardTouchEvents();
    this.startKeyControlEvents();
    this.preventDefaultKeys();
    this.startPauseControlEvents();
  }

  /**
   * Sets up touch event listeners for mobile controls.
   * Updates internal key variables based on touch start/end events.
   */
  startKeyboardTouchEvents() {
    const keyObject = {
      "mobile-jump": "KEY_JUMP",
      "mobile-throw": "KEY_SHOT",
      "mobile-left": "KEY_LEFT",
      "mobile-right": "KEY_RIGHT",
    };

    for (const [id, key] of Object.entries(keyObject)) {
      document.getElementById(id).addEventListener("touchstart", () => {
        this[key] = true;
      });
      document.getElementById(id).addEventListener("touchend", () => {
        this[key] = false;
      });
    }

    document.getElementById("mobile-pause").addEventListener("touchstart", () => {
        if (gameHasStarted) pauseGame();
      });
  }

  /**
   * Sets up keyboard event listeners for desktop controls.
   * Updates internal key variables based on keydown/keyup events.
   */
  startKeyControlEvents() {
    window.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowRight":
          this.KEY_RIGHT = true;
          break;
        case "ArrowLeft":
          this.KEY_LEFT = true;
          break;
        case "ArrowUp":
          this.KEY_UP = true;
          break;
        case "ArrowDown":
          this.KEY_DOWN = true;
          break;
        case " ":
          this.KEY_JUMP = true;
          break;
        case "Control":
        case "Alt":
        case "d":
        case "D":
          this.KEY_SHOT = true;
          break;
      }
    });

    window.addEventListener("keyup", (event) => {
      switch (event.key) {
        case "ArrowRight":
          this.KEY_RIGHT = false;
          break;
        case "ArrowLeft":
          this.KEY_LEFT = false;
          break;
        case "ArrowUp":
          this.KEY_UP = false;
          break;
        case "ArrowDown":
          this.KEY_DOWN = false;
          break;
        case " ":
          this.KEY_SPACE = false;
          break;
        case "Control":
        case "Alt":
        case "d":
        case "D":
          this.KEY_SHOT = false;
          break;
      }
    });
  }

  /**
   * Prevents the default context menu on phones touch longpress.
   * Prevents on iPhone the draggable option on longpress.
   */
  preventDefaultKeys() {
    document.querySelectorAll("svg, img").forEach((element) => {
      element.setAttribute("draggable", "false");
    });

    document.querySelectorAll(".mobile-game-button").forEach((button) => {
      button.addEventListener("contextmenu", (e) => e.preventDefault());
      button.addEventListener(
        "touchstart",
        (e) => {
          e.preventDefault();
        },
        { passive: false }
      );
    });
  }

  /**
   * Handles keyup events to toggle game pause/resume on 'p', 'P', or 'Escape' keys.
   */
  startPauseControlEvents() {
    document.addEventListener("keyup", (event) => {
      if (
        (gameHasStarted && event.key === "p") ||
        event.key === "P" ||
        event.key === "Escape"
      ) {
        gamePaused ? resumeGame() : pauseGame();
      }
    });
  }
}
