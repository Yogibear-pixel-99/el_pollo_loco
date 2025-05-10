class Thrownbottle extends MovableObject {
  width = 80;
  height = 80;
  speedY = 20;
  throwSpeedX = 3.7;

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
  }

  applyBottleGravity() {
    setInterval(() => {
      if (this.aboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      } else {
        this.y = this.floorPosition();
      }
    }, 1000 / 25);
  }

  animate() {
    let throwIn = setInterval(() => {
      let bottleIndex = world.level.thrownBottles.indexOf(this);
      if (this.y == this.floorPosition()) {
        this.playAnimation(this.BOTTLE_SPLASH_ANIMATION);
        setTimeout(() => clearInterval(throwIn), 150);
        setTimeout(() => world.level.thrownBottles.splice(bottleIndex, 1), 280);
      } else {
        this.playAnimation(this.BOTTLE_THROW_ANIMATION);
      }
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
    this.x = world.character.x + world.character.width / 2;
    this.y = this.floorPosition() - world.character.height / 3;
    setInterval(() => {
      if (this.y == this.floorPosition()) {
        return;
      } else {
        this.x += this.throwSpeedX;
      }
    }, 1000 / 60);
  }

  shotBottleLeft() {
    this.x = world.character.x + world.character.width / 2;
    this.y = this.floorPosition() - world.character.height / 3;
    setInterval(() => {
      if (this.y == this.floorPosition()) {
        return;
      } else {
        this.x -= this.throwSpeedX;
      }
    }, 1000 / 60);
  }
}
