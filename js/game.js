let canvas;
let world;
let keyboard = new Keyboard();
canvasHeight = 480;
canvasWidth = 720;
floorHeight = 58;

const highscores = [
  { name: "Anna", score: 1200 },
  { name: "Ben", score: 950 },
  { name: "Chris", score: 870 },
  { name: "Daria", score: 850 },
  { name: "Erik", score: 800 },
  { name: "Fiona", score: 780 },
  { name: "Gustav", score: 770 },
  { name: "Hanna", score: 750 },
  { name: "Isa", score: 700 },
  { name: "Jonas", score: 680 },
];

// let highscores = {};

const MAIN_URL =
  "https://el-pollo-loco-79444-default-rtdb.europe-west1.firebasedatabase.app/";

function init() {
  canvas = document.getElementById("gamecanvas");
  getHighscores();
}

function startNormalGame() {
  canvas = document.getElementById("gamecanvas");
  world = new World(canvas, keyboard, pointConfig, canvasHeight, canvasWidth, floorHeight);
}

function getHighscores() {
  // get high von api
  // wenn leer füge template ein.
  renderHighscore();
  renderGamePointsTable();
  // bei spielende namen und highscore passend ins object einfügen.
  // object in die database - PUT
  // neu im HTML rendern.
}

async function getHighscoreFromApi() {
  try {
    let response = await fetch(MAIN_URL + ".json");
    if (!response.ok) {
      throw new Error();
    } else {
      let data = await response.json();
      if (data) {
        highscores = Object.values(data);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

function renderHighscore() {
  let ref = document.getElementById("highscore");
  let data = "";
  for (let index = 0; index < highscores.length; index++) {
    const element = highscores[index];
    data += highscoreTemp(element);
  }
  ref.innerHTML = data;
}

function highscoreTemp(element) {
  return `<div class="score-wrapper">
            <div class="player-name">${element.name}</div>
            <div class="score">${element.score}</div>          
          </div>`;
}

function getPointsTemp(element) {
  return `<div class="item-point-wrapper">
            <span class="item-name">${element[1].name}</span>
            <span class="item-points" id="${element[0]}">${element[1].points}</span>
          </div>
  `;
}


function renderGamePointsTable(){
  let ref = document.getElementById('game-points-table');
  let data = '';
      Object.entries(pointConfig).forEach((element) => {
        data += getPointsTemp(element);
      })
    ref.innerHTML = data;
}

const pointConfig = {
  chickenJumpKill: {
    name: "chicken jump",
    points: 10,
  },
  chickenBottleHit: {
    name: "chicken bottle hit",
    points: 20,
  },
  miniChickenJumpKill: {
    name: "mini chicken jump",
    points: 30,
  },
  miniChickenBottleHit: {
    name: "mini chicken bottle hit",
    points: 40,
  },
  collectCoin: {
    name: "collect coin",
    points: 10,
  },
  collectBottle: {
    name: "collect bottle",
    points: 5,
  },
  bottleMissed: {
    name: "bottle missed",
    points: -50,
  },
  endbossBottleHit: {
    name: "endboss hit",
    points: 50,
  },
  endbossKilled: {
    name: "endboss killed",
    points: 200,
  },
};

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

    default:
      break;
  }
});


document.addEventListener('DOMContentLoaded', () => {
document.querySelectorAll('.opt-wrapper').forEach((element) => {
  element.addEventListener('mousedown', () => {
    element.style.cursor = "url('./img/cursor-active.png'), auto";
  });
  element.addEventListener('mouseup', () => {
    element.style.cursor = "url('./img/cursor.png'), auto";
  });
});
})




// throw bottel left, animation should turn.
// jump on chicken
  // kill chicken
  // score +
  // jump a bit y -

// collect coins should score
// endboss
  // hit endboss
    // score +
    // live -
    // trigger animation
  // kill endboss
  // score +
  // trigger final screen

// sounds for pepe

// level logic for bottles, chicken and boss


// adjust throw width

// call boss collition interval at pull

// enemy bottle hit auslagern in enemies von world

// BACKGROUND TO THE SETTINGS MENUS

