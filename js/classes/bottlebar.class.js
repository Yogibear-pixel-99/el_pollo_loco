/**
 * The bottlebar to show how many bottles are collected.
 * Handels appearance of the bottle bar.
 * Inherits from {@link Statusbar}.
 */
class Bottlebar extends Statusbar {
  /** Horizontal position
   * @type {number}
   */
  x = 20;

  /** Vertical position
   * @type {number}
   */
  y = 50;

  /** Image frames shown in the ui depending on character bottle collected. */
  BOTTLE_BAR_IMAGES = [
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
  ];

  /**
   * Creates an instance of the bottle UI bar.
   * Loads all relevant animation frames.
   * Sets the initial image to the first bottle bar images animation frame.
   */
  constructor() {
    super();
    this.loadImage(this.BOTTLE_BAR_IMAGES[0]);
    this.loadImagesArray(this.BOTTLE_BAR_IMAGES);
  }

  /**
   * Displays the right bottle bar amount, depending on the bottles the character collected.
   */
  updateBottleBar() {
    const bottles = world.character.bottles;
    if (bottles == 5) {
      this.img = this.animatedImages[this.BOTTLE_BAR_IMAGES[5]];
    } else if (bottles >= 4) {
      this.img = this.animatedImages[this.BOTTLE_BAR_IMAGES[4]];
    } else if (bottles >= 3) {
      this.img = this.animatedImages[this.BOTTLE_BAR_IMAGES[3]];
    } else if (bottles >= 2) {
      this.img = this.animatedImages[this.BOTTLE_BAR_IMAGES[2]];
    } else if (bottles >= 1) {
      this.img = this.animatedImages[this.BOTTLE_BAR_IMAGES[1]];
    } else if (bottles == 0) {
      this.img = this.animatedImages[this.BOTTLE_BAR_IMAGES[0]];
    }
  }
}
