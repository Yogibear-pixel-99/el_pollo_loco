let canvas;
let world;

function init() {
  canvas = document.getElementById("gamecanvas");
  world = new World(canvas);
  moveClouds();
}


function move(event){
  if (event.keyCode === 39){
    world.character.moveRight();
  }
  if (event.keyCode === 37){
    world.character.moveLeft();
  }
}


function moveClouds(){
  world.skyObjects.forEach((element) => {
      (element.autoMoveLeft())})
 
  requestAnimationFrame(moveClouds);
}

