/**
 * Main game world class.
 * Manages the game state, objects, collisions, rendering, and game logic.
 */
class World {
  /**
   * The player character.
   * @type {Character}
   */
  character = new Character();

  /**
   * Health bar UI component.
   * @type {Healthbar}
   */
  healthbar = new Healthbar();

  /**
   * Coin bar UI component.
   * @type {Coinbar}
   */
  coinbar = new Coinbar();

  /**
   * Bottle bar UI component.
   * @type {Bottlebar}
   */
  bottlebar = new Bottlebar();

  /**
   * Boss health bar UI component.
   * @type {Bosshealthbar}
   */
  bossHealthbar = new Bosshealthbar();

  /**
   * Audio manager for game sounds.
   * @type {object}
   */
  audio;

  /**
   * Array of bottles that have been thrown.
   * @type {Thrownbottle[]}
   */
  thrownBottles = [];

  /**
   * Player's total score.
   * @type {number}
   */
  playerscore = 0;

  /**
   * Points table for scoring different actions.
   * @type {object}
   */
  pointTable;

  /**
   * Flag indicating if the game has been won.
   * @type {boolean}
   */
  gameWon = false;

  /**
   * Height of the floor in the game world.
   * @type {number}
   */
  floorHeight;

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
   * Current score displayed on the screen.
   * @type {number}
   */
  score = 0;

  /**
   * Interval ID for collision checking loop.
   * @type {number}
   */
  collisionInterval;

  /**
   * Interval ID for world logic loop.
   * @type {number}
   */
  worldInterval;

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

  /**
   * ID for the animation frame request.
   * @type {number}
   */
  drawInterval;

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
    playGameMusic();
  }

  /**
   * Starts the main world logic interval loop.
   */
  runWorldIntervals() {
    this.worldInterval = setInterval(() => {
      this.moveBackground();
      this.checkIfGameIsOver();
      this.checkCluckerSound();
      this.enemyMoveDirection();
    }, 50);
  }

  /**
   * Starts the collision detection interval loop.
   */
  runCollisions() {
    this.collisionInterval = setInterval(() => {
      this.checkEnemyCollisions();
      this.checkCoinCollision();
      this.checkBottleCollision();
      this.checkBossCollision();
      this.checkThrownBottleCollision();
      this.checkHealBottleCollision();
    }, 25);
  }

  /**
   * Updates enemy direction based on player position.
   */
  enemyMoveDirection() {
    this.level.enemies.forEach((enemy) => {
      if (enemy.x < this.character.x - canvasWidth) {
        enemy.otherDirection = true;
      }
      if (enemy.x > this.character.x + canvasWidth) {
        enemy.otherDirection = false;
      }
    });
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
   * Checks and handles the game over state.
   */
  checkIfGameIsOver() {
    if (this.checkGameEnd()) {
      if (this.level.endboss.energy <= 0) {
        this.addPointsToPlayerScore("endbossKilled");
        this.gameWon = true;
      }
      requestAnimationFrame(() => {
        clearInterval(this.worldInterval);
      });
      setTimeout(() => {
        gameOver();
      }, 3000);
    }
  }

  /**
   * Handles collisions between player and enemies.
   * Kills enemies if jumped on, otherwise damages player.
   */
  checkEnemyCollisions() {
    let deadEnemies = [];
    this.level.enemies = this.level.enemies.filter((enemy) => {
      if (this.character.isColliding(enemy)) {
        if (this.character.collisionFromAbove(enemy) && !this.checkGameEnd()) {
          deadEnemies.push(enemy);
          this.deadEnemyRoutine(enemy);
          this.character.jumpOnEnemy();
          this.addPointsToPlayerScore(enemy.scoreNameJump);
          this.level.deadEnemies.push(enemy);
          return false;
        } else {
          this.character.hit();
          this.healthbar.updateHealthbar();
          return true;
        }
      }
      return true;
    });
    deadEnemies.forEach((enemy) => this.spawnNewChickensForRushMode(enemy));
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
   * Checks collision between player and boss enemy.
   * Damages player if collision detected.
   */
  checkBossCollision() {
    if (
      this.character.isColliding(this.level.endboss) ||
      this.character.isCollidingHead(this.level.endboss)
    ) {
      this.character.hit();
      this.healthbar.updateHealthbar();
    }
  }

  /**
   * Handles collisions for thrown bottles against enemies and boss.
   */
  checkThrownBottleCollision() {
    let deadEnemies = [];
    this.thrownBottles.forEach((bottle) => {
      if (
        bottle.y === this.floorPosition(bottle) &&
        bottle.alreadyHittet === false
      ) {
        this.animateBrokenBottle(bottle);
        this.addPointsToPlayerScore(bottle.itemName);
      } else if (
        (bottle.isColliding(this.level.endboss) ||
          bottle.isCollidingHead(this.level.endboss)) &&
        bottle.alreadyHittet === false
      ) {
        this.animateBrokenBottle(bottle);
        if (this.level.endboss.isTriggered) {
          this.level.endboss.hitBoss();
          audio.playSoundClone("bossHitted");
          if (!this.checkGameEnd()) {
            audio.playSoundClone("bossCrys");
          }
          this.addPointsToPlayerScore(this.level.endboss.scoreNameBottle);
        }
      } else {
        this.level.enemies = this.level.enemies.filter((enemy) => {
          if (bottle.isColliding(enemy) && bottle.alreadyHittet === false) {
            this.animateBrokenBottle(bottle);
            deadEnemies.push(enemy);
            this.deadEnemyRoutine(enemy);
            this.addPointsToPlayerScore(enemy.scoreNameBottle);
            this.level.deadEnemies.push(enemy);
            return false;
          }
          return true;
        });
      }
    });
    deadEnemies.forEach((enemy) => this.spawnNewChickensForRushMode(enemy));
  }

  /**
   * Spawns new chickens in chickenRush mode after enemy death.
   * @param {Enemy} enemy - The enemy that was killed.
   */
  spawnNewChickensForRushMode(enemy) {
    if (!enemy) return;
    if (gameMode === "chickenRush") {
      if (enemy instanceof Chicken) {
        this.level.enemies.push(
          new Chicken(this.character.x + 1400),
          new Chicken(this.character.x - 1400)
        );
      } else {
        this.level.enemies.push(
          new Minichicken(this.character.x + 1400),
          new Minichicken(this.character.x - 1400)
        );
      }
    }
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
   * Handles collisions between the player and coins.
   * Collects coins and updates the UI and game state.
   */
  checkCoinCollision() {
    this.level.coins = this.level.coins.filter((coin) => {
      if (this.character.isColliding(coin) && !coin.collected) {
        audio.playSoundClone("collectCoin");
        this.addPointsToPlayerScore("collectCoin");
        this.character.collectCoin();
        coin.collected = true;
        this.level.collectedCoins.push(coin);
        this.deleteCollectedCoin();
        this.coinbar.updateCoinBar();
        if (this.character.coins === 10 && gameMode != "chickenRush") {
          this.level.endboss.startBossFight();
        }
        return false;
      }
      return true;
    });
  }

  /**
   * Removes collected coins from the collectedCoins array after delay.
   */
  deleteCollectedCoin() {
    setTimeout(() => {
      this.level.collectedCoins.splice(0, 1);
    }, 1000);
  }

  /**
   * Handles collisions between the player and healing bottles.
   * Heals the player and updates the UI.
   */
  checkHealBottleCollision() {
    this.level.healBottles.forEach((bottle) => {
      if (this.character.isColliding(bottle) && this.character.energy < 100) {
        audio.playSoundClone("bottleHeal");
        bottle.isCollected();
        this.character.bottleHeal();
        this.healthbar.updateHealthbar();
        this.addPointsToPlayerScore(bottle.itemName);
      }
    });
  }

  /**
   * Handles collisions between the player and collectible bottles.
   */
  checkBottleCollision() {
    this.level.bottles.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        if (world.character.bottles < 5) {
          this.addPointsToPlayerScore(bottle.itemName);
          audio.playRandomSound("collectBottle");
        }
        bottle.isCollected();
        this.character.collectBottle();
        this.bottlebar.updateBottleBar();
      }
    });
  }

  /**
   * Moves the background layers based on player input for scrolling effect.
   */
  moveBackground() {
    this.level.backgrounds.forEach((bg) => {
      if (world.keyboard.KEY_LEFT && this.character.x > -200) {
        bg.x = bg.x + bg.xFactor;
      }
      if (
        world.keyboard.KEY_RIGHT &&
        this.character.x < world.level.level_end_x - 30
      ) {
        bg.x = bg.x - bg.xFactor;
      }
    });
  }

  /**
   * Plays or pauses the clucker sound based on proximity of enemies.
   */
  checkCluckerSound() {
    const enemyNear = this.level.enemies.some((enemy) => {
      return (
        enemy.x > this.character.x - 200 && enemy.x < this.character.x + 450
      );
    });

    if (enemyNear) {
      audio.playSound("cluckern");
    } else {
      audio.pauseSound("cluckern");
    }
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
    this.addObjectsToCanvas(this.level.backgrounds);
    this.addObjectsToCanvas(this.level.enemies);
    this.addObjectsToCanvas(this.level.deadEnemies);
    this.addObjectsToCanvas(this.level.skyObjects);
    this.addObjectsToCanvas(this.level.coins);
    this.addObjectsToCanvas(this.level.collectedCoins);
    this.addObjectsToCanvas(this.level.bottles);
    this.addObjectsToCanvas(this.level.healBottles);
    this.addObjectsToCanvas(this.level.level_end_cactus);
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
    if (
      fullScreen ||
      screenWidthSmallerThan(1300) ||
      screenHeightSmallerThan(830)
    ) {
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
    if (array.length > 0) {
      array.forEach((element) => {
        this.addObjToCanvas(element);
      });
    }
  }

  /**
   * Stops all game-related intervals and animation frames.
   * Used for pausing or ending the game.
   */
  stopAllGameIntervals() {
    cancelAnimationFrame(this.drawInterval);
    world.character.stopAllCharIntervals();
    world.level.enemies.forEach((enemy) => {
      enemy.stopAllEnemyIntervals();
    });
    world.level.endboss.stopAllBossIntervals();
    clearInterval(world.level.endboss.moveDirectionInterval);
    clearInterval(world.level.endboss.gravityInterval);
    this.thrownBottles.forEach((bottle) => {
      clearInterval(bottle.gravityInterval);
    });
    this.level.coins.forEach((coin) => {
      clearInterval(coin.coinInterval);
    });
    clearInterval(this.collisionInterval);
    clearInterval(this.worldInterval);
    clearInterval(chickenSpawnInterval);
    this.level.skyObjects.forEach((cloud) => cloud.cancelAutoMove());
  }

  /**
   * Continues game intervals after a pause or resume.
   */
  continueGameIntervals() {
    this.draw();
    this.character.startChar();
    world.level.enemies.forEach((enemy) => {
      enemy.startEnemy();
    });

    if (this.level.endboss.isTriggered) {
      this.level.endboss.startBossIntervals();
    }
    this.level.endboss.bossMoveDirection();
    this.level.endboss.applyGravity();
    this.runCollisions();
    this.runWorldIntervals();
    this.level.skyObjects.forEach((cloud) => {
      cloud.autoMoveLeft();
    });
    this.thrownBottles.forEach((bottle) => {
      bottle.applyBottleGravity();
    });
    this.level.coins.forEach((coin) => {
      coin.animate();
    });
  }
}
