/**
 * Base class for moveable objects on the canvas.
 * Handles gravity, move left/right and some queries for death, hitting, above ground.
 * Inherits from {@link DrawableObject}
 */
class MovableObject extends DrawableObject {
  /**
   * Speed of walking movement.
   * @type {number}
   */
  walkingSpeed;

  /**
   * Movement cycle duration.
   * @type {number}
   */
  moveCycle = 1000 / 60;

  /**
   * Vertical speed.
   * @type {number}
   */
  speedY = 0;

  /**
   * Gravity acceleration value.
   * @type {number}
   */
  acceleration = 2;

  /**
   * Timestamp of last hit taken.
   * @type {number}
   */
  lastHit = 0;

  /**
   * Default walking speed.
   * @type {number}
   */
  walkingSpeed = 2.8;

  /**
   * Interval ID for gravity.
   * @type {number}
   */
  gravityInterval;

  /**
   * Applies gravity to the object, moving it downward if above ground.
   */
  applyGravity() {
    this.gravityInterval = setInterval(() => {
      if (gamePaused) return;
      if (this.aboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
        this.world.character.world.keyboard.KEY_JUMP = false;
      } else {
        this.y = this.floorPosition();
        this.speedY = 0;
      }
    }, 1000 / 25);
  }

  /**
   * Applies damage to the object if not immune.
   */
  hit() {
    if (!this.isImmune()) {
      this.energy -= 10;
      if (this.energy <= 0) {
        this.energy = 0;
      }
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Checks if the object was hurt recently.
   * @returns {boolean}
   */
  isHurt() {
    let timePassed = (new Date().getTime() - this.lastHit) / 1000;
    return timePassed < 0.3;
  }

  /**
   * Checks if the object is immune from damage.
   * @returns {boolean}
   */
  isImmune() {
    let timePassed = (new Date().getTime() - this.lastHit) / 1000;
    return timePassed < 1.2;
  }

  /**
   * Checks if the object is dead.
   * @returns {boolean}
   */
  isDead() {
    return this.energy === 0;
  }

  /**
   * Checks if the object is above the floor.
   * @returns {boolean}
   */
  aboveGround() {
    return this.y < this.floorPosition();
  }

  /** Moves the object left by walking speed. */
  moveLeft() {
    this.x = this.x - this.walkingSpeed;
  }

  /** Moves the object right by walking speed. */
  moveRight() {
    this.x = this.x + this.walkingSpeed;
  }
}
