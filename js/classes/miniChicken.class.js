/**
 * Represents a small enemy chicken in the game.
 * Extends the generic Enemies class and adds unique behavior for mini chickens,
 * including random speed, size adjustments for game modes, and scoring identifiers.
 */
class Minichicken extends Enemies {
  /** @type {number} */
  height = 35;

  /** @type {number} */
  width = 35;

  /** @type {number} */
  walkingSpeed = Math.random() * (0.5 - 0.1) + 0.1;

  /** @type {string} */
  deadPic = "./img/3_enemies_chicken/chicken_small/2_dead/dead.png";

  /** Score identifier for jumping on this enemy */
  scoreNameJump = "miniChickenJumpKill";

  /** Score identifier for hitting with a bottle */
  scoreNameBottle = "miniChickenBottleHit";

  /** @type {{ top: number, right: number, bottom: number, left: number }} */
  offset = {
    top: 8,
    right: 2,
    bottom: 0,
    left: 2,
  };

  /** The frames of the walking animation.
   * @type {string[]}
   */
  WALKING_ANIMATION = [
    "./img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "./img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "./img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  /**
   * Constructs a new Minichicken enemy at a given x position.
   * @param {number} x - The starting x position of the mini chicken.
   */
  constructor(x) {
    super();
    this.getChickenForRushMode();
    this.loadImage("./img/3_enemies_chicken/chicken_small/1_walk/1_w.png");

    // Set random vertical placement slightly above the floor
    this.y = this.floorPosition() - (Math.random() * 8 - 1);

    // Shift chickens right if spawning too early
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

      // Update Y position after size change
      this.y = this.floorPosition() - (Math.random() * 8 - 1);
    }
  }
}
