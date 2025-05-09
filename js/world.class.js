class World {
  

  character = new Character();
  healthbar = new Healthbar(20, 10);
  coinbar = new Coinbar(20, 50);
  bottlebar = new Bottlebar(20, 90,);

  level = level1;

  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  throwBottle = new Bottlethrow();


  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkEnemyCollisions();
    this.checkCoinCollision();
    this.checkBottleCollision();
  }

  setWorld() {
    this.character.world = this;
  }

  checkEnemyCollisions() {
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy)) {
          this.character.hit();
        }
      });
    }, 50);
  }

  checkCoinCollision() {
    setInterval(() => {
      this.level.coins.forEach((coin) => {
        if (this.character.isColliding(coin) && coin.collected == false) {
          this.character.collectCoin();
          coin.isCollected();
          coin.collected = true;
          this.coinbar.updateCoinBar();
        }
      });
    }, 50);
  }

  checkBottleCollision() {
    setInterval(() => {
      this.level.bottles.forEach((bottle) => {
        if (this.character.isColliding(bottle)) {
          bottle.isCollected();
          this.character.collectBottle();
          this.bottlebar.updateBottleBar();
        }
      });
    }, 50);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToCanvas(this.level.backgrounds);
    this.addObjectsToCanvas(this.level.enemies);
    this.addObjectsToCanvas(this.level.skyObjects);
    this.addObjectsToCanvas(this.level.coins);
    this.addObjToCanvas(this.character);
    this.addObjToCanvas(this.throwBottle);
    this.addObjectsToCanvas(this.level.bottles);

    this.ctx.translate(-this.camera_x, 0);
    this.addObjToCanvas(this.healthbar);
    this.addObjToCanvas(this.coinbar);
    this.addObjToCanvas(this.bottlebar);
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
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
    array.forEach((element) => {
      this.addObjToCanvas(element);
    });
  }
}
