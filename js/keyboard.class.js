class Keyboard {
    KEY_RIGHT = false;
    KEY_LEFT = false;
    KEY_JUMP = false;
    KEY_SHOT = false;

    constructor(){
        this.startKeyboardTouchEvents();
    }


    startKeyboardTouchEvents(){
        document.getElementById("").addEventListener("mousedown", () => {
            this.KEY_JUMP = true;
        })

        document.getElementById("").addEventListener("touchstart", () => {
            this.KEY_SHOT = true;
        })

        document.getElementById("").addEventListener("touchstart", () => {
            this.KEY_LEFT = true;
        })

        document.getElementById("").addEventListener("touchstart", () => {
            this.KEY_RIGHT = true;
        })

        document.getElementById("").addEventListener("mouseup", () => {
            this.KEY_JUMP = false;
        })

        document.getElementById("").addEventListener("touchend", () => {
            this.KEY_SHOT = false;
        })

        document.getElementById("").addEventListener("touchend", () => {
            this.KEY_LEFT = false;
        })

        document.getElementById("").addEventListener("touchend", () => {
            this.KEY_RIGHT = false;
        })

    }



}

// add ids to touch
// test if touch works with mouseclick
// hide on normal show on mobile - buttons