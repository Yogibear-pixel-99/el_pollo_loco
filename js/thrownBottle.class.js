class Thrownbottle extends MovableObject {
  width = 80;
  height = 80;
  speedY = 20;
  throwSpeedX = 3.7;
  walkingSpeed = this.walkingSpeed;
  hitEnemy = false;
  gravityInterval;
  moveBottleInterval_x;

  offset = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20

  }

  BOTTLE_THROW_ANIMATION = [
    "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation_New_1.png",
    "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation_New_2.png",
    "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation_New_3.png",
    "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation_New_4.png",
    "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation_New_5.png",
    "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation_New_6.png",
    "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation_New_7.png",
    "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation_New_8.png",
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
    this.loadImagesArray(this.BOTTLE_THROW_ANIMATION);
    this.loadImagesArray(this.BOTTLE_SPLASH_ANIMATION);
    this.animate();
    this.bottleAppearance();
    this.applyBottleGravity();
    console.log(this.walkingSpeed);
    console.log(this.gravityInterval);
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

  stopGravity() {}

  animate() {
    let throwIn = setInterval(() => {
      let bottleIndex = world.thrownBottles.indexOf(this);
      if (this.y == this.floorPosition() || this.hitEnemy === true) {
          clearInterval(throwIn);
          clearInterval(this.gravityInterval);
          clearInterval(this.moveBottleInterval_x);
        this.bottleSplash(bottleIndex);
      } else {
        this.playAnimation(this.BOTTLE_THROW_ANIMATION);
      }
    }, 50);
  }

  bottleSplash(bottleIndex) {
    this.img = this.animatedImages[this.BOTTLE_SPLASH_ANIMATION[0]]
    let count = 1;
    let interval = setInterval(() => {
    if (count < this.BOTTLE_SPLASH_ANIMATION.length) {
    this.playAnimationOnce(this.BOTTLE_SPLASH_ANIMATION, count);
    console.log(count);
    count++;
    } else {
        world.thrownBottles.splice(bottleIndex, 1);
        clearInterval(interval);
    }
}, 100);
  }

  bottleAppearance() {
    if (world.character.otherDirection === false) {
      this.shotBottleRight();
    } else {
      this.shotBottleLeft();
    }
  }

  shotBottleRight() {
    this.x = world.character.x + 35;
    this.y = world.character.y + 50;
    this.moveBottleInterval_x = setInterval(() => {
      if (this.y == this.floorPosition()) {
        return;
      } else {
        world.keyboard.KEY_RIGHT
          ? (this.x += this.throwSpeedX + this.walkingSpeed)
          : (this.x += this.throwSpeedX);
      }
    }, 1000 / 60);
  }

  shotBottleLeft() {
    this.x = world.character.x;
    this.y = world.character.y + 50;
    this.moveBottleInterval_x = setInterval(() => {
      if (this.y == this.floorPosition()) {
        return;
      } else {
        world.keyboard.KEY_LEFT
          ? (this.x -= this.throwSpeedX + this.walkingSpeed)
          : (this.x -= this.throwSpeedX);
      }
    }, 1000 / 60);
  }
}
