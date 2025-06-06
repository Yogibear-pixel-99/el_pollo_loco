/**
 * Class representing a thrown bottle object.
 * Handles bottle movement, gravity, animations, and interactions.
 * Extends {@link MovableObject}.
 */
class Thrownbottle extends MovableObject {
  
  width = 80;
  height = 80;

  /** Vertical speed for gravity effects.
   */
  speedY = 20;

  /** Horizontal speed when thrown.
   */
  throwSpeedX = 3.7;
  alreadyHittet = false;
  gravityInterval;
  moveBottleInterval_x;
  throwInAnimationInterval;

  /** The bottle missed score name for the points table.
   */
  itemName = "bottleMissed";

  /** Collision box offset.
   */
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

  /**
   * Initializes the thrown bottle by loading images and starting animations and gravity.
   */
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

  /**
   * Applies gravity to the bottle, updating vertical position and speed.
   */
  applyBottleGravity() {
    this.gravityInterval = setInterval(() => {
      if (gamePaused) return;
      if (this.aboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      } else {
        this.y = this.floorPosition();
      }
    }, 1000 / 25);
  }

  /**
   * Animates the bottle rotation depending on the character's direction.
   */
  animate() {
    const direction = world.character.otherDirection;
    this.throwInAnimationInterval = setInterval(() => {
      if (gamePaused) return;
      direction
        ? this.playAnimation(this.BOTTLE_THROW_ANIMATION_LEFT)
        : this.playAnimation(this.BOTTLE_THROW_ANIMATION_RIGHT);
    }, 50);
  }

  /**
   * Determines initial bottle throwing direction.
   */
  bottleAppearance() {
    if (world.character.otherDirection === false) {
      this.shotBottleRight();
    } else {
      this.shotBottleLeft();
    }
  }

  /**
   * Handles bottle movement when thrown to the right.
   * Moves bottle horizontally and vertically according to physics.
   */
  shotBottleRight() {
    const moveRight = world.keyboard.KEY_RIGHT;
    this.x = world.character.x + 35;
    this.y = world.character.y + 50;
    this.moveBottleInterval_x = setInterval(() => {
      if (gamePaused) return;
      if (this.y == this.floorPosition()) {
        return;
      } else {
        moveRight
          ? (this.x += this.throwSpeedX + this.walkingSpeed)
          : (this.x += this.throwSpeedX);
      }
    }, 1000 / 60);
  }

  /**
   * Handles bottle movement when thrown to the left.
   * Moves bottle horizontally and vertically according to physics.
   */
  shotBottleLeft() {
    const moveLeft = world.keyboard.KEY_LEFT;
    this.x = world.character.x;
    this.y = world.character.y + 50;
    this.moveBottleInterval_x = setInterval(() => {
      if (gamePaused) return;
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
