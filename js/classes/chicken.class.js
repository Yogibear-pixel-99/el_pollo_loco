/**
 * The chicken enemy in the game.
 * Handles appearance, size, walking speed.
 * Inherits from {@link Enemies}
 */
class Chicken extends Enemies {
  
  height = 50;
  width = 50;
  walkingSpeed = Math.random() * (0.9 - 0.3) + 0.3;
  deadPic = "./img/3_enemies_chicken/chicken_normal/2_dead/dead.png";
  scoreNameJump = "chickenJumpKill";
  scoreNameBottle = "chickenBottleHit";

  /**
   * The offset from the sprite for the collision detection.
   */
  offset = {
    top: 8,
    right: 3,
    bottom: 8,
    left: 3,
  };

  WALKING_ANIMATION = [
    "./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "./img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "./img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  /**
   * Creates an instance of Chicken.
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
    this.loadImage("./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.y = this.floorPosition() - (Math.random() * 8 - 1);
    if (x < 400) {
      x = x + 700;
    }
    this.x = x;
    this.loadImagesArray(this.WALKING_ANIMATION);
    this.startEnemy();
  }

  /**
   * Randomizes size, speed, and vertical position.
   */
  getChickenForRushMode() {
    if (gameMode === "chickenRush") {
      let size = Math.ceil(Math.random() * 30 + 40);
      let speed = parseFloat((Math.random() * 1.8).toFixed(1) + 0.2);
      this.width = size;
      this.height = size;
      this.walkingSpeed = speed;
      this.y = this.floorPosition() - (Math.random() * 8 - 1);
    }
  }
}
