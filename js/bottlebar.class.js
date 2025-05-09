class Bottlebar extends Statusbar {
  BOTTLE_BAR_IMAGES = [
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
  ];

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadImage(this.BOTTLE_BAR_IMAGES[0]);
    this.loadImagesArray(this.BOTTLE_BAR_IMAGES);
  }

  updateBottleBar() {}
}
