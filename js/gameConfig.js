
let chickenSpawnInterval;

function configChickenRushMode () {
    let level = initChickenRushLevel();
  world = new World(
    canvas,
    keyboard,
    pointConfig,
    audio,
    level
  );
  world.level.endboss.x = 720 * 6;
}

function configNormalMode() {
  let level = initNormalLevel();
  world = new World(
    canvas,
    keyboard,
    pointConfig,
    audio,
    level
  );
  world.level.endboss.energy = 50;
    chickenSpawnInterval = setInterval(() => {
  world.level.enemies.push(
    new Minichicken(canvasWidth * 5),
    new Chicken(canvasWidth * 5)
  )
  }, 6000);
}

function configHardMode() {
  let level = initHardLevel();
  world = new World(
    canvas,
    keyboard,
    pointConfig,
    audio,
    level
  );
  world.level.endboss.energy = 100;
  chickenSpawnInterval = setInterval(() => {
  world.level.enemies.push(
    new Minichicken(canvasWidth * 5),
    new Chicken(canvasWidth * 5)
  )
  }, 3000);
}

// KEEP IT ALL IN THE LEVELS JS AS WELL

// THINGS TO CHANGE

// boss appearence
// bottlebar appearence
// spawnmode for chickens
// resizemode for chickens
// no bottles
// spawn intervall for enemies
// healmode
// endless bottles
// endboss trigger on coin collect