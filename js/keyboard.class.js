class Keyboard {
  KEY_RIGHT = false;
  KEY_LEFT = false;
  KEY_JUMP = false;
  KEY_SHOT = false;

  constructor() {
    this.startKeyboardTouchEvents();
    this.startKeyControlEvents();
  }

  // creating prevent mobile buttons for hide popup menu

  startKeyboardTouchEvents() {
    let ref1 = document.getElementById("mobile-jump");
    ref1.oncontextmenu = (event) => {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      return false;
    };
    ref1.addEventListener("touchstart", () => {
      this.KEY_JUMP = true;
    });

    let ref2 = document.getElementById("mobile-throw");
    ref2.oncontextmenu = (event) => {
      event.preventDefault();
      event.stopProgapagtion();
      event.stopImmediatePropagation();
      return false;
    };
    ref2.addEventListener("touchstart", (event) => {
      this.KEY_SHOT = true;
    });

    let ref3 = document.getElementById("mobile-left");
    ref2.oncontextmenu = (event) => {
      event.preventDefault();
      event.stopProgapagtion();
      event.stopImmediatePropagation();
      return false;
    };
    ref3.addEventListener("touchstart", (event) => {
      this.KEY_LEFT = true;
    });

    let ref4 = document.getElementById("mobile-right");
    ref4.oncontextmenu = (event) => {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      return false;
    };
    ref4.addEventListener("touchstart", (event) => {
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

    case "d":
      keyboard.KEY_SHOT = true;
      break;

    case "D":
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

    case "d":
      keyboard.KEY_SHOT = false;
      break;

    case "D":
      keyboard.KEY_SHOT = false;
      break;

    default:
      break;
  }
});

  }
}

