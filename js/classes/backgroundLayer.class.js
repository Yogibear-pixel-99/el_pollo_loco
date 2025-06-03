/**
 * Represents a single background layer for parallax scrolling.
 * Inherits from {@link MovableObject}.
 */
class BackgroundLayer extends MovableObject {
  /**
   * The vertical position of the background layer.
   * @type {number}
   */
  y = 0;

  /**
   * The width of the background image.
   * @type {number}
   */
  width = canvasWidth;

  /**
   * The height of the background image.
   * @type {number}
   */
  height = canvasHeight;

  /**
   * The factor by which the background moves to create a parallax effect.
   * A lower value means the background moves slower.
   * @type {number}
   */
  xFactor;

  /**
   * The starting horizontal position of the background layer.
   * @type {number}
   */
  startPostition;

  /**
   * Creates a new BackgroundLayer instance.
   * @param {string} imagePath - The path to the background image.
   * @param {number} x - The initial x position of the background layer.
   * @param {number} xFactor - The movement factor used for parallax scrolling.
   */
  constructor(imagePath, x, xFactor) {
    super();
    this.startPostition = x;
    this.loadImage(imagePath);
    this.xFactor = xFactor;
    this.x = x;
  }
  
}
