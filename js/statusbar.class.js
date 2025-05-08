class Statusbar extends DrawableObject {

  width = 150;
  height = 50;
  barType = '';

HEALTH_BAR_IMAGES = [
  "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
  "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
  "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
  "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
  "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
  "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png"
];

BOTTLE_BAR_IMAGES = [
  "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
  "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
  "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
  "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
  "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
  "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
];

COIN_BAR_IMAGES = [
  "./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
  "./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
  "./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
  "./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
  "./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
  "./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
]

constructor(x, y, barType){
  super();
  this.barType = barType;
  this.x = x;
  this.y = y;
  this.loadImagesArray(this.HEALTH_BAR_IMAGES);
  this.loadImagesArray(this.COIN_BAR_IMAGES);
  this.loadImagesArray(this.BOTTLE_BAR_IMAGES);
  this.loadImage("./img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png");
}

updateHealthbar() {

  if(world.character.isHurt()) {

  const energy = world.character.energy;

  if (energy === 100) {
    this.img = this.animatedImages[this.HEALTH_BAR_IMAGES[5]];
  } else if (energy >= 80) {
    this.img = this.animatedImages[this.HEALTH_BAR_IMAGES[4]];
  } else if (energy >= 60) {
    this.img = this.animatedImages[this.HEALTH_BAR_IMAGES[3]];
  } else if (energy >= 40) {
    this.img = this.animatedImages[this.HEALTH_BAR_IMAGES[2]];
  } else if (energy >= 20) {
    this.img = this.animatedImages[this.HEALTH_BAR_IMAGES[1]];
  } else if (energy <= 0){
    this.img = this.animatedImages[this.HEALTH_BAR_IMAGES[0]];
  }
}
}


}