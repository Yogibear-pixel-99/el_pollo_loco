class Bosshealthbar extends Statusbar {
    x = 500;
    y = 10;

  HEALTHBAR_IMAGES = [
    "./img/7_statusbars/2_statusbar_endboss/orange/orange0.png",
    "./img/7_statusbars/2_statusbar_endboss/orange/orange20.png",
    "./img/7_statusbars/2_statusbar_endboss/orange/orange40.png",
    "./img/7_statusbars/2_statusbar_endboss/orange/orange60.png",
    "./img/7_statusbars/2_statusbar_endboss/orange/orange80.png",
    "./img/7_statusbars/2_statusbar_endboss/orange/orange100.png",
  ];

  constructor() {
    super();
    this.loadImage(this.HEALTHBAR_IMAGES[5]);
  }
}
