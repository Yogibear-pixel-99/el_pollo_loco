class MovableObject {
  floorHeight = 58;
  canvasHeight = 480;
  canvasWidth = 720;
  img;
  walkingSpeed;
  animatedImages = {};
  animationCount = 0;

  
  animationCycle = 120;
  moveCycle = 1000 / 60;
  
  otherDirection = false;

  speedY = 0;
  acceleration = 2;

  applyGravity() {
    setInterval(() => {
      if (this.aboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
        this.world.character.world.keyboard.KEY_JUMP = false;
      } else {
        this.y = this.floorPosition();
      }
    }, 1000 / 25);
  }

  floorPosition(){
    return this.canvasHeight - this.height - this.floorHeight;
  }

  aboveGround() {
    return this.y < this.floorPosition();
  }

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImagesArray(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.animatedImages[path] = img;
    });
  }


  moveLeft() {
      this.x = this.x - this.walkingSpeed;
    }


  moveRight() {
    this.x = this.x + this.walkingSpeed;
  }

  playAnimation(arrayName) {
    let animationCount = this.animationCount % arrayName.length;
    let path = arrayName[animationCount];
    this.img = this.animatedImages[path];
    this.animationCount++;
  }
}
