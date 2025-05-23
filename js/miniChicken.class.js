class Minichicken extends Enemies {
  height = 35;
  width = 35;
  walkingSpeed = Math.random() * (0.5 - 0.1) + 0.1;
  deadPic = "./img/3_enemies_chicken/chicken_small/2_dead/dead.png";
  scoreNameJump = "miniChickenJumpKill";
  scoreNameBottle = "miniChickenBottleHit";



  offset = {
    top: 8,
    right: 2,
    bottom: 0,
    left: 2,
  };

  WALKING_ANIMATION = [
    "./img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "./img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "./img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  constructor(x) {
    super();
    this.getChickenSize();
    this.loadImage("./img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.y = this.floorPosition() - (Math.random() * 8 - 1);
    if (x < 400) {
      x = x + 700;
    }
    this.x = x;
    this.loadImagesArray(this.WALKING_ANIMATION);
    this.moveEnemies();
    this.animateWalk();
  }

    getChickenSize(){
    if (gameMode === 'chickenRush') {
      let size = Math.ceil(Math.random() * (70 - 35) + 35);
      let speed = parseFloat((Math.random() * 2.5).toFixed(1));
      this.width = size;
      this.height = size;
      this.walkingSpeed = speed;
      this.y = this.floorPosition() - (Math.random() * 8 - 1);
    }
  }
}
