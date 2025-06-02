/**
 * A heal bottle - collectible item.
 * The bottle heals the character when collected.
 * Inherits from {@link DrawableObject}.
 */
class Healbottle extends DrawableObject {
  /**
   * Height of the heal bottle sprite in pixels.
   * @type {number}
   */
  height = 55;

  /**
   * Width of the heal bottle sprite in pixels.
   * @type {number}
   */
  width = 55;

  /**
   * The score name for the points table.
   * @type {string}
   */
  itemName = "collectBottle";

  /**
   * Offset values used for collision detection.
   * @type {{ top: number, right: number, bottom: number, left: number }}
   */
  offset = {
    top: 10,
    right: 10,
    bottom: 5,
    left: 20,
  };

  BOTTLE_IMAGES = [
    "./img/6_salsa_bottle/heal_bottle_2.png",
    "./img/6_salsa_bottle/heal_bottle_3.png",
    "./img/6_salsa_bottle/heal_bottle.png",
  ];

  /**
   * Creates an instance of Healbottle.
   * Sets the horizontal and vertical position and randomly selects an image.
   */
  constructor() {
    super();
    this.x = this.calculateNewPosition();
    this.y = this.floorPosition();
    this.loadImage(this.getBottleImg());
  }

  /**
   * Selects a random image for the heal bottle.
   *
   * @returns {string} Image path for the bottle sprite.
   */
  getBottleImg() {
    let value = Math.floor(Math.random() * 3);
    return this.BOTTLE_IMAGES[value];
  }

  /**
   * Calculates a new random horizontal position for the bottle.
   * Ensures the horizontal position value is within the playable area.
   *
   * @returns {number} A valid x coordinate on the map.
   */
  calculateNewPosition() {
    let x = Math.random() * canvasWidth * 6;
    if (x < -200 || x > 3600) {
      return this.calculateNewPosition();
    }
    return x;
  }

  /**
   * Calls a new horizontal position function if collected.
   */
  isCollected() {
    this.x = this.calculateNewPosition();
  }
}
