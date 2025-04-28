

let canvas;
let ctx;
let character = new MovableObject();

function init(){
    canvas = document.getElementById('gamecanvas');
    ctx = canvas.getContext('2d');
    console.log(character);
}