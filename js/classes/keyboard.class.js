/**
 * Handles keyboard and touch input for controlling the character.
 * Manages movement, jumping, and throwing actions on both desktop and mobile.
 */
class Keyboard {
  /**
   * Indicates whether the right movement key is pressed.
   * @type {boolean}
   */
  KEY_RIGHT = false;

  /**
   * Indicates whether the left movement key is pressed.
   * @type {boolean}
   */
  KEY_LEFT = false;

  /**
   * Indicates whether the jump key is pressed.
   * @type {boolean}
   */
  KEY_JUMP = false;

  /**
   * Indicates whether the shot key is pressed.
   * @type {boolean}
   */
  KEY_SHOT = false;

  /**
   * Initializes the keyboard by setting up event listeners for touch and key controls.
   */
  constructor() {
    this.startKeyboardTouchEvents();
    this.startKeyControlEvents();
    this.preventDefaultKeys();
  }

  /**
   * Sets up touch event listeners for mobile controls.
   * Updates internal key variables based on touch start/end events.
   */
  startKeyboardTouchEvents() {
    document
      .getElementById("mobile-jump")
      .addEventListener("touchstart", () => {
        this.KEY_JUMP = true;
      });

    document
      .getElementById("mobile-throw")
      .addEventListener("touchstart", () => {
        this.KEY_SHOT = true;
      });

    document
      .getElementById("mobile-left")
      .addEventListener("touchstart", () => {
        this.KEY_LEFT = true;
      });

    document
      .getElementById("mobile-right")
      .addEventListener("touchstart", () => {
        this.KEY_RIGHT = true;
      });

    document
      .getElementById("mobile-pause")
      .addEventListener("touchstart", () => {
        if (gameHasStarted) pauseGame();
      });

    document.getElementById("mobile-jump").addEventListener("touchend", () => {
      this.KEY_JUMP = false;
    });

    document.getElementById("mobile-throw").addEventListener("touchend", () => {
      this.KEY_SHOT = false;
    });

    document.getElementById("mobile-left").addEventListener("touchend", () => {
      this.KEY_LEFT = false;
    });

    document.getElementById("mobile-right").addEventListener("touchend", () => {
      this.KEY_RIGHT = false;
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
   */
  preventDefaultKeys() {
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
}
