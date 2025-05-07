class World {
  character = new Character();
  
  level = level1;


  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkEnemyCollisions();
  }

  setWorld() {
    this.character.world = this;
  }

  checkEnemyCollisions(){
   this.collisionIntervall = setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy)){
          this.character.hit();
          this.character.collided = true;
          this.character.stopJumpAnimation = true;
          setTimeout(() => {this.character.collided = false}, 200);
          setTimeout(() => {this.character.stopJumpAnimation = false}, 2000);
          console.log(this.character.energy);
        } else {
          
        }
      })
      // console.log(world.character.characterCollides);
    }, 400);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToCanvas(this.level.backgrounds);
    this.addObjectsToCanvas(this.level.enemies);
    this.addObjectsToCanvas(this.level.skyObjects);
    this.addObjectsToCanvas(this.level.coins);
    this.addObjToCanvas(this.character);

    this.ctx.translate(-this.camera_x, 0);
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
