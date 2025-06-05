/**
 * Represents a small enemy chicken in the game.
 * Extends the generic Enemies class and adds unique behavior for mini chickens,
 * including random speed, size adjustments for game modes, and scoring identifiers.
 */
class Minichicken extends Enemies {

  height = 35;
  width = 35;
  walkingSpeed = Math.random() * (0.5 - 0.1) + 0.1;
  deadPic = "./img/3_enemies_chicken/chicken_small/2_dead/dead.png";
  scoreNameJump = "miniChickenJumpKill";
  scoreNameBottle = "miniChickenBottleHit";

  /**
   * The offset from the sprite for the collision detection.
   */
  offset = {
    top: 8,
    right: 2,
    bottom: 0,
    left: 2,
  };

  /** The frames of the walking animation.
   */
  WALKING_ANIMATION = [
    "./img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "./img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "./img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  /**
   * Creates an instance of miniChicken.
   * In rush mode: randomizes size, speed, and vertical position.
   * Sets initial image and animation frames.
   * Ensures a horizontal start position beyond 400.
   * Starts enemy behavior and animations.
   *
   * @param {number} x - Initial horizontal position.
   */
  constructor(x) {
    super();
    this.getChickenForRushMode();
    this.loadImage("./img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.y = this.floorPosition() - (Math.random() * 8 - 1);
    if (x < 400) {
      x = x + 700;
    }
    this.x = x;
    this.loadImagesArray(this.WALKING_ANIMATION);
    this.startEnemy();
  }

  /**
   * Adjusts chicken size and speed if the game is in "chickenRush" mode.
   * Applies random size and walking speed, and recalculates floor Y position.
   */
  getChickenForRushMode() {
    if (gameMode === "chickenRush") {
      let size = Math.ceil(Math.random() * 15 + 35);
      let speed = parseFloat((Math.random() * 2.0).toFixed(1));
      this.width = size;
      this.height = size;
      this.walkingSpeed = speed;
      this.y = this.floorPosition() - (Math.random() * 8 - 1);
    }
  }
}
