/**
 * The level end cactus.
 * Marks the level end at the horizontal beginning and ending of the game level.
 * Inherits from {@link DrawableObject}.
 */
class Cactus extends DrawableObject {
  /** The height of the cactus img in pixels.
   */
  height = 200;

  /** The width of the cactus img in pixels.
   */
  width = 50;

  /** Horizontal position.
   * @type {number}
   */
  x;

  /** Vertical position.
   * @type {number}
   */
  y;

  /**
   * Creates an instance of the level end cactus.
   *
   * @param {number} x - The horizontal position of the cactus.
   * @param {number} y - The vertical position of the cactus.
   */
  constructor(x, y) {
    super();
    this.loadImage("./img/5_background/cactus-1161006_640.png");
    this.x = x;
    this.y = y;
  }
}
