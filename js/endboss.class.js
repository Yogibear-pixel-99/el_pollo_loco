class Endboss extends Enemies {
  height = 300;
  width = 250;
  walkingSpeed = 2;
  enemyName = "endboss";
  y = 480 - this.height - 58 + 15;
  x = 1400;
  hitEnemy = false;
  energy = 20;
  isDead = false;
  
  acceleration = 2.5;

  alertAnimationInterval;
  walkAnimationInterval;
  bottleHitAnimationInterval;
  bossDeadAnimationInterval;
  bossAttackAlertInterval;

  walkInterval;
  attackInterval;
  jumpAttackInterval;

  allAnimateIntervals = [
    'bottleHitAnimationInterval',
    'bossDeadAnimationInterval',
    'alertAnimationInterval', 
    'walkAnimationInterval',
    'bossAttackAlertAnimationInterval',
    'bossAttackJumpAnimationInterval'
  ];

  allMovementIntervals = [
    'walkInterval',
    'attackInterval',
    'jumpAttackInterval'
  ]

  animationCycle = 170;
  moveCycle = 30;

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



  BOSS_ATTACK_ALERT_ANIMATION = [
    "./img/4_enemie_boss_chicken/3_attack/G13.png",
    "./img/4_enemie_boss_chicken/3_attack/G14.png",
    "./img/4_enemie_boss_chicken/3_attack/G15.png",
  ];

  BOSS_ATTACK_JUMP_ANIMATION = [
    "./img/4_enemie_boss_chicken/3_attack/G16.png",
    "./img/4_enemie_boss_chicken/3_attack/G17.png",
    "./img/4_enemie_boss_chicken/3_attack/G18.png",
    "./img/4_enemie_boss_chicken/3_attack/G19.png",
    "./img/4_enemie_boss_chicken/3_attack/G20.png",
  ];



  offset = {
    width: 250,
    height: 300,
    top: 115,
    right: 30,
    bottom: 60,
    left: 50,
  };

  get offsetHead() {
    return {
    width: 70,
    height: 100,
    x: this.x + 28,
    y: this.y + 45,
  };
}

  constructor() {
    super();
    console.log(this.x);
    console.log(this.y);
    this.loadImage(this.ALERT_ANIMATION[0]);
    this.loadImagesArray(this.WALKING_ANIMATION);
    this.loadImagesArray(this.ALERT_ANIMATION);
    this.loadImagesArray(this.BOSS_BOTTLE_HIT_ANIMATION);
    this.loadImagesArray(this.BOSS_DEAD_ANIMATION);
    this.loadImagesArray(this.BOSS_ATTACK_ALERT_ANIMATION);
    this.loadImagesArray(this.BOSS_ATTACK_JUMP_ANIMATION);
    this.applyGravity();
  }

  startFight(){
    this.animateWalk();
    this.moveEnemies();
    this.attack();
  }

  async attack(){
    const rndTime = Math.floor(Math.random() * (5000 - 2500) + 2500);
    const rndNrForAttack = Math.round(Math.random() * (3 - 1) + 1);
    await this.timeDelay(rndTime);
        console.log(rndNrForAttack);
        this.stopAllBossAnimateIntervals();
        this.stopAllBossMovementIntervals();
        await this.playAnimationSpecificTime(1, this.ALERT_ANIMATION, 'alertAnimationInterval');
        await this.playAnimationSpecificTime(1, this.BOSS_ATTACK_ALERT_ANIMATION, 'bossAttackAlertAnimationInterval');
        await this.randomAttackJumps(rndNrForAttack);
        this.stopAllBossAnimateIntervals();
        this.stopAllBossMovementIntervals();
        this.animateWalk();
        this.moveEnemies();
        this.attack();
  }

  async randomAttackJumps(rounds){
    for (let attackIndex = 0; attackIndex < rounds; attackIndex++) {
      await this.bossMovesToFloor();
      this.speedY = 20;
      this.jumpAttackInterval = setInterval(() => {
           this.x = this.x - 7;
      }, 20);
      await this.playAnimationSpecificTime(1, this.BOSS_ATTACK_JUMP_ANIMATION, 'bossAttackJumpAnimationInterval');
      clearInterval(this.jumpAttackInterval);
    }
  }

  async timeDelay(time){
    return new Promise (resolve => setTimeout(resolve, time))
  }

  async bossMovesToFloor(){
    return new Promise((resolve) => {
      setInterval(() => {
              if (this.y == this.floorPosition()) {
        resolve(true);
      };
      }, 40);

  })
}

  applyGravity() {
    setInterval(() => {
      if (this.aboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      } else {
        this.y = this.floorPosition();
      }
    }, 1000 / 25);
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
    if (this.isDead == true) {
      this.stopAllBossAnimateIntervals();
      this.stopAllBossMovementIntervals();
      this.img.src = this.BOSS_DEAD_ANIMATION[2];
    } else {
      this.energy -= 10;
      if (this.energy > 0) {
      this.stopAllBossAnimateIntervals();
      this.stopAllBossMovementIntervals();
      await this.playAnimationSpecificTime(3, this.BOSS_BOTTLE_HIT_ANIMATION, 'bottleHitAnimationInterval');
      this.animateWalk();
      this.moveEnemies();
      this.attack();
    } else {
      this.stopAllBossAnimateIntervals();
      this.stopAllBossMovementIntervals();
      this.isDead = true;
      await this.playAnimationSpecificTime(3, this.BOSS_BOTTLE_HIT_ANIMATION, 'bottleHitAnimationInterval');
      await this.playAnimationSpecificTime(3, this.BOSS_DEAD_ANIMATION, 'bossDeadAnimationInterval');
    }
  }
  }
      // this.updateScorePointsBottleHit(enemy.enemyName);
      // this.updatePlayerScore();


  stopAllBossAnimateIntervals(){
          this.allAnimateIntervals.forEach((interval) => clearInterval(this[interval]));
  }

  stopAllBossMovementIntervals(){
    this.allMovementIntervals.forEach((interval) => clearInterval(this[interval]));
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
