class Endboss extends Enemies {
  height = 300;
  width = 250;
  walkingSpeed = 1.5;
  ALERT_ANIMATION = [
    "./img/4_enemie_boss_chicken/2_alert/G5.png",
    "./img/4_enemie_boss_chicken/2_alert/G6.png",
    "./img/4_enemie_boss_chicken/2_alert/G7.png",
    "./img/4_enemie_boss_chicken/2_alert/G8.png",
    "./img/4_enemie_boss_chicken/2_alert/G9.png",
    "./img/4_enemie_boss_chicken/2_alert/G10.png",
    "./img/4_enemie_boss_chicken/2_alert/G11.png",
    "./img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  offset = {
    top: 80,
    right: 30,
    bottom: 30,
    left: 30
  }

  constructor() {
    super();
    this.loadImage(this.ALERT_ANIMATION[0]);
    this.x = this.canvasWidth  * 1 + 200;
    this.y = this.canvasHeight - this.height - this.floorHeight + 15;
    this.loadImagesArray(this.ALERT_ANIMATION);
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.ALERT_ANIMATION);
    }, this.animationCycle);
  }
}
