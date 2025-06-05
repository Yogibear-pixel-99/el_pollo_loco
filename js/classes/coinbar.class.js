/**
 * Displays the coin collection status bar.
 * Extends {@link Statusbar}.
 */
class Coinbar extends Statusbar {

  x = 20;
  y = 90;

  COIN_BAR_IMAGES = [
    "./img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png",
    "./img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png",
    "./img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png",
    "./img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png",
    "./img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png",
    "./img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png",
  ];

  /**
   * Creates an instance of the coin bar.
   * Loads the initial coin bar image and all coin bar frames.
   */
  constructor() {
    super();
    this.loadImage(this.COIN_BAR_IMAGES[0]);
    this.loadImagesArray(this.COIN_BAR_IMAGES);
  }

  /**
   * Updates the coin bar image based on the current number of coins collected.
   * Reflects the progress visually by changing the displayed coin bar frame.
   */
  updateCoinBar() {
    const coins = world.character.coins;

    if (coins === 10) {
      this.img = this.animatedImages[this.COIN_BAR_IMAGES[5]];
    } else if (coins >= 9) {
      this.img = this.animatedImages[this.COIN_BAR_IMAGES[4]];
    } else if (coins >= 7) {
      this.img = this.animatedImages[this.COIN_BAR_IMAGES[3]];
    } else if (coins >= 4) {
      this.img = this.animatedImages[this.COIN_BAR_IMAGES[2]];
    } else if (coins >= 1) {
      this.img = this.animatedImages[this.COIN_BAR_IMAGES[1]];
    } else if (coins === 0) {
      this.img = this.animatedImages[this.COIN_BAR_IMAGES[0]];
    }
  }
}
