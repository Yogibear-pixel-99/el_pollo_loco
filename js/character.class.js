class Character extends MovableObject {
  x = 50;
  width = 95;
  height = 180;
  animationCount = 0;
  WALKING_ANIMATION = [
    "./img/2_character_pepe/2_walk/W-21.png",
    "./img/2_character_pepe/2_walk/W-22.png",
    "./img/2_character_pepe/2_walk/W-23.png",
    "./img/2_character_pepe/2_walk/W-24.png",
    "./img/2_character_pepe/2_walk/W-25.png",
    "./img/2_character_pepe/2_walk/W-26.png",
  ];
  constructor() {
    super();
    this.loadImage("./img/2_character_pepe/2_walk/W-21.png");
    this.y = this.canvasHeight - this.height - this.floorHeight;
    this.loadImagesArray(this.WALKING_ANIMATION);
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.animationCount = (this.animationCount % this.WALKING_ANIMATION.length);
      let path = this.WALKING_ANIMATION[this.animationCount];
      this.img = this.animatedImages[path];
      this.animationCount++;
    }, 140);
  }

  moveRight() {
    if (this.x < this.canvasWidth) {
      this.x = this.x + 10;
    }
  }

  moveLeft() {
    if (this.x > 0) {
      this.x = this.x - 10;
    }
  }
  throwBottle() {}
  jump() {}
}
