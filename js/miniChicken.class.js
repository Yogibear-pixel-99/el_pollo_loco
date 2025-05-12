class Minichicken extends Enemies {
  height = 35;
  width = 35;
  walkingSpeed = Math.random() * (0.5 - 0.1) + 0.1;

  enemyName = 'minichicken';

  deadPic = "./img/3_enemies_chicken/chicken_small/2_dead/dead.png";
  
  offset = {
    top: 8,
    right: 2,
    bottom: 0,
    left: 2
  }
  
  WALKING_ANIMATION = [
    "./img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "./img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "./img/3_enemies_chicken/chicken_small/1_walk/3_w.png"
  ];


  constructor() {
    super();
    this.loadImage("./img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.y = this.floorPosition() - (Math.random() * 8 - 1);
    this.x = this.canvasWidth - Math.random() * 500 + 1;
    this.loadImagesArray(this.WALKING_ANIMATION);
    this.animateWalk();
    this.moveEnemies();
  }
}
