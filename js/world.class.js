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

  constructor(canvas, keyboard, pointTable,  canvasHeight, canvasWidth, floorHeight) {
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

  updatePlayerScore() {
    let ref = document.getElementById("player-score");
        ref.innerText = this.playerscore;
  }

  setWorld() {
    this.character.world = this;
  }

  runCollisions() {
    setInterval(() => {
      this.checkEnemyCollisions();
      this.checkCoinCollision();
      this.checkBottleCollision();
    }, 20);
  }

  checkEnemyCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
      }
      this.thrownBottles.forEach((bottle) => {
        if (bottle.isColliding(enemy) && bottle.hittetEnemy == false) {
            this.enemyBottleHit(enemy, bottle);
            bottle.hittetEnemy = true;
            this.updatePlayerScore(enemy.enemyName);
          // bottle.hitEnemy = true;
          // enemy.wasHittet = true;
        }
      });
    });
  }

  enemyBottleHit(enemy){
        let enemyIndex = world.level.enemies.indexOf(enemy)
        clearInterval(enemy.walkInterval);
        clearInterval(enemy.animateInterval);
        enemy.img.src = enemy.deadPic;
        this.updateScorePointsBottleHit(enemy.enemyName);
        this.updatePlayerScore();
        setTimeout(() => world.level.enemies.splice(enemyIndex, 1), 1800);
  }

  checkCoinCollision() {
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin) && coin.collected == false) {
        this.character.collectCoin();
        coin.isCollected();
        coin.collected = true;
        this.coinbar.updateCoinBar();
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

  updateScorePointsBottleHit(enemyName) {
    switch (enemyName){
      case 'minichicken' : this.playerscore += this.pointTable.miniChickenBottleHit.points;
      break;

      case 'chicken' : this.playerscore += this.pointTable.chickenBottleHit.points;
      break;

      default:
        break;
    }
    
  }
  

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

  drawBossHeadHitbox(ctx){
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
