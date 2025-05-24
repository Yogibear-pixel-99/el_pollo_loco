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
  allWorldIntervals = [
    "collisionInterval",
    "cluckerInterval",
    "updateScoreInterval",
    "backgroundMoveInterval",
    "enemyMoveDirectionInterval",
    "checkGameOverInterval"
  ];
  collisionInterval;
  cluckerInterval;
  updateScoreInterval;
  backgroundMoveInterval;
  enemyMoveDirectionInterval;
  checkGameOverInterval;
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
    this.moveBackground();
    this.updatePlayerScore();
    this.checkIfGameIsOver();
    this.playGameMusic();
    this.checkCluckerSound();
    this.enemyMoveDirection();
  }

  playGameMusic() {
    audio.sfx.gameAmbience.loop = true;
    audio.sfx.gameAmbience.play();
  }

  enemyMoveDirection() {
    this.enemyMoveDirectionInterval = setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (enemy.x < this.character.x - canvasWidth) {
          enemy.otherDirection = true;
        }
        if (enemy.x > this.character.x + canvasWidth) {
          enemy.otherDirection = false;
        }
      });
    }, 500);
  }

  setWorld() {
    this.character.world = this;
  }

  checkGameEnd() {
    return this.character.energy <= 0 || this.level.endboss.energy <= 0;
  }

  checkIfGameIsOver() {
    let interval = setInterval(() => {
      if (this.checkGameEnd()) {
        clearInterval(interval);
        setTimeout(() => {
          if (this.level.endboss.energy <= 0) {
            this.gameWon = true;
          }
          if (gameHasStarted) {
          this.gameOver();
          }
        }, 3000);
      }
    }, 500);
  }

  runCollisions() {
    this.collisionInterval = setInterval(() => {
      this.checkEnemyCollisions();
      this.checkCoinCollision();
      this.checkBottleCollision();
      this.checkBossCollision();
      this.checkThrownBottleCollision();
    }, 25);
  }

  checkEnemyCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && enemy.lives === true) {
        if (this.character.collisionFromAbove(enemy) && enemy.lives === true) {
          enemy.isKilled();
          this.spawnNewChickensForRushMode(enemy);
          audio.playRandomSound("deadChicken");
          this.character.jumpOnEnemy();
          this.addPointsToPlayerScore(enemy.scoreNameJump);
          enemy.lives = false;
        } else {
          this.character.hit();
          this.healthbar.updateHealthbar();
        }
      }
    });
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
          audio.playSound("bossHitted");
          audio.playSound("bossCrys");
          this.addPointsToPlayerScore(this.level.endboss.scoreNameBottle);
        }
      } else {
        this.level.enemies.forEach((enemy) => {
          if (bottle.isColliding(enemy) && bottle.alreadyHittet === false) {
            this.animateBrokenBottle(bottle);
            this.spawnNewChickensForRushMode(enemy);
            enemy.isKilled();
            audio.playRandomSound("deadChicken");
            this.addPointsToPlayerScore(enemy.scoreNameBottle);
          }
        });
      }
    });
  }

  spawnNewChickensForRushMode(enemy) {
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

  updatePlayerScore() {
      let ref = document.getElementById("player-score");
      ref.innerText = this.playerscore;
  }

  floorPosition(obj) {
    return canvasHeight - obj.height - floorHeight;
  }

  checkCoinCollision() {
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin) && coin.collected == false) {
        audio.playSound("collectCoin");
        this.character.collectCoin();
        this.character.coinHeal();
        coin.isCollectedAnimation();
        coin.collected = true;
        this.coinbar.updateCoinBar();
        this.addPointsToPlayerScore(coin.itemName);
        if (this.character.coins === 1 && gameMode != "chickenRush") {
          this.level.endboss.startBossFight();
        }
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

  addPointsToPlayerScore(scoreTypeName) {
    this.playerscore += this.pointTable[scoreTypeName].points;
    this.updatePlayerScore();
  }

  moveBackground() {
    this.backgroundMoveInterval = setInterval(() => {
      this.level.backgrounds.forEach((bg) => {
        if (world.keyboard.KEY_LEFT && this.character.x > -200) {
          bg.x = bg.x + bg.xFactor;
        }
        if ( world.keyboard.KEY_RIGHT &&
          this.character.x < world.level.level_end_x) {
             bg.x = bg.x - bg.xFactor;
          }
      });
    }, 100);
  }

      logBgs(){
        for (let index = 0; index < world.level.backgrounds.length; index++) {
            console.log(world.level.backgrounds[index].img.currentSrc);
            
        }
    }

  checkCluckerSound() {
    this.cluckerInterval = setInterval(() => {
      let charX = this.character.x;
      this.chickenNear = false;
      this.level.enemies.forEach((enemy) => {
        if (enemy.x > charX - 200 && enemy.x < charX + 450) {
          this.chickenNear = true;
        }
        if (this.chickenNear === true) {
          this.audio.sfx.cluckern.play();
        } else {
          this.audio.sfx.cluckern.pause();
        }
      });
    }, 500);
  }

  enemyRunAwayOnCharJump() {
    this.level.enemies.forEach((enemy) => {
      let rndRun = Math.ceil(Math.random() * 4);
      if (
        rndRun === 1 &&
        enemy.lives &&
        enemy.x > this.character.x - 150 &&
        enemy.x < this.character.x + 320
      ) {
        enemy.clearAllEnemyIntervalls();
        enemy.runAway();
      }
    });
  }

  getPlayerScore() {
    this.score = document.getElementById("player-score").innerText;
    this.ctx.font = "30px agudisplay";
    this.ctx.fillText(this.score, canvasWidth - 220, 100);
    console.log(this.score);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToCanvas(this.level.backgrounds);
    this.addObjectsToCanvas(this.level.enemies);
    this.addObjectsToCanvas(this.level.skyObjects);
    this.addObjectsToCanvas(this.level.coins);
    this.addObjectsToCanvas(this.level.bottles);
    this.addObjectsToCanvas(this.thrownBottles);
    this.addObjToCanvas(this.level.endboss);
    // this.drawBossHeadHitbox(this.ctx);
    this.addObjToCanvas(this.character);
    this.ctx.translate(-this.camera_x, 0);
    this.addObjToCanvas(this.healthbar);
    this.addObjToCanvas(this.coinbar);
    this.addObjToCanvas(this.bottlebar);
    if (this.level.endboss.isTriggered) {
      this.addObjToCanvas(this.bossHealthbar);
    }
    if (fullScreen) {
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

  gameOver() {
    if (this.gameWon) {
      this.addPointsToPlayerScore("endbossKilled");
      this.audio.sfx.gameWon.play();
    } else {
      this.audio.sfx.gameLost.play();
    }
    cancelAnimationFrame(this.drawInterval);
    gameHasStarted = false;
    document.body.style.cursor = 'url("./img/cursor.png"), auto';
    audio.stopMusic("chickenRushMusic");
    audio.stopMusic("normalModeMusic");
    this.showGameOverScreen();
    checkFullscreenMode();
    this.audio.sfx.cluckern.pause();
    this.stopAllGameIntervals();
    saveScore();
  }

  showGameOverScreen() {
    this.gameWon
      ? showSingleContainerById("canvas-won-container")
      : showSingleContainerById("canvas-lost-container");
  }

  stopAllGameIntervals() {
    this.stopAllWorldIntervals();
    this.stopEnemyIntervals();
    this.level.endboss.stopAllBossIntervals();
    this.character.stopAllCharIntervals();
    this.stopAllCloudIntervals();
    this.clearAllGameConfigIntervals();
  }

  stopAllCloudIntervals() {
    this.level.skyObjects.forEach((cloud) => cloud.cancelAutoMove());
  }

  stopAllWorldIntervals() {
    this.allWorldIntervals.forEach((interval) => {
      clearInterval(this[interval]);
    });
  }

  stopEnemyIntervals() {
    this.level.enemies.forEach((enemy) => {
      enemy.clearAllEnemyIntervalls();
    });
  }

  clearAllGameConfigIntervals() {
    clearInterval(chickenSpawnInterval);
  }
}
