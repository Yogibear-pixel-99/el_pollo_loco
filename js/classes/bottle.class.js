/**
 * The collectable and throwable bottles in the game.
 * Handles appearance in the game.
 * Inherits from {@link DrawableObject}.
 */
class Bottle extends DrawableObject {
  
  height = 55;
  width = 55;

  /** The score identifier name.
   */
  itemName = "collectBottle";

  /**
   * Offsets for the bottle hitbox used in collision detection.
   */
  offset = {
    top: 10,
    right: 10,
    bottom: 5,
    left: 20,
  };

  /**
   * Creates an instance of a collectable bottle.
   * Calculates a new horizintal position.
   * Loads the img of the bottle
   */
  constructor() {
    super();
    this.x = this.calculateNewPosition();
    this.y = this.floorPosition();
    this.loadImage(this.getBottleImg());
  }

  /**
   * Chooses with a random number, the bottle img.
   *
   * @returns - The img src of the bottle to collect.
   */
  getBottleImg() {
    let value = Math.random();
    let src = "";
    if (value >= 0.7) {
      src = "./img/6_salsa_bottle/1_salsa_bottle_on_ground.png";
    } else if (value >= 0.4) {
      src = "./img/6_salsa_bottle/2_salsa_bottle_on_ground.png";
    } else if (value >= 0) {
      src = "./img/6_salsa_bottle/salsa_bottle.png";
    }
    return src;
  }

  /**
   * Calculates a new x position, depending on the canvas width.
   *
   * @returns {number} - The new x coordinate.
   */
  calculateNewPosition() {
    let x = Math.random() * 3500;
    if (x < 300 && x > 100) {
      return this.calculateNewPosition();
    }
    return x;
  }

  /**
   * Calls the calculate new x coord function, if character has les than 5 bottles.
   */
  isCollected() {
    if (world.character.bottles < 5) this.x = this.calculateNewPosition();
  }
}
