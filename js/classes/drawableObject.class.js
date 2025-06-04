/**
 * Base class for drawable objects on the canvas.
 * Handles image loading, animation, collision detection, and drawing.
 */
class DrawableObject {
  /**
   * Distance from the bottom of the canvas representing the floor height.
   */
  floorHeight = 58;

  /**
   * Current image to be drawn.
   * @type {HTMLImageElement}
   */
  img;

  /**
   * Horizontal position on the canvas.
   * @type {number}
   */
  x;

  /**
   * Vertical position on the canvas.
   * @type {number}
   */
  y;

  /**
   * Counter for animation frame indexing.
   */
  animationCount = 0;

  /**
   * Object of preloaded images for animations.
   * @type {Object.<string, HTMLImageElement>}
   */
  animatedImages = {};

  /**
   * Offsets for collision detection.
   */
  offset = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

  /**
   * Duration of each animation frame cycle in milliseconds.
   */
  animationCycle = 120;

  /**
   * Flag indicating if the object is facing the opposite direction.
   */
  otherDirection = false;

  /**
   * Interval ID for animation loop.
   * @type {number}
   */
  animateInterval;

  /**
   * Interval ID for movement loop.
   */
  moveInterval;

  /**
   * Checks if the collision comes from above.
   * @returns {boolean} True if speedY is less than 0.
   */
  collisionFromAbove() {
    return this.speedY < 0;
  }

  /**
   * Checks if this object is colliding with another object.
   * Considers the offsets for accurate bounding box collision.
   *
   * @param {DrawableObject} obj - Another drawable object to check collision against.
   * @returns {boolean} True if colliding, false otherwise.
   */
  isColliding(obj) {
    return (
      this.x + this.width - this.offset.right > obj.x + obj.offset.left &&
      this.y + this.height - this.offset.bottom > obj.y + obj.offset.top &&
      this.x + this.offset.left < obj.x + obj.width - obj.offset.right &&
      this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom
    );
  }

  /**
   * Checks if this object's bounding box is colliding with the "head" area of another object.
   *
   * @param {DrawableObject} obj - Another drawable object to check head collision.
   * @returns {boolean} True if head collision occurs, false otherwise.
   */
  isCollidingHead(obj) {
    return (
      this.x + this.width - this.offset.right > obj.offsetHead.x &&
      this.y + this.height - this.offset.bottom > obj.offsetHead.y &&
      this.x + this.offset.left < obj.offsetHead.x + obj.offsetHead.width &&
      this.y + this.offset.top < obj.offsetHead.y + obj.offsetHead.height
    );
  }

  /**
   * Draws the current image on the provided canvas rendering context.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Calculates the y-position for the object to stand on the floor.
   *
   * @returns {number} The vertical position based on canvas height, object height, and floor height.
   */
  floorPosition() {
    return canvasHeight - this.height - floorHeight;
  }

  /**
   * Plays animation by cycling through an array of image paths.
   *
   * @param {string[]} arrayName - Array of image paths for animation frames.
   */
  playAnimation(arrayName) {
    let animationCount = this.animationCount % arrayName.length;
    let path = arrayName[animationCount];
    this.img = this.animatedImages[path];
    this.animationCount++;
  }

  /**
   * Plays a specific frame of an animation once.
   *
   * @param {string[]} arrayName - Array of image paths.
   * @param {number} count - The frame index to show.
   */
  playAnimationOnce(arrayName, count) {
    let path = arrayName[count];
    this.img = this.animatedImages[path];
  }

  /**
   * Loads a single image and sets it as the current image.
   *
   * @param {string} path - Path to the image file.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Preloads an array of images and stores them in animatedImages dictionary.
   *
   * @param {string[]} array - Array of image paths.
   */
  loadImagesArray(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.animatedImages[path] = img;
    });
  }
}
