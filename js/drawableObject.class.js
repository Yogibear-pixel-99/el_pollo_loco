class DrawableObject {
  canvasHeight = 480;
  canvasWidth = 720;
  floorHeight = 58;

  img;
  x;
  y;

  
  animationCount = 0;
  animatedImages = {};

  offset = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

  animationCycle = 120;

  otherDirection = false;

  isColliding(obj) {
    return (
      this.x + this.width - this.offset.right > obj.x + obj.offset.left &&
      this.y + this.height - this.offset.bottom > obj.y + obj.offset.top &&
      this.x + this.offset.left < obj.x + obj.width - obj.offset.right &&
      this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom
    );
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Thrownbottle ||
      this instanceof Coin ||
      this instanceof Bottle ||
      this instanceof Chicken ||
      this instanceof Minichicken ||
      this instanceof Endboss
    ) {
      ctx.beginPath();
      ctx.lineWidth = "1";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  drawOffsetFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Thrownbottle ||
      this instanceof Coin ||
      this instanceof Bottle ||
      this instanceof Chicken ||
      this instanceof Minichicken ||
      this instanceof Endboss
    ) {
      ctx.beginPath();
      ctx.lineWidth = "1";
      ctx.strokeStyle = "red";
      ctx.rect(
        this.x + this.offset.left,
        this.y + this.offset.top,
        this.width - this.offset.left - this.offset.right,
        this.height - this.offset.bottom - this.offset.top
      );
      ctx.stroke();
    }
  }

  floorPosition() {
    return this.canvasHeight - this.height - this.floorHeight;
  }

  playAnimation(arrayName) {
    let animationCount = this.animationCount % arrayName.length;
    let path = arrayName[animationCount];
    this.img = this.animatedImages[path];
    this.animationCount++;
  }

  playAnimationOnce(arrayName, count){
    let path = arrayName[count];
    this.img = this.animatedImages[path];
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
}
