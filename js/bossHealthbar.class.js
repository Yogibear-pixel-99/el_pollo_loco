class Bosshealthbar extends Statusbar {
    x = 500;
    y = 10;

  HEALTH_BAR_IMAGES = [
    "./img/7_statusbars/2_statusbar_endboss/orange/orange0.png",
    "./img/7_statusbars/2_statusbar_endboss/orange/orange20.png",
    "./img/7_statusbars/2_statusbar_endboss/orange/orange40.png",
    "./img/7_statusbars/2_statusbar_endboss/orange/orange60.png",
    "./img/7_statusbars/2_statusbar_endboss/orange/orange80.png",
    "./img/7_statusbars/2_statusbar_endboss/orange/orange100.png",
  ];

  constructor() {
    super();
    this.loadImage(this.HEALTH_BAR_IMAGES[5]);
    this.loadImagesArray(this.HEALTH_BAR_IMAGES);
  }

updateBossHealthbar(){
    const energy = world.level.endboss.energy;

        if (energy === 100) {
      this.img = this.animatedImages[this.HEALTH_BAR_IMAGES[5]];
    } else if (energy >= 80) {
      this.img = this.animatedImages[this.HEALTH_BAR_IMAGES[4]];
    } else if (energy >= 50) {
      this.img = this.animatedImages[this.HEALTH_BAR_IMAGES[3]];
    } else if (energy >= 30) {
      this.img = this.animatedImages[this.HEALTH_BAR_IMAGES[2]];
    } else if (energy >= 10) {
      this.img = this.animatedImages[this.HEALTH_BAR_IMAGES[1]];
    } else if (energy == 0){
      this.img = this.animatedImages[this.HEALTH_BAR_IMAGES[0]];
    }
}


}
