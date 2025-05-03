class Character extends MovableObject {
  x = 50;
  width = 95;
  height = 190;
  // animationCount = 0;
  WALKING_ANIMATION = [
    "./img/2_character_pepe/2_walk/W-21.png",
    "./img/2_character_pepe/2_walk/W-22.png",
    "./img/2_character_pepe/2_walk/W-23.png",
    "./img/2_character_pepe/2_walk/W-24.png",
    "./img/2_character_pepe/2_walk/W-25.png",
    "./img/2_character_pepe/2_walk/W-26.png",
  ];
  JUMPING_ANIMATION = [
    "./img/2_character_pepe/3_jump/J-31.png",
    "./img/2_character_pepe/3_jump/J-32.png",
    "./img/2_character_pepe/3_jump/J-33.png",
    "./img/2_character_pepe/3_jump/J-34.png",
    "./img/2_character_pepe/3_jump/J-35.png",
    "./img/2_character_pepe/3_jump/J-36.png",
    "./img/2_character_pepe/3_jump/J-37.png",
    "./img/2_character_pepe/3_jump/J-38.png",
    "./img/2_character_pepe/3_jump/J-39.png"
  ]
  world;
  walkingSpeed = 2.3;
  animationCycle = 90;
  moveCycle = 20;

  constructor() {
    super();
    this.loadImage("./img/2_character_pepe/2_walk/W-21.png");
    this.y = this.canvasHeight - this.height - this.floorHeight;
    this.loadImagesArray(this.WALKING_ANIMATION);
    this.loadImagesArray(this.JUMPING_ANIMATION);
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.world.character.world.keyboard.KEY_RIGHT == true || this.world.character.world.keyboard.KEY_LEFT == true) {
        this.animateWalk();
      }
      if (this.world.character.world.keyboard.KEY_SPACE == true) {
        this.animateJump();
      }
    }, this.animationCycle);


    setInterval(() => {
      if (this.world.character.world.keyboard.KEY_RIGHT == true) {
        this.moveRight();
        this.otherDirection = false;
      }
      if (this.world.character.world.keyboard.KEY_LEFT == true) {
        this.moveLeft();
        this.otherDirection = true;
      }
    }, this.moveCycle);
  }

  moveRight() {
    if (this.x < this.canvasWidth / 2 - this.width / 2) {
      this.x = this.x + this.walkingSpeed;
    }
  }

  animateWalk() {
    this.animationCount = this.animationCount % this.WALKING_ANIMATION.length;
    let path = this.WALKING_ANIMATION[this.animationCount];
    this.img = this.animatedImages[path];
    this.animationCount++;
  }

  moveLeft() {
    if (this.x > 0) {
      this.x = this.x - this.walkingSpeed;
    }
  }

  animateJump() {
    

    this.animationCount = this.animationCount % this.JUMPING_ANIMATION.length;
    let path = this.JUMPING_ANIMATION[this.animationCount];
    this.img = this.animatedImages[path];
    this.animationCount++;


    // max jump height
  }
  throwBottle() {}
  jump() {}
}
