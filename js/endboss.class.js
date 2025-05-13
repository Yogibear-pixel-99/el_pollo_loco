class Endboss extends Enemies {
  height = 300;
  width = 250;
  walkingSpeed = 1.5;
  enemyName = "endboss";
  y = 480 - this.height - 58 + 15;
  x = 400;
  hitEnemy = false;
  energy = 20;
  alertAnimationInterval;
  walkAnimationInterval;
  bottleHitAnimationInterval;
  bossDeadAnimationInterval;

WALKING_ANIMATION = [
  "./img/4_enemie_boss_chicken/1_walk/G1.png",
  "./img/4_enemie_boss_chicken/1_walk/G2.png",
  "./img/4_enemie_boss_chicken/1_walk/G3.png",
  "./img/4_enemie_boss_chicken/1_walk/G4.png"
]

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

  BOSS_BOTTLE_HIT_ANIMATION = [
    "./img/4_enemie_boss_chicken/4_hurt/G21.png",
    "./img/4_enemie_boss_chicken/4_hurt/G22.png",
    "./img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  BOSS_DEAD_ANIMATION = [
    "./img/4_enemie_boss_chicken/5_dead/G24.png",
    "./img/4_enemie_boss_chicken/5_dead/G25.png",
    "./img/4_enemie_boss_chicken/5_dead/G26.png"
  ]

  offset = {
    width: 250,
    height: 300,
    top: 115,
    right: 30,
    bottom: 60,
    left: 45,
  };

  offsetHead = {
    width: 68,
    height: 90,
    x: this.x + 17,
    y: this.y + 65,
  };

  constructor() {
    super();
    console.log(this.x);
    console.log(this.y);
    this.loadImage(this.ALERT_ANIMATION[0]);
    // this.x = this.canvasWidth  * 1;
    this.loadImagesArray(this.WALKING_ANIMATION);
    this.loadImagesArray(this.ALERT_ANIMATION);
    this.loadImagesArray(this.BOSS_BOTTLE_HIT_ANIMATION);
    this.loadImagesArray(this.BOSS_DEAD_ANIMATION);
  }

  startFight(){
    // this.animateWalk();
    // this.moveEnemies();
  }

  moveLeft() {
    this.x = this.x - this.walkingSpeed * this.xFactor;
    this.offsetHead.x = this.offsetHead.x - this.walkingSpeed * this.xFactor;
  }

  animateAlert() {
    this.alertAnimationInterval = setInterval(() => {
      this.playAnimation(this.ALERT_ANIMATION);
    }, this.animationCycle);
  }


  async bossBottleHit() {
    if (this.energy > 0) {
      this.energy -= 10;
      this.stopAllBossAnimateIntervals();
      // clearInterval(this.walkAnimationInterval);
      // clearInterval(this.bottleHitAnimationInterval);
      // clearInterval(this.bossDeadAnimationInterval);
      await this.playAnimationSpecificTime(3, this.BOSS_BOTTLE_HIT_ANIMATION, 'bottleHitAnimationInterval');
      this.animateWalk();
    } else {
      this.stopAllBossAnimateIntervals();
      await this.playAnimationSpecificTime(5, this.BOSS_BOTTLE_HIT_ANIMATION, 'bottleHitAnimationInterval');
      await this.playAnimationSpecificTime(1, this.BOSS_DEAD_ANIMATION, 'bossDeadAnimationInterval');

      // this.updateScorePointsBottleHit(enemy.enemyName);
      // this.updatePlayerScore();
    }
  }

  stopAllBossAnimateIntervals(){
    const intervals = ['bottleHitAnimationInterval', 'bossDeadAnimationInterval', 'alertAnimationInterval', 'walkAnimationInterval'];
          intervals.forEach((interval) => clearInterval(this[interval]));
  }



  async playAnimationSpecificTime(times, imgArray, intervalName) {
    return new Promise((resolve) => { 
    let loop = 0;
    let count = 0;
  
    this[intervalName] = setInterval(() => {
      if (count < imgArray.length) {
        let path = imgArray[count];
        this.img = this.animatedImages[path];
        count++;
      } else {
        count = 0;
        loop++;
  
        if (loop >= times) {
          clearInterval(this[intervalName]);
          resolve();
        }
      }
    }, 100);
  });
}

}
