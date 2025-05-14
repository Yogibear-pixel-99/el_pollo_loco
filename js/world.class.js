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
      this.checkThrownBottleCollision();
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
        } else {
          this.character.hit();
        }
      }
    });
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
        this.level.endboss.bossBottleHit(bottle);
        this.addPointsToPlayerScore(this.level.endboss.scoreNameBottle);
      } else {
        this.level.enemies.forEach((enemy) => {
          if (bottle.isColliding(enemy)) {
            this.animateBrokenBottle(bottle);
            enemy.isKilled();
            this.addPointsToPlayerScore(enemy.scoreNameBottle);
          }
        });
      }
    });
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
  }

  floorPosition(obj) {
    return this.canvasHeight - obj.height - this.floorHeight;
  }

  checkCoinCollision() {
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin) && coin.collected == false) {
        this.character.collectCoin();
        coin.isCollectedAnimation();
        coin.collected = true;
        this.coinbar.updateCoinBar();
        this.addPointsToPlayerScore(coin.itemName);
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
        this.addPointsToPlayerScore(bottle.itemName);
      }
    });
  }

  addPointsToPlayerScore(scoreTypeName) {
    this.playerscore += this.pointTable[scoreTypeName].points;
  }

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
