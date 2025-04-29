class Character extends MovableObject {
  x = 50;
  width = 80;
  height = 150;
  constructor() {
    super().loadImage("./img/2_character_pepe/2_walk/W-21.png");
    this.y = this.canvasHeight - this.height - this.floorHeight;
  }
  
  moveRight() {}

  moveLeft() {}
  throwBottle() {}
  jump() {}
}
