/**
 * Interval ID for spawning chickens periodically in the game.
 * @type {number|undefined}
 */
let chickenSpawnInterval;

/**
 * Starts the game intervals, primarily beginning the character actions.
 * Typically called when the game officially starts.
 */
function startGameIntervals() {
  world.character.startChar();
}

/**
 * Configures the game for Chicken Rush mode:
 * - Pauses menu music.
 * - Initializes the Chicken Rush level.
 * - Creates a new World instance with the Chicken Rush level.
 * - Positions the endboss far to the right.
 * - Starts looping Chicken Rush music.
 * - Clears any existing coins in the level.
 */
function configChickenRushMode() {
  audio.pauseMusic('menuMusic');
  let level = initChickenRushLevel();
  world = new World(
    canvas,
    keyboard,
    pointConfig,
    audio,
    level
  );
  world.level.endboss.x = 720 * 6;
  audio.resetMusic('chickenRushMusic');
  audio.playMusicLoop('chickenRushMusic');
  world.level.coins.splice(0, world.level.coins.length);
}

/**
 * Configures the game for Normal mode:
 * - Pauses menu music.
 * - Initializes the Normal level.
 * - Creates a new World instance with the Normal level.
 * - Sets endboss energy and character energy to defaults.
 * - Starts an interval that spawns chickens and minichickens near the character
 *   every 14 seconds if enemies are 10 or less and game is not paused.
 * - Starts looping normal mode music.
 */
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
  world.character.energy = 100;

  chickenSpawnInterval = setInterval(() => {
    if (world.level.enemies.length <= 10 && !gamePaused) {
      world.level.enemies.push(
        new Minichicken(world.character.x + canvasWidth * Math.ceil((Math.random() + 1))),
        new Chicken(world.character.x + canvasWidth * Math.ceil((Math.random() + 1)))
      );
    }
  }, 14000);

  audio.resetMusic('normalModeMusic');
  audio.playMusicLoop('normalModeMusic');
}

/**
 * Configures the game for Hard mode:
 * - Pauses menu music.
 * - Initializes the Hard level.
 * - Creates a new World instance with the Hard level and difficulty multiplier 6.
 * - Sets endboss energy and max energy to 100.
 * - Starts an interval that spawns chickens and minichickens near the character
 *   every 4 seconds if game is not paused.
 * - Starts looping normal mode music.
 */
function configHardMode() {
  audio.pauseMusic('menuMusic');
  let level = initHardLevel();
  world = new World(
    canvas,
    keyboard,
    pointConfig,
    audio,
    level
  );
  world.level.endboss.energy = 100;
  world.level.endboss.maxEnergy = 100;

  chickenSpawnInterval = setInterval(() => {
    if (!gamePaused) {
      world.level.enemies.push(
        new Minichicken(world.character.x + canvasWidth * 1),
        new Chicken(world.character.x + canvasWidth * 2)
      );
    }
  }, 4000);

  audio.resetMusic('normalModeMusic');
  audio.playMusicLoop('normalModeMusic');
}
