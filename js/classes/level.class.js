/**
 * Represents a level in the game, including objects, enemies, backgrounds, and layout logic.
 */
class Level {
  /** 
class Level {
  /** 
   * The coins in the level.
   * @type {Coin[]} 
   */
  coins;

  /**
   * The coins that have been collected.
   */
  collectedCoins = [];

  /**
   * Throwable bottles.
   * @type {ThrowableObject[]}
   */
  bottles;

  /**
   * Health bottles available in the level.
   * @type {Healbottle[]}
   */
  healBottles;

  /**
   * Enemies in the level.
   * @type {Enemies[]}
   */
  enemies;

  /**
   * Enemies that have been killed.
   */
  deadEnemies = [];

  /**
   * The endboss of the level.
   * @type {Endboss}
   */
  endboss;

  /**
   * Sky objects like clouds.
   * @type {Clouds[]}
   */
  skyObjects;

  /**
   * Background layers for the level.
   * @type {BackgroundLayer[]}
   */
  backgrounds;

  /**
   * X coordinate where the level ends.
   * @type {number}
   */
  level_end_x;

  /**
   * Size of the level.
   */
  level_size = 6;

  /**
   * Object representing the beginning and end of the level.
   * @type {Cactus[]}
   */
  level_end_cactus;

  /**
   * Constructs a new level with the provided parameters.
   * @param {Coin[]} coins - Initial coin objects.
   * @param {Bottle[]} bottles - Collectable throwing bottles.
   * @param {Healbottle[]} healBottles - Health-restoring bottles.
   * @param {Enemies[]} enemies - List of enemy objects.
   * @param {Endboss} endboss - The final boss enemy.
   * @param {Clouds[]} clouds - Cloud layer objects.
   * @param {BackgroundLayer[]} backgrounds - Background layers.
   * @param {number} level_end_x - X-position where the level ends.
   * @param {Cactus} level_end_cactus - Final cactus/marker at beginning and end.
   */
  constructor(
    coins,
    bottles,
    healBottles,
    enemies,
    endboss,
    clouds,
    backgrounds,
    level_end_x,
    level_end_cactus
  ) {
    this.coins = coins;
    this.bottles = bottles;
    this.healBottles = healBottles;
    this.enemies = enemies;
    this.endboss = endboss;
    this.skyObjects = clouds;
    this.backgrounds = backgrounds;
    this.level_end_x = level_end_x;
    this.level_end_cactus = level_end_cactus;
    this.setBackgrounds();
    this.addCoins();
  }

  /**
   * Initializes all background layers in parallax order.
   */
  setBackgrounds() {
    this.addAirLayers("./img/5_background/layers/air.png", 0);
    this.addClouds(
      "./img/5_background/layers/4_clouds/1.png",
      "./img/5_background/layers/4_clouds/2.png",
      0
    );
    this.addLayers(
      "./img/5_background/layers/3_third_layer/1.png",
      "./img/5_background/layers/3_third_layer/2.png",
      -3
    );
    this.addLayers(
      "./img/5_background/layers/2_second_layer/1.png",
      "./img/5_background/layers/2_second_layer/2.png",
      -1.5
    );
    this.addLayers(
      "./img/5_background/layers/1_first_layer/1.png",
      "./img/5_background/layers/1_first_layer/2.png",
      0
    );
  }

  /**
   * Adds clouds to the background as sky objects.
   * @param {string} firstLayer - Image path for first cloud layer.
   * @param {string} secondLayer - Image path for second cloud layer.
   */
  addClouds(firstLayer, secondLayer) {
    for (let lvlIndex = 0; lvlIndex < 5; lvlIndex++) {
      this.skyObjects.push(
        new Clouds(firstLayer, 0.1, (lvlIndex * 2 - 1) * (canvasWidth - 1)),
        new Clouds(secondLayer, 0.2, lvlIndex * 2 * (canvasWidth - 1))
      );
    }
  }

  /**
   * Adds background layers with a parallax effect.
   * @param {string} firstLayer - Image path for first layer.
   * @param {string} secondLayer - Image path for second layer.
   * @param {number} parallaxFactor - Scrolling speed factor.
   */
  addLayers(firstLayer, secondLayer, parallaxFactor) {
    for (let lvlIndex = 0; lvlIndex < this.level_size; lvlIndex++) {
      this.backgrounds.push(
        new BackgroundLayer(
          firstLayer,
          (lvlIndex * 2 - 1) * (canvasWidth - 1),
          parallaxFactor
        ),
        new BackgroundLayer(
          secondLayer,
          lvlIndex * 2 * (canvasWidth - 1),
          parallaxFactor
        )
      );
    }
  }

  /**
   * Adds the air layer behind all others.
   * @param {string} layer - Image path for air layer.
   * @param {number} parallaxFactor - Scrolling speed factor.
   */
  addAirLayers(layer, parallaxFactor) {
    for (let lvlIndex = 0; lvlIndex < this.level_size; lvlIndex++) {
      this.backgrounds.push(
        new BackgroundLayer(
          layer,
          (lvlIndex * 2 - 1) * (canvasWidth - 1),
          parallaxFactor
        ),
        new BackgroundLayer(
          layer,
          lvlIndex * 2 * (canvasWidth - 1),
          parallaxFactor
        )
      );
    }
  }

  /**
   * Adds randomly positioned coin objects across the level.
   */
  addCoins() {
    for (let lvlIndex = 0; lvlIndex < this.level_size - 1; lvlIndex++) {
      this.coins.push(
        new Coin(this.getXForCoins(lvlIndex), this.getYForCoins()),
        new Coin(this.getXForCoins(lvlIndex), this.getYForCoins())
      );
    }
  }

  /**
   * Generates a valid X position for a coin, avoiding overlap with start/end areas.
   * @param {number} lvlIndex - Index of the current level segment.
   * @returns {number} - X position for the coin.
   */
  getXForCoins(lvlIndex) {
    let x =
      Math.random() * (canvasWidth * (lvlIndex + 1) - canvasWidth * lvlIndex) +
      canvasWidth * lvlIndex;

    if (
      x > this.level_end_x ||
      (x > 100 && x < 300) ||
      x < -100 ||
      x > this.level_end_x
    ) {
      return this.getXForCoins(lvlIndex);
    } else {
      return x;
    }
  }

  /**
   * Generates a random Y position for a coin above the floor.
   * @returns {number} - Y position for the coin.
   */
  getYForCoins() {
    return Math.random() * (canvasHeight - 158 - 130) + 130;
  }

  /**
   * Spawns new chickens in chickenRush mode after enemy death.
   * @param {Enemy} enemy - The enemy that was killed.
   */
  spawnNewChickensForRushMode(enemy) {
    if (gameMode === "chickenRush") {
      if (enemy instanceof Chicken) {
        world.level.enemies.push(
          new Chicken(world.character.x + 1400),
          new Chicken(world.character.x - 1400)
        );
      } else {
        world.level.enemies.push(
          new Minichicken(world.character.x + 1400),
          new Minichicken(world.character.x - 1400)
        );
      }
    }
  }
}
