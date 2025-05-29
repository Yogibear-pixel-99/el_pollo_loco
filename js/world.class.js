class World {
  character = new Character();
  healthbar = new Healthbar();
  coinbar = new Coinbar();
  bottlebar = new Bottlebar();
  bossHealthbar = new Bosshealthbar();
  audio;
  thrownBottles = [];
  playerscore = 0;
  pointTable;
  gameWon = false;
  floorHeight;
  chickenNear = false;
  level;
  score = 0;
  collisionInterval;
  worldInterval;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  drawInterval;

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
    this.playGameMusic();
  }

  runWorldIntervals() {
    this.worldInterval = setInterval(() => {
      this.moveBackground();
      this.checkIfGameIsOver();
      this.checkCluckerSound();
      this.enemyMoveDirection();
    }, 50);
  }

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

  playGameMusic() {
    audio.playSoundLoop("gameAmbience");
  }

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

  setWorld() {
    this.character.world = this;
  }

  checkGameEnd() {
    return this.character.energy <= 0 || this.level.endboss.energy <= 0;
  }

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

  deleteDeadEnemy() {
    setTimeout(() => {
      this.level.deadEnemies.splice(0, 1);
    }, 1000);
  }

  deadEnemyRoutine(enemy) {
    enemy.isKilled();
    audio.playRandomSound("deadChicken");
    this.deleteDeadEnemy();
    enemy.lives = false;
  }

  checkBossCollision() {
    if (
      this.character.isColliding(this.level.endboss) ||
      this.character.isCollidingHead(this.level.endboss)
    ) {
      this.character.hit();
      this.healthbar.updateHealthbar();
    }
  }

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

  animateBrokenBottle(bottle) {
    bottle.alreadyHittet = true;
    this.clearBottleAnimation(bottle);
    this.bottleSplash(bottle);
  }

  clearBottleAnimation(bottle) {
    {
      clearInterval(bottle.throwInAnimationInterval);
      clearInterval(bottle.gravityInterval);
      clearInterval(bottle.moveBottleInterval_x);
    }
  }

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

  addPointsToPlayerScore(scoreTypeName) {
    this.playerscore += this.pointTable[scoreTypeName].points;
    let ref = document.getElementById("player-score");
    ref.innerText = this.playerscore;
  }

  floorPosition(obj) {
    return canvasHeight - obj.height - floorHeight;
  }

  checkCoinCollision() {
    this.level.coins = this.level.coins.filter((coin) => {
      if (this.character.isColliding(coin) && !coin.collected) {
        audio.playSoundClone("collectCoin");
        this.character.collectCoin();
        coin.collected = true;
        this.level.collectedCoins.push(coin);
        this.deleteCollectedCoin();
        this.coinbar.updateCoinBar();
        if (this.character.coins === 1 && gameMode != "chickenRush") {
          this.level.endboss.startBossFight();
        }
        return false;
      }
      return true;
    });
  }

  deleteCollectedCoin() {
    setTimeout(() => {
      this.level.collectedCoins.splice(0, 1);
    }, 1000);
  }

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

  moveBackground() {
    this.level.backgrounds.forEach((bg) => {
      if (world.keyboard.KEY_LEFT && this.character.x > -200) {
        bg.x = bg.x + bg.xFactor;
      }
      if (
        world.keyboard.KEY_RIGHT &&
        this.character.x < world.level.level_end_x
      ) {
        bg.x = bg.x - bg.xFactor;
      }
    });
  }

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

  enemyRunAwayOnCharJump() {
    this.level.enemies.forEach((enemy) => {
      let rndRun = Math.ceil(Math.random() * 6);
      if (
        rndRun === 1 &&
        enemy.lives &&
        enemy.x > this.character.x - 150 &&
        enemy.x < this.character.x + 320
      ) {
        enemy.stopAllEnemyIntervalls();
        enemy.runAway();
      }
    });
  }

  getPlayerScore() {
    this.score = document.getElementById("player-score").innerText;
    this.ctx.font = "30px agudisplay";
    this.ctx.fillText(this.score, canvasWidth - 220, 100);
  }

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
    this.addObjectsToCanvas(this.thrownBottles);
    this.addObjToCanvas(this.level.endboss);
    // this.drawBossHeadHitbox(this.ctx);
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

  // drawBossHeadHitbox(ctx) {
  //   ctx.beginPath();
  //   ctx.lineWidth = "3";
  //   ctx.strokeStyle = "green";
  //   ctx.rect(
  //     this.level.endboss.offsetHead.x,
  //     this.level.endboss.offsetHead.y,
  //     this.level.endboss.offsetHead.width,
  //     this.level.endboss.offsetHead.height
  //   );
  //   ctx.stroke();
  // }

  addObjToCanvas(obj) {
    if (obj.otherDirection) {
      this.flipImage(obj);
    }

    obj.draw(this.ctx);
    // obj.drawFrame(this.ctx);
    // obj.drawOffsetFrame(this.ctx);

    if (obj.otherDirection) {
      this.flipImageBack(obj);
    }
  }

  flipImage(obj) {
    this.ctx.save();
    this.ctx.translate(obj.width, 0);
    this.ctx.scale(-1, 1);
    obj.x = obj.x * -1;
  }

  flipImageBack(obj) {
    obj.x = obj.x * -1;
    this.ctx.restore();
  }

  addObjectsToCanvas(array) {
    if (array.length > 0) {
      array.forEach((element) => {
        this.addObjToCanvas(element);
      });
    }
  }

  // gameOver() {
    // this.stopAllGameIntervals();
    // saveScore();
    // this.stopGameMusic();
    // checkFullscreenMode();
    // showCursor();
    // if (gamePaused) {
    //   gamePaused = false;
    //   return;
    // }
    // this.playEndAudio();
    // this.showGameOverScreen();
    // exit fullscreenmode bzw. show game overscreen in fullscreen mode
  // }



  stopAllGameIntervals() {
    cancelAnimationFrame(this.drawInterval);
    world.character.stopAllCharIntervals();
    world.level.enemies.forEach((enemy) => {
      enemy.stopAllEnemyIntervalls();
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

  // playEndAudio() {
  //   if (this.gameWon) {
  //     audio.playSound("gameWon");
  //   } else {
  //     console.trace();
  //     audio.playSound("gameLost");
  //   }
  // }

  // stopGameMusic() {
  //   audio.pauseMusic("chickenRushMusic");
  //   audio.pauseMusic("normalModeMusic");
  //   audio.pauseSound("cluckern");
  //   audio.pauseSound("gameAmbience");
  // }

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
