class Keyboard {
  KEY_RIGHT = false;
  KEY_LEFT = false;
  KEY_JUMP = false;
  KEY_SHOT = false;

  constructor() {
    this.startKeyboardTouchEvents();
    this.startKeyControlEvents();
  }


  startKeyboardTouchEvents() {
    document.getElementById("mobile-jump").addEventListener("touchstart", () => {
      this.KEY_JUMP = true;
    });

    document.getElementById("mobile-throw").addEventListener("touchstart", () => {
      this.KEY_SHOT = true;
    });

    document.getElementById("mobile-left").addEventListener("touchstart", () => {
      this.KEY_LEFT = true;
    });

    document.getElementById("mobile-right").addEventListener("touchstart", () => {
      this.KEY_RIGHT = true;
    });

    document.getElementById("mobile-pause").addEventListener("touchstart", () => {
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


  startKeyControlEvents(){
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
      this.KEY_SHOT = true;
      break;

    case "Alt":
      this.KEY_SHOT = true;
      break;

    case "d":
      this.KEY_SHOT = true;
      break;

    case "D":
      this.KEY_SHOT = true;
      break;

    default:
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
      this.KEY_SHOT = false;
      break;

    case "Alt":
      this.KEY_SHOT = false;
      break;

    case "d":
      this.KEY_SHOT = false;
      break;

    case "D":
      this.KEY_SHOT = false;
      break;

    default:
      break;
  }
});

  }
}

