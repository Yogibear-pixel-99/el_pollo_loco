class Keyboard {
    KEY_RIGHT = false;
    KEY_LEFT = false;
    KEY_JUMP = false;
    KEY_SHOT = false;

    constructor(){
        this.startKeyboardTouchEvents();
    }


    startKeyboardTouchEvents(){
        document.getElementById("mobile-jump").addEventListener("touchstart", (event) => {
            event.preventDefault();
            this.KEY_JUMP = true;
        })

        document.getElementById("mobile-throw").addEventListener("touchstart", (event) => {
            event.preventDefault();
            this.KEY_SHOT = true;
        })

        document.getElementById("mobile-left").addEventListener("touchstart", (event) => {
            event.preventDefault();
            this.KEY_LEFT = true;
        })

        document.getElementById("mobile-right").addEventListener("touchstart", (event) => {
            event.preventDefault();
            event.preventDefault();
            this.KEY_RIGHT = true;
        })

        document.getElementById("mobile-jump").addEventListener("touchend", () => {
            this.KEY_JUMP = false;
        })

        document.getElementById("mobile-throw").addEventListener("touchend", () => {
            this.KEY_SHOT = false;
        })

        document.getElementById("mobile-left").addEventListener("touchend", () => {
            this.KEY_LEFT = false;
        })

        document.getElementById("mobile-right").addEventListener("touchend", () => {
            this.KEY_RIGHT = false;
        })

    }



}

// add ids to touch
// test if touch works with mouseclick
// hide on normal show on mobile - buttons