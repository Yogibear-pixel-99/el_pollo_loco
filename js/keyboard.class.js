class Keyboard {
    KEY_RIGHT = false;
    KEY_LEFT = false;
    KEY_JUMP = false;
    KEY_SHOT = false;

    constructor(){
        this.startKeyboardTouchEvents();
    }

    // creating prevent mobile buttons for hide popup menu

    startKeyboardTouchEvents(){
        let ref1 = document.getElementById("mobile-jump")
            ref1.oncontextmenu = (event) => {
                event.preventDefault();
                event.stopPropagation();
                event.stopImmediatePropagation();
                return false;
            }
            ref1.addEventListener("touchstart", () => {
            this.KEY_JUMP = true;
        })
        let ref2
        document.getElementById("mobile-throw").addEventListener("touchstart", (event) => {
            // event.preventDefault();
            this.KEY_SHOT = true;
        })
        let ref3
        document.getElementById("mobile-left").addEventListener("touchstart", (event) => {
            // event.preventDefault();
            this.KEY_LEFT = true;
        })
        let ref4 = document.getElementById("mobile-right");
            ref4.oncontextmenu = (event) => {
                event.preventDefault();
                event.stopPropagation();
                event.stopImmediatePropagation();
                return false;
            }
            ref4.addEventListener("touchstart", (event) => {
            // event.preventDefault();
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