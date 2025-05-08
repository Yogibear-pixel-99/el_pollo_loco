class Minichicken extends MovableObject {
  height = 35;
  width = 35;
  // animationCount = 0;
  WALKING_ANIMATION = [
    "./img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "./img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "./img/3_enemies_chicken/chicken_small/1_walk/3_w.png"
  ];
  walkingSpeed = Math.random() * (0.5 - 0.1) + 0.1;

  offset = {
    top: 8,
    right: 2,
    bottom: 0,
    left: 2
  }

  constructor() {
    super();
    this.loadImage("./img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.y = this.floorPosition() - (Math.random() * 8 - 1);
    this.x = this.canvasWidth - Math.random() * 500 + 1;
    this.loadImagesArray(this.WALKING_ANIMATION);
    this.animate();
    this.moveEnemies();
    this.moveLeft();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.WALKING_ANIMATION);
    }, 100);
  }

  moveEnemies(){
    setInterval(() => {
        this.moveLeft();
    }, this.moveCycle)
  }

}
