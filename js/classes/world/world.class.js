/**
 * Main game world class.
 * Manages the game state, objects, collisions, rendering, and game logic.
 */
class World {
  character = new Character();
  healthbar = new Healthbar();
  coinbar = new Coinbar();
  bottlebar = new Bottlebar();
  bossHealthbar = new Bosshealthbar();
  thrownBottles = [];
  playerscore = 0;
  gameWon = false;
  floorHeight;
  score = 0;
  /**
   * Audio manager for game sounds.
   * @type {object}
   */
  audio;

  /**
   * Points table for scoring different actions.
   * @type {object}
   */
  pointTable;

  /**
   * Flag if a chicken enemy is near the player.
   * @type {boolean}
   */
  chickenNear = false;

  /**
   * Current game level object.
   * @type {Level}
   */
  level;

  /**
   * Canvas HTML element for rendering.
   * @type {HTMLCanvasElement}
   */
  canvas;

  /**
   * 2D rendering context of the canvas.
   * @type {CanvasRenderingContext2D}
   */
  ctx;

  /**
   * Keyboard input handler.
   * @type {Keyboard}
   */
  keyboard;

  /**
   * Camera horizontal offset for scrolling.
   * @type {number}
   */
  camera_x = 0;

  collisionInterval;
  worldInterval;
  drawInterval;

  /**
   * A config array, to draw all objects from the level to the canvas.
   * @type {String[]}
   */
  allLevelObjectsConfig = [
    "backgrounds",
    "enemies",
    "deadEnemies",
    "skyObjects",
    "coins",
    "collectedCoins",
    "bottles",
    "healBottles",
    "level_end_cactus",
  ];

  /**
   * Creates an instance of the game world.
   * @param {HTMLCanvasElement} canvas - The canvas element to render to.
   * @param {Keyboard} keyboard - Keyboard input manager.
   * @param {object} pointTable - Points configuration for scoring.
   * @param {object} audio - Audio manager.
   * @param {Level} level - The current game level.
   */
  constructor(canvas, keyboard, pointTable, audio, level) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.pointTable = pointTable;
    this.audio = audio;
    this.level = level;
    this.draw();
    this.setWorld();
    this.runCollisions();
    this.runWorldIntervals();
    audio.playSoundLoop("gameAmbience");
  }

  /**
   * Starts the main world logic interval loop.
   */
  runWorldIntervals() {
    this.worldInterval = setInterval(() => {
      if (gamePaused) return;
      moveBackground();
      checkIfGameIsOver();
      audio.checkCluckerSound();
      enemyMoveDirection();
    }, 50);
  }

  /**
   * Starts the collision detection interval loop.
   */
  runCollisions() {
    this.collisionInterval = setInterval(() => {
      if (gamePaused) return;
      checkEnemyCollisions();
      checkCoinCollision();
      checkBottleCollision();
      checkBossCollision();
      checkThrownBottleCollision();
      checkHealBottleCollision();
    }, 25);
  }

  /**
   * Assigns this world instance to the character.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Checks if the game should end based on character or boss energy.
   * @returns {boolean}
   */
  checkGameEnd() {
    return this.character.energy <= 0 || this.level.endboss.energy <= 0;
  }

  /**
   * Removes a dead enemy from the deadEnemies array after delay.
   */
  deleteDeadEnemy() {
    setTimeout(() => {
      this.level.deadEnemies.splice(0, 1);
    }, 1000);
  }

  /**
   * Handles enemy death routine: stops enemy, plays sound, marks as dead.
   * @param {Enemy} enemy - The enemy to handle.
   */
  deadEnemyRoutine(enemy) {
    enemy.isKilled();
    audio.playRandomSound("deadChicken");
    this.deleteDeadEnemy();
    enemy.lives = false;
  }

  /**
   * Checks if the bottle has already hittet and hittet the floor.
   * @param {Object} bottle - The thrown bottle.
   * @returns {boolean}
   */
  bottleHittetFloor(bottle) {
    return (
      bottle.y === this.floorPosition(bottle) && bottle.alreadyHittet === false
    );
  }

  /**
   * Checks if the bottle has already hittet and hittet the boss.
   * @param {Object} bottle - The thrown bottle.
   * @returns {boolean}
   */
  bottleHittetBoss(bottle) {
    return (
      (bottle.isColliding(this.level.endboss) ||
        bottle.isCollidingHead(this.level.endboss)) &&
      bottle.alreadyHittet === false
    );
  }

  /**
   * Animates the breaking of a thrown bottle and marks it as hit.
   * @param {Thrownbottle} bottle - The bottle to animate.
   */
  animateBrokenBottle(bottle) {
    bottle.alreadyHittet = true;
    this.clearBottleAnimation(bottle);
    this.bottleSplash(bottle);
  }

  /**
   * Clears all intervals related to a bottle's animation and movement.
   * @param {Thrownbottle} bottle - The bottle to clear intervals for.
   */
  clearBottleAnimation(bottle) {
    clearInterval(bottle.throwInAnimationInterval);
    clearInterval(bottle.gravityInterval);
    clearInterval(bottle.moveBottleInterval_x);
  }

  /**
   * Plays the splash animation for a broken bottle and removes it after animation.
   * @param {Thrownbottle} bottle - The bottle to animate splash.
   */
  bottleSplash(bottle) {
    let bottleIndex = world.thrownBottles.indexOf(bottle);
    bottle.img = bottle.animatedImages[bottle.BOTTLE_SPLASH_ANIMATION[0]];
    let count = 1;
    audio.playRandomSound("bottleBreak");
    let interval = setInterval(() => {
      if (gamePaused) return;
      if (count < bottle.BOTTLE_SPLASH_ANIMATION.length) {
        bottle.playAnimationOnce(bottle.BOTTLE_SPLASH_ANIMATION, count);
        count++;
      } else {
        world.thrownBottles.splice(bottleIndex, 1);
        clearInterval(interval);
      }
    }, 100);
  }

  /**
   * Adds points to the player score and updates the UI.
   * @param {string} scoreTypeName - The score key to add points from pointTable.
   */
  addPointsToPlayerScore(scoreTypeName) {
    this.playerscore += this.pointTable[scoreTypeName].points;
    let ref = document.getElementById("player-score");
    ref.innerText = this.playerscore;
  }

  /**
   * Calculates the floor position for a given object.
   * @param {object} obj - The object to calculate floor position for.
   * @returns {number} The y position on the floor.
   */
  floorPosition(obj) {
    return canvasHeight - obj.height - floorHeight;
  }

  /**
   * Removes collected coins from the collectedCoins array after delay.
   */
  deleteCollectedCoin() {
    this.level.collectedCoins.splice(0, 1);
  }

  /**
   * Causes enemies to run away randomly when the player jumps near them.
   */
  enemyRunAwayOnCharJump() {
    this.level.enemies.forEach((enemy) => {
      let rndRun = Math.ceil(Math.random() * 6);
      if (
        rndRun === 1 &&
        enemy.lives &&
        enemy.x > this.character.x - 150 &&
        enemy.x < this.character.x + 320
      ) {
        enemy.stopAllEnemyIntervals();
        enemy.runAway();
      }
    });
  }

  /**
   * Retrieves and displays the player's current score on the canvas.
   */
  getPlayerScore() {
    this.score = document.getElementById("player-score").innerText;
    this.ctx.font = "30px agudisplay";
    this.ctx.fillText(this.score, canvasWidth - 220, 100);
  }

  /**
   * Main draw method called every animation frame.
   * Clears canvas and draws all game objects with proper translations.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.allLevelObjectsConfig.forEach((obj) => {
      this.addObjectsToCanvas(this.level[obj]);
    });
    this.addObjectsToCanvas(this.thrownBottles);
    this.addObjToCanvas(this.level.endboss);
    this.addObjToCanvas(this.character);
    this.ctx.translate(-this.camera_x, 0);
    this.addObjToCanvas(this.healthbar);
    if (gameMode != "chickenRush") {
      this.addObjToCanvas(this.coinbar);
    }
    this.addObjToCanvas(this.bottlebar);
    if (this.level.endboss.isTriggered) {
      this.addObjToCanvas(this.bossHealthbar);
    }
    if (fullScreen || isSmallScreen()) {
      this.getPlayerScore();
    }
    let self = this;
    this.drawInterval = requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Adds a single game object to the canvas, flipping if needed.
   * @param {Drawable} obj - The object to draw.
   */
  addObjToCanvas(obj) {
    if (obj.otherDirection) {
      this.flipImage(obj);
    }
    obj.draw(this.ctx);
    if (obj.otherDirection) {
      this.flipImageBack(obj);
    }
  }

  /**
   * Flips the canvas context horizontally for drawing mirrored images.
   * @param {Drawable} obj - Object whose image to flip.
   */
  flipImage(obj) {
    this.ctx.save();
    this.ctx.translate(obj.width, 0);
    this.ctx.scale(-1, 1);
    obj.x = obj.x * -1;
  }

  /**
   * Restores the canvas context and flips the object back.
   * @param {Drawable} obj - Object to flip back.
   */
  flipImageBack(obj) {
    obj.x = obj.x * -1;
    this.ctx.restore();
  }

  /**
   * Adds multiple game objects from an array to the canvas.
   * @param {Drawable[]} array - Array of drawable objects.
   */
  addObjectsToCanvas(array) {
    try {
      if (array.length > 0) {
        array.forEach((element) => {
          this.addObjToCanvas(element);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}
