class Character extends MovableObject {
  x = 50;
  width = 95;
  height = 180;
  constructor() {
    super().loadImage("./img/2_character_pepe/2_walk/W-21.png");
    this.y = this.canvasHeight - this.height - this.floorHeight;
  }

  moveRight() {
    this.x = this.x + 10;
  }

  moveLeft() {}
  throwBottle() {}
  jump() {}
}
