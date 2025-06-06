/**
 * Base class for enemy characters.
 * Handles enemy movement, animation, and death.
 * Inherits from {@link MovableObject}.
 */
class Enemies extends MovableObject {

  deadPic;
  wasHittet = false;
  walkingSpeed = 1;

  /**
   * Gravity acceleration value.
   */
  acceleration = 2;

  /**
   * Vertical speed used in gravity and jump movement.
   */
  speedY = 0;
  lives = true;

  /**
   * Indicates direction of movement.
   */
  otherDirection = false;

  /**
   * Reference to the character in the game world.
   * @type {object}
   */
  character;
  runAwayInterval;
  moveInterval;
  walkAnimationInterval;

  /**
   * Creates an instance of Enemies.
   */
  constructor() {
    super();
  }

  /**
   * Starts enemy movement and animation.
   */
  startEnemy() {
    this.moveEnemy();
    this.animateWalk();
  }

  /**
   * Starts walking animation in a loop.
   */
  animateWalk() {
    this.walkAnimationInterval = setInterval(() => {
      if (gamePaused) return;
      this.playAnimation(this.WALKING_ANIMATION);
    }, this.animationCycle);
  }

  /**
   * Triggers the enemy death image and stops all intervals.
   */
  isKilled() {
    this.stopAllEnemyIntervals();
    this.img.src = this.deadPic;
  }

  /**
   * Stops all animation and movement intervals for the enemy.
   */
  stopAllEnemyIntervals() {
    clearInterval(this.walkAnimationInterval);
    clearInterval(this.moveInterval);
    clearInterval(this.runAwayInterval);
  }

  /**
   * Moves the enemy in its current direction in an interval.
   */
  moveEnemy() {
    this.moveInterval = setInterval(() => {
      if (gamePaused) return;
      if (this.otherDirection) {
        this.moveRight();
      } else {
        this.moveLeft();
      }
    }, this.moveCycle);
  }

  /**
   * Makes the enemy flee from the character for a short period.
   * Plays sound and interrupts normal movement temporarily.
   */
  runAway() {
    audio.playSoundClone("chickenRun");
    let activeDirection = this.otherDirection;
    let count = 0;
    this.runAwayInterval = setInterval(() => {
      if (gamePaused) return;
      if (count < 20) {
        this.playAnimation(this.WALKING_ANIMATION);
        this.runToLeftOrRight();
        count++;
      } else {
        this.setEnemyToDefault(activeDirection);
      }
    }, 20);
  }

  /**
   * Checks the position off the enemy in relation to the char.
   * Moves the x axis depending on the char position.
   */
  runToLeftOrRight() {
    if (this.x < world.character.x) {
      this.otherDirection = false;
      this.x -= this.walkingSpeed + 5;
    } else {
      this.otherDirection = true;
      this.x += this.walkingSpeed + 5;
    }
  }

  /**
   * Sets the enemy to the default movement.
   *
   * @param {boolean} activeDirection - The other direction boolean before the run away move starts.
   */
  setEnemyToDefault(activeDirection) {
    clearInterval(this.runAwayInterval);
    this.otherDirection = activeDirection;
    this.animateWalk();
    this.moveEnemy();
    if (this.x > world.character.x) {
      this.otherDirection = false;
    } else {
      this.otherDirection = true;
    }
  }
}
