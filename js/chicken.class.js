class Chicken extends MovableObject {
height = 40;
width = 40;
  constructor() {
    super().loadImage("./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.y = 480 - this.height - this.floorHeight - (Math.random() * 8 - 1);
    this.x = 720 - Math.random() * 500 + 1;
  }
}
