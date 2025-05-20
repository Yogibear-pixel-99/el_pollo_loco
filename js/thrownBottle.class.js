class Thrownbottle extends MovableObject {
  width = 80;
  height = 80;
  speedY = 20;
  throwSpeedX = 3.7;
  walkingSpeed = this.walkingSpeed;
  alreadyHittet = false;
  gravityInterval;
  moveBottleInterval_x;
  throwInAnimationInterval;
  itemName = "bottleMissed";
  pointsCount = 0;
  offset = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
  };

  BOTTLE_THROW_ANIMATION_RIGHT = [
    "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation_New_1.png",
    "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation_New_2.png",
    "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation_New_3.png",
    "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation_New_4.png",
    "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation_New_5.png",
    "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation_New_6.png",
    "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation_New_7.png",
    "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation_New_8.png",
  ];

  BOTTLE_THROW_ANIMATION_LEFT = [
    "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation_New_8.png",
    "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation_New_7.png",
    "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation_New_6.png",
    "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation_New_5.png",
    "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation_New_4.png",
    "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation_New_3.png",
    "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation_New_2.png",
    "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation_New_1.png",
  ];

  BOTTLE_SPLASH_ANIMATION = [
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  constructor() {
    super();
    this.loadImage(
      "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation_New_1.png"
    );
    this.loadImagesArray(this.BOTTLE_THROW_ANIMATION_LEFT);
    this.loadImagesArray(this.BOTTLE_SPLASH_ANIMATION);
    this.animate();
    this.bottleAppearance();
    this.applyBottleGravity();
  }

  applyBottleGravity() {
    this.gravityInterval = setInterval(() => {
      if (this.aboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      } else {
        this.y = this.floorPosition();
      }
    }, 1000 / 25);
  }

  animate() {
    const direction = world.character.otherDirection;
    this.throwInAnimationInterval = setInterval(() => {
      direction
        ? this.playAnimation(this.BOTTLE_THROW_ANIMATION_LEFT)
        : this.playAnimation(this.BOTTLE_THROW_ANIMATION_RIGHT);
    }, 50);
  }

  bottleAppearance() {
    if (world.character.otherDirection === false) {
      this.shotBottleRight();
    } else {
      this.shotBottleLeft();
    }
  }

  shotBottleRight() {
    const moveRight = world.keyboard.KEY_RIGHT;
    this.x = world.character.x + 35;
    this.y = world.character.y + 50;
    this.moveBottleInterval_x = setInterval(() => {
      if (this.y == this.floorPosition()) {
        return;
      } else {
        moveRight
          ? (this.x += this.throwSpeedX + this.walkingSpeed)
          : (this.x += this.throwSpeedX);
      }
    }, 1000 / 60);
  }

  shotBottleLeft() {
    const moveLeft = world.keyboard.KEY_LEFT;
    this.x = world.character.x;
    this.y = world.character.y + 50;
    this.moveBottleInterval_x = setInterval(() => {
      if (this.y == this.floorPosition()) {
        return;
      } else {
        moveLeft
          ? (this.x -= this.throwSpeedX + this.walkingSpeed)
          : (this.x -= this.throwSpeedX);
      }
    }, 1000 / 60);
  }
}
