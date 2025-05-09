class Coinbar extends Statusbar {
  COIN_BAR_IMAGES = [
    "./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
  ];

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadImage(this.COIN_BAR_IMAGES[5]);
    this.loadImagesArray(this.COIN_BAR_IMAGES);
  }

  updateCoinBar() {
    const coins = world.character.coins;
    console.log(coins);
    if (coins == 10) {
      this.img = this.animatedImages[this.COIN_BAR_IMAGES[5]];
    } else if (coins >= 9) {
      this.img = this.animatedImages[this.COIN_BAR_IMAGES[4]];
    } else if (coins >= 7) {
      this.img = this.animatedImages[this.COIN_BAR_IMAGES[3]];
    } else if (coins >= 4) {
      this.img = this.animatedImages[this.COIN_BAR_IMAGES[2]];
    } else if (coins >= 1) {
      this.img = this.animatedImages[this.COIN_BAR_IMAGES[1]];
    } else if (coins == 0) {
      this.img = this.animatedImages[this.COIN_BAR_IMAGES[0]];
    }
  }
}
