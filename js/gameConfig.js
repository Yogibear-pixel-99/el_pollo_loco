
let chickenSpawnInterval;


function startGameIntervals () {
  world.character.startChar();
  // start all enemies
  // start boss
  
}



function configChickenRushMode () {
   audio.stopMusic('menuMusic');
    let level = initChickenRushLevel();
  world = new World(
    canvas,
    keyboard,
    pointConfig,
    audio,
    level,
    1
  );
  world.level.endboss.x = 720 * 6;
  audio.resetMusic('chickenRushMusic');
  audio.playMusicOnce('chickenRushMusic');
}

function configNormalMode() {
   audio.stopMusic('menuMusic');
  let level = initNormalLevel();
  world = new World(
    canvas,
    keyboard,
    pointConfig,
    audio,
    level,
  );
  world.level.endboss.energy = 50;
    chickenSpawnInterval = setInterval(() => {
  world.level.enemies.push(
    new Minichicken(world.character.x + canvasWidth * 1),
    new Chicken(world.character.x + canvasWidth * 2)
  )
  }, 12000);

  audio.resetMusic('normalModeMusic');
  audio.playMusicOnce('normalModeMusic');
}

function configHardMode() {
   audio.stopMusic('menuMusic');
  let level = initHardLevel();
  world = new World(
    canvas,
    keyboard,
    pointConfig,
    audio,
    level,
    6
  );
  world.level.endboss.energy = 100;
  chickenSpawnInterval = setInterval(() => {
  world.level.enemies.push(
    new Minichicken(world.character.x + canvasWidth * 1),
    new Chicken(world.character.x + canvasWidth * 2)
  )
  }, 4000);
  audio.resetMusic('normalModeMusic');
  audio.playMusicOnce('normalModeMusic');
}

// KEEP IT ALL IN THE LEVELS JS AS WELL
