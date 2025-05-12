class Chicken extends Enemies {
height = 145;
width = 145;
walkingSpeed = (Math.random() * (0.8 - 0.3) + 0.3);
deadPic = "./img/3_enemies_chicken/chicken_normal/2_dead/dead.png";
enemyName = 'chicken';
offset = {
  top: 8,
  right: 3,
  bottom: 8,
  left: 3
}

WALKING_ANIMATION = [
  "./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
  "./img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
  "./img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
];

  constructor() {
    super();
    this.loadImage("./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.y = this.floorPosition() - (Math.random() * 8 - 1);
    this.x = this.canvasWidth - Math.random() * 500 + 1;
    this.loadImagesArray(this.WALKING_ANIMATION);
    this.animateWalk();
    this.moveEnemies();
  }
}
