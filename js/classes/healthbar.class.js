/**
 * Represents the health bar of the character.
 * Displays the player's remaining energy as a visual status bar.
 * Inherits from {@link Statusbar}.
 */
class Healthbar extends Statusbar {
  /**
   * X position of the health bar on the canvas.
   */
  x = 20;

  /**
   * Y position of the health bar on the canvas.
   */
  y = 10;

  /**
   * Array of image paths representing different health states (0% to 100%).
   */
  HEALTH_BAR_IMAGES = [
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];

  /**
   * Creates an instance of the health bar.
   * Sets the initial image and loads all health state images.
   */
  constructor() {
    super();
    this.loadImage(this.HEALTH_BAR_IMAGES[5]);
    this.loadImagesArray(this.HEALTH_BAR_IMAGES);
  }

  /**
   * Updates the health bar image based on the character's current energy.
   */
  updateHealthbar() {
    const energy = world.character.energy;

    if (energy === 100) {
      this.img = this.animatedImages[this.HEALTH_BAR_IMAGES[5]];
    } else if (energy >= 80) {
      this.img = this.animatedImages[this.HEALTH_BAR_IMAGES[4]];
    } else if (energy >= 50) {
      this.img = this.animatedImages[this.HEALTH_BAR_IMAGES[3]];
    } else if (energy >= 20) {
      this.img = this.animatedImages[this.HEALTH_BAR_IMAGES[2]];
    } else if (energy >= 5) {
      this.img = this.animatedImages[this.HEALTH_BAR_IMAGES[1]];
    } else if (energy == 0) {
      this.img = this.animatedImages[this.HEALTH_BAR_IMAGES[0]];
    }
  }
}
