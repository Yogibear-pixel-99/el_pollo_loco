class World {
  character = new Character();
  healthbar = new Healthbar(20, 10);
  coinbar = new Coinbar(20, 50);
  bottlebar = new Bottlebar(20, 90);
  thrownBottles = [];
  playerscore = 0;
  pointTable;

  canvasHeight;
  canvasWidth;
  floorHeight;

  level = level1;

  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  constructor(
    canvas,
    keyboard,
    pointTable,
    canvasHeight,
    canvasWidth,
    floorHeight
  ) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.pointTable = pointTable;
    this.canvasHeight = canvasHeight;
    this.canvasWidth = canvasWidth;
    this.floorHeight = floorHeight;
    this.draw();
    this.setWorld();
    this.runCollisions();
    this.moveBackground();
    this.updatePlayerScore();
  }

  setWorld() {
    this.character.world = this;
  }

  runCollisions() {
    setInterval(() => {
      this.checkEnemyCollisions();
      this.checkCoinCollision();
      this.checkBottleCollision();
      this.checkBossCollision();
    }, 25);
  }

  checkEnemyCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && enemy.isDead === false) {
        if (
          this.character.collisionFromAbove(enemy) &&
          enemy.isDead === false
        ) {
          enemy.jumpKill();
          this.character.jumpOnEnemy();
          this.addPointsToPlayerScore(enemy.scoreNameJump);
          enemy.isDead = true;
          console.log("jumped on this:");
        } else {
          console.log("Not jumped on enemy");
          this.character.hit();
        }
      }

      this.thrownBottles.forEach((bottle) => {
        if (this.level.enemies.length === 0) {
          this.animateBrokenBottle(bottle);
        } else {
          if (bottle.isColliding(enemy) && bottle.hittetEnemy == false) {
            this.enemyBottleHit(enemy);
            this.animateBrokenBottle(bottle);
            
          }
          if (
            bottle.y == this.floorPosition(bottle) &&
            bottle.hittetEnemy == false
          ) {
            this.animateBrokenBottle(bottle);
          }
        }
      });
    });
  }

  animateBrokenBottle(bottle) {
    bottle.hittetEnemy = true;
    this.clearBottleAnimation(bottle);
    this.bottleSplash(bottle);
  }

  clearBottleAnimation(bottle) {
    if (bottle.y == bottle.floorPosition() || bottle.hittetEnemy === true) {
      clearInterval(bottle.throwInAnimationInterval);
      clearInterval(bottle.gravityInterval);
      clearInterval(bottle.moveBottleInterval_x);
    }
  }

  bottleSplash(bottle) {
    let bottleIndex = world.thrownBottles.indexOf(bottle);
    bottle.img = bottle.animatedImages[bottle.BOTTLE_SPLASH_ANIMATION[0]];
    let count = 1;
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
    setInterval(() => {
      let ref = document.getElementById("player-score");
      ref.innerText = this.playerscore;
    }, 500);
  }

  checkBossCollision() {
    if (
      this.character.isColliding(this.level.endboss) ||
      this.character.isCollidingHead(this.level.endboss)
    ) {
      this.character.hit();
    }
    this.thrownBottles.forEach((bottle) => {
      if (
        (bottle.isColliding(this.level.endboss) ||
          bottle.isCollidingHead(this.level.endboss)) &&
        bottle.hittetEnemy == false
      ) {
        console.log("bottle hittet boss");
        this.animateBrokenBottle(bottle);
        this.level.endboss.bossBottleHit(bottle);
        this.addPointsToPlayerScore(this.level.endboss.scoreNameBottle);

        // this.clearBottleAnimation(bottle);
        // this.bottleSplash(bottle);
        // this.updatePlayerScore(enemy.enemyName);
      }
    });
  }

  //           // stop old animation
  //           // play animation
  //           // count score
  //           // resetAnimation

  floorPosition(obj) {
    return this.canvasHeight - obj.height - this.floorHeight;
  }

  enemyBottleHit(enemy) {
    let enemyIndex = world.level.enemies.indexOf(enemy);
    clearInterval(enemy.walkInterval);
    clearInterval(enemy.walkAnimationInterval);
    enemy.img.src = enemy.deadPic;
    this.addPointsToPlayerScore(enemy.scoreNameBottle);
    setTimeout(() => world.level.enemies.splice(enemyIndex, 1), 1800);
  }

  checkCoinCollision() {
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin) && coin.collected == false) {
        this.character.collectCoin();
        coin.isCollectedAnimation();
        coin.collected = true;
        this.coinbar.updateCoinBar();
        updateP
        if (this.character.coins === 10) {
          this.level.endboss.startFight();
        }
      }
    });
  }

  checkBottleCollision() {
    this.level.bottles.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        bottle.isCollected();
        this.character.collectBottle();
        this.bottlebar.updateBottleBar();
      }
    });
  }

  addPointsToPlayerScore(scoreTypeName) {
    this.playerscore += this.pointTable[scoreTypeName].points
  }
  // updateScoreToPlayerScore(scoreTypeName) {
  //   switch (scoreTypeName) {
  //     case "miniChickenBottleHit":
  //       this.playerscore += this.pointTable.miniChickenBottleHit.points;
  //       break;

  //     case "miniChickenJump":
  //       this.scoreTypeName += this.pointTable.chickenBottleHit.points;
  //       break;

  //     case "chickenBottle":
  //       this.scoreTypeName += this.pointTable.chickenBottleHit.points;
  //       break;
  //     case "chickenBottle":
  //       this.scoreTypeName += this.pointTable.chickenBottleHit.points;
  //       break;

  //     case "bossBottleHit":
  //       this.scoreTypeName += this.pointTable.endbossHit.points;
  //     break;
  //     case "bossBottleHit":
  //       this.scoreTypeName += this.pointTable.endbossHit.points;
  //     break;
  //     case "bossBottleHit":
  //       this.scoreTypeName += this.pointTable.endbossHit.points;
  //     break;
  //     case "bossBottleHit":
  //       this.scoreTypeName += this.pointTable.endbossHit.points;
  //     break;
  //     case "bossBottleHit":
  //       this.scoreTypeName += this.pointTable.endbossHit.points;
  //     break;
  //     case "bossBottleHit":
  //       this.scoreTypeName += this.pointTable.endbossHit.points;
  //     break;

  //     default:
  //       break;
  //   }
  // }

  // updateScoreJumpKill(enemyName) {
  //   switch (enemyName) {
  //     case "minichicken":
  //       this.playerscore += this.pointTable.miniChickenJump.points;
  //       break;

  //     case "chicken":
  //       this.playerscore += this.pointTable.chickenJump.points;
  //       break;
  //   }
  // }

  // checkEnemyThrownBottleCollision() {
  // }

  moveBackground() {
    setInterval(() => {
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
    }, 100);
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
    this.drawBossHeadHitbox(this.ctx);
    this.addObjToCanvas(this.character);
    this.ctx.translate(-this.camera_x, 0);
    this.addObjToCanvas(this.healthbar);
    this.addObjToCanvas(this.coinbar);
    this.addObjToCanvas(this.bottlebar);
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  drawBossHeadHitbox(ctx) {
    ctx.beginPath();
    ctx.lineWidth = "3";
    ctx.strokeStyle = "green";
    ctx.rect(
      this.level.endboss.offsetHead.x,
      this.level.endboss.offsetHead.y,
      this.level.endboss.offsetHead.width,
      this.level.endboss.offsetHead.height
    );
    ctx.stroke();
  }

  addObjToCanvas(obj) {
    if (obj.otherDirection) {
      this.flipImage(obj);
    }

    obj.draw(this.ctx);
    obj.drawFrame(this.ctx);
    obj.drawOffsetFrame(this.ctx);

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
}
