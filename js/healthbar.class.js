class Healthbar extends Statusbar{
    x = 20;
    y = 10;

    HEALTH_BAR_IMAGES = [
        "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
        "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
        "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
        "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
        "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
        "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png"
      ];

constructor(){
    super();
    this.loadImage(this.HEALTH_BAR_IMAGES[5]);
    this.loadImagesArray(this.HEALTH_BAR_IMAGES);
}

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
    } else if (energy > 0) {
      this.img = this.animatedImages[this.HEALTH_BAR_IMAGES[1]];
    } else if (energy == 0){
      this.img = this.animatedImages[this.HEALTH_BAR_IMAGES[0]];
    }
  }

}