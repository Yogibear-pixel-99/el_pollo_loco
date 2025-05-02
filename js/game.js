let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("gamecanvas");
  world = new World(canvas);
}


window.addEventListener('keydown', (event) => {
  console.log(event);
  console.log(keyboard.KEY_LEFT);
  if (event.keyCode === 37) {
    keyboard.KEY_LEFT = true;
    console.log(keyboard.KEY_LEFT);
  }
})

window.addEventListener('keyup', (event) => {
    if (event.keyCode === 37) {
      keyboard.KEY_LEFT = false;
      console.log(keyboard.KEY_LEFT);
    }
})



function move(event){
  if (event.keyCode === 39){
    world.character.moveRight();
  }
  if (event.keyCode === 37){
    world.character.moveLeft();
  }
}




