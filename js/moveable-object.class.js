class MovableObject {
  floorHeight = 58;
  canvasHeight = 480;
  canvasWidth = 720;
  img;
  animatedImages = {};
  animationCount = 0;
  walkingSpeed;
  animationCycle = 120;
  moveCycle = 50;
  otherDirection = false;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImagesArray(array){
    array.forEach(path => {
      let img = new Image();
      img.src = path;
      this.animatedImages[path] = img;
    });
  }

  enemyWalkLeft(){
    setInterval(() => {
      this.x = this.x - this.walkingSpeed;
    }, this.moveCycle);
  }

}






