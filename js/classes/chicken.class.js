/**
 * The chicken enemy in the game.
 * Handles appearance, size, walking speed.
 * Inherits from {@link Enemies}
 */
class Chicken extends Enemies {

  /**
 * The height of the chicken sprite in pixels.
 * @type {number}
 */
  height = 50;

  /**
 * The width of the chicken sprite in pixels.
 * @type {number}
 */
  width = 50;

  /**
   * The walking speed, generated random between two numbers.
   * @type {number}
   */
  walkingSpeed = Math.random() * (0.9 - 0.3) + 0.3;

  /**
   * The dead sprite.
   * @type {string}
   */
  deadPic = "./img/3_enemies_chicken/chicken_normal/2_dead/dead.png";

  /**
   * The jump kill score name for the points table.
   * @type {string}
   */
  scoreNameJump = "chickenJumpKill";

    /**
   * The bottle kill score name for the points table.
   * @type {string}
   */
  scoreNameBottle = "chickenBottleHit";

  /**
   * The offset from the sprite for the collision detection.
   * @type {top: number, right: number, bottom: number, left: number}
   */
  offset = {
    top: 8,
    right: 3,
    bottom: 8,
    left: 3,
  };

  /**
   * Image frames for the walking animation.
   * @type {string[]}
   */
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
      getChickenForRushMode(){
    if (gameMode === 'chickenRush') {
      let size = Math.ceil(Math.random() * 30 + 40);
      let speed = parseFloat((Math.random() * 2.0).toFixed(1));
      this.width = size;
      this.height = size;
      this.walkingSpeed = speed;
      this.y = this.floorPosition() - (Math.random() * 8 - 1);
    }
  }
}
