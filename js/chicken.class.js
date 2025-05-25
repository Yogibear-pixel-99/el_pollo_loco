class Chicken extends Enemies {
  height = 50;
  width = 50;
  walkingSpeed = Math.random() * (0.9 - 0.3) + 0.3;
  deadPic = "./img/3_enemies_chicken/chicken_normal/2_dead/dead.png";
  scoreNameJump = "chickenJumpKill";
  scoreNameBottle = "chickenBottleHit";

  offset = {
    top: 8,
    right: 3,
    bottom: 8,
    left: 3,
  };

  WALKING_ANIMATION = [
    "./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "./img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "./img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  constructor(x) {
    super();
    this.getChickenForRushMode();
    this.loadImage("./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.y = this.floorPosition() - (Math.random() * 8 - 1);
    if (x < 400) {
      x = x + 700;
    }
    this.x = x;
    this.loadImagesArray(this.WALKING_ANIMATION);
    this.startEnemy();
  }
}
