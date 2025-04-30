let canvas;
let world;

function init() {
  canvas = document.getElementById("gamecanvas");
  world = new World(canvas);
}


function move(event){
  if (event.keyCode === 39){
    world.character.moveRight();
  }
  if (event.keyCode === 37){
    world.character.moveLeft();
  }
}




