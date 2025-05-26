
let chickenSpawnInterval;


function startGameIntervals () {
  world.character.startChar();
}



function configChickenRushMode () {
   audio.pauseMusic('menuMusic');
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
  audio.playMusicLoop('chickenRushMusic');
}

function configNormalMode() {
   audio.pauseMusic('menuMusic');
  let level = initNormalLevel();
  world = new World(
    canvas,
    keyboard,
    pointConfig,
    audio,
    level,
  );
  world.level.endboss.energy = 50;
  world.level.endboss.maxEnergy = 50;
    chickenSpawnInterval = setInterval(() => {
  world.level.enemies.push(
    new Minichicken(world.character.x + canvasWidth * 1),
    new Chicken(world.character.x + canvasWidth * 2)
  )
  }, 10000);

  audio.resetMusic('normalModeMusic');
  audio.playMusicLoop('normalModeMusic');
}

function configHardMode() {
   audio.pauseMusic('menuMusic');
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
  world.level.endboss.maxEnergy = 100;
  chickenSpawnInterval = setInterval(() => {
  world.level.enemies.push(
    new Minichicken(world.character.x + canvasWidth * 1),
    new Chicken(world.character.x + canvasWidth * 2)
  )
  }, 4000);
  audio.resetMusic('normalModeMusic');
  audio.playMusicLoop('normalModeMusic');
}

// KEEP IT ALL IN THE LEVELS JS AS WELL
