class Character extends MovableObject {
  x = 50;
  width = 95;
  height = 180;
  animationNr = 0;
  IMAGES_WALKING = [
    "./img/2_character_pepe/2_walk/W-21.png",
    "./img/2_character_pepe/2_walk/W-22.png",
    "./img/2_character_pepe/2_walk/W-23.png",
    "./img/2_character_pepe/2_walk/W-24.png",
    "./img/2_character_pepe/2_walk/W-25.png",
    "./img/2_character_pepe/2_walk/W-26.png"
  ]
  constructor() {
    super();
    this.loadImage("./img/2_character_pepe/2_walk/W-21.png");
    this.loadImagesArray(this.IMAGES_WALKING),
    this.y = this.canvasHeight - this.height - this.floorHeight;
    this.animate();
  }

  animate(){
    setInterval(() => {    this.loadImage(this.IMAGES_WALKING[this.animationNr]);
    if (this.animationNr === 5) {
      this.animationNr = 0;
    }
    this.animationNr++;}, 150);
  }

  moveRight() {
    if(this.x < this.canvasWidth) {
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
