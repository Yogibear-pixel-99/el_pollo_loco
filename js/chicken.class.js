class Chicken extends MovableObject {
height = 40;
width = 40;
  constructor() {
    super();
    this.loadImage("./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.y = this.canvasHeight - this.height - this.floorHeight - (Math.random() * 8 - 1);
    this.x = this.canvasWidth - Math.random() * 500 + 1;
  }
}
