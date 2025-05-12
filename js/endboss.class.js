class Endboss extends Enemies {
  height = 300;
  width = 250;
  walkingSpeed = 1.5;
  enemyName = 'endboss';
  y = 480 - this.height - 58 + 15;
  x = 450;
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
    top: 115,
    right: 30,
    bottom: 60,
    left: 45
  }

  offsetHead = {
    width: 60,
    height: 90,
    x: this.x + 17,
    y: this.y + 65
  }

  constructor() {
    super();
    console.log(this.x);
    console.log(this.y);
    this.loadImage(this.ALERT_ANIMATION[0]);
    // this.x = this.canvasWidth  * 1;
    this.loadImagesArray(this.ALERT_ANIMATION);
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.ALERT_ANIMATION);
    }, this.animationCycle);
  }
}
