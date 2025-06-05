/**
 * Clouds that move automatically in the background.
 * Extends {@link MovableObject}.
 */
class Clouds extends MovableObject {
  height = 200;
  width = 350;
  speedNumber = 0;

  /**
   * Animation frame ID for the automatic cloud movement.
   * @type {number}
   */
  cloudsAutoMove;

  /**
   * Creates an instance of Clouds.
   * Loads the image, sets initial random vertical position and horizontal position,
   * then starts automatic movement to the left.
   *
   * @param {string} imagePath - Path to the cloud image.
   * @param {number} speedNumber - Movement speed of the cloud.
   * @param {number} x - Starting horizontal position.
   */
  constructor(imagePath, speedNumber, x) {
    super();
    this.loadImage(imagePath);
    this.y = (Math.random() * canvasHeight) / 5;
    this.x = x + Math.random() * (canvasWidth + 100) - 100;
    this.speedNumber = speedNumber;
    this.autoMoveLeft();
  }

  /**
   * Automatically moves the cloud to the left.
   * When the cloud goes off screen, it resets to the right with
   * a new random vertical position and speed.
   */
  autoMoveLeft() {
    this.cloudsAutoMove = requestAnimationFrame(() => {
      if (gamePaused) {
        this.autoMoveLeft();
        return;
      }
      this.x -= this.speedNumber;
      if (this.x < -340 - 719) {
        this.y = (Math.random() * canvasHeight) / 5;
        this.x = canvasWidth * 6;
        this.speedNumber = Math.random() * (0.2 - 0.05) + 0.05;
      }
      this.autoMoveLeft();
    });
  }

  /**
   * Cancels the automatic cloud movement animation.
   */
  cancelAutoMove() {
    cancelAnimationFrame(this.cloudsAutoMove);
  }
}
