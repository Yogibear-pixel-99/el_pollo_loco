class Character extends MovableObject {
  x = 50;
  width = 95;
  height = 180;
  // animationCount = 0;
  WALKING_ANIMATION = [
    "./img/2_character_pepe/2_walk/W-21.png",
    "./img/2_character_pepe/2_walk/W-22.png",
    "./img/2_character_pepe/2_walk/W-23.png",
    "./img/2_character_pepe/2_walk/W-24.png",
    "./img/2_character_pepe/2_walk/W-25.png",
    "./img/2_character_pepe/2_walk/W-26.png",
  ];
  world;
  moveSpeed = 10;
  animationCycle = 40;
  moveCycle = 100;

  constructor() {
    super();
    this.loadImage("./img/2_character_pepe/2_walk/W-21.png");
    this.y = this.canvasHeight - this.height - this.floorHeight;
    this.loadImagesArray(this.WALKING_ANIMATION);
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.world.character.world.keyboard.KEY_RIGHT == true) {
        this.animateRight();
      }
      if (this.world.character.world.keyboard.KEY_LEFT == true) {
        this.animateLeft();
      }
    }, this.animationCycle);

    setInterval(() => {
      if (this.world.character.world.keyboard.KEY_RIGHT == true) {
        this.moveRight();
      }
      if (this.world.character.world.keyboard.KEY_LEFT == true) {
        this.moveLeft();
      }
    }, this.moveCycle);
  }

  moveRight() {
    if (this.x < this.canvasWidth / 2 - this.width / 2) {
      this.x = this.x + this.moveSpeed;
    }
  }

  animateRight() {
    this.animationCount = this.animationCount % this.WALKING_ANIMATION.length;
    let path = this.WALKING_ANIMATION[this.animationCount];
    this.img = this.animatedImages[path];
    this.animationCount++;
  }

  moveLeft() {
    if (this.x > 0) {
      this.x = this.x - this.moveSpeed;
    }
  }

  animateLeft() {
    this.animationCount = this.animationCount % this.WALKING_ANIMATION.length;
    let path = this.WALKING_ANIMATION[this.animationCount];
    this.img = this.animatedImages[path];
    this.animationCount++;
  }
  throwBottle() {}
  jump() {}
}
