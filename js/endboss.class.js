class Endboss extends Enemies {
  height = 300;
  width = 250;
  walkingSpeed = 1.3;
  scoreNameKilled = "endbossKilled";
  scoreNameBottle = "endbossBottleHit";
  y = 480 - this.height - 58 + 15;
  x = 600;
  // x = 719 * 6;
  energy = 100;
  acceleration = 2.5;
  alreadyAttacks = false;
  animateInterval;
  moveInterval;

  // alertAnimationInterval;
  // walkAnimationInterval;
  // bottleHitAnimationInterval;
  // bossDeadAnimationInterval;
  // bossAttackAlertInterval;

  // walkInterval;
  // attackInterval;
  // jumpAttackInterval;

  isWalking = false;
  lives = true;
  attackedTime;

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

  allAnimateIntervals = ["animateInterval"];

  allMovementIntervals = ["moveInterval"];

  // allAnimateIntervals = [
  //   'bottleHitAnimationInterval',
  //   'bossDeadAnimationInterval',
  //   'alertAnimationInterval',
  //   'walkAnimationInterval',
  //   'bossAttackAlertAnimationInterval',
  //   'bossAttackJumpAnimationInterval'
  // ];

  // allMovementIntervals = [
  //   'walkInterval',
  //   'attackInterval',
  //   'jumpAttackInterval'
  // ]

  animationCycle = 170;
  moveCycle = 30;

  WALKING_ANIMATION = [
    "./img/4_enemie_boss_chicken/1_walk/G1.png",
    "./img/4_enemie_boss_chicken/1_walk/G2.png",
    "./img/4_enemie_boss_chicken/1_walk/G3.png",
    "./img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

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
    "./img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

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

  constructor() {
    super();
    this.loadImage(this.ALERT_ANIMATION[0]);
    this.loadImagesArray(this.WALKING_ANIMATION);
    this.loadImagesArray(this.ALERT_ANIMATION);
    this.loadImagesArray(this.BOSS_BOTTLE_HIT_ANIMATION);
    this.loadImagesArray(this.BOSS_DEAD_ANIMATION);
    this.loadImagesArray(this.BOSS_ATTACK_ALERT_ANIMATION);
    this.loadImagesArray(this.BOSS_ATTACK_JUMP_ANIMATION);
    this.applyGravity();
  }

  startBossFight() {
    this.animate();
    this.move();
    this.attack();
  }

  // startBossFight(){
  //   this.animateWalk();
  //   this.moveEnemies();
  //   this.attack();
  //   this.isWalking = true;
  // }

  animate() {
    this.animateInterval = setInterval(() => {
      if (!this.isDead()) {
        this.animateWalk();
      }
    }, 150);
  }

  move() {
    this.moveInterval = setInterval(() => {
      if (!this.isDead()) {
        this.moveLeft();
      }
    }, 1000 / 60);
  }

  animateWalk() {
    this.playAnimation(this.WALKING_ANIMATION);
  }

  moveLeft() {
    this.x = this.x - 1;
  }

  attack() {
    let attackDelay = Math.round(Math.random() * (4500 - 2500) + 2500);
    setTimeout(() => {
      this.stopAllBossAnimateIntervals();
      this.stopAllBossMovementIntervals();
      this.jumpAttack();
    }, attackDelay);
    // rnd number of jumps 1-3
    // stop movement
    // stop animation
    // new animation
    // new movement
  }

  jumpAttack() {
    let attackAnimationNr = Math.ceil(Math.random() * 3) * 5 + 10;
    let attackCount = 0;
    this.animationCount = 0;
    let interval = setInterval(() => {
      if (attackCount < 8 && !this.isDead()) {
        this.playAnimation(this.ALERT_ANIMATION);
      } else if (attackCount >= 8 && attackCount <= 10 && !this.isDead()) {
        if (attackCount === 8) {
          this.animationCount = 0;
        }
        this.playAnimation(this.BOSS_ATTACK_ALERT_ANIMATION);
      } else if (
        attackCount >= 11 &&
        attackCount <= attackAnimationNr &&
        !this.isDead()
      ) {
        if (attackCount === 11) {
          this.animationCount = 0;
        }
        this.playAnimation(this.BOSS_ATTACK_JUMP_ANIMATION);
        this.bossAttackMovement(attackAnimationNr);
      } else if (attackCount > attackAnimationNr && !this.isDead()) {
        this.animationCount = 0;
        clearInterval(interval);
        this.animate();
        this.move();
        this.attack();
      } else if (this.isDead()) {
        clearInterval(interval);
      }
      attackCount++;
    }, 150);
  }

  bossAttackMovement(nr) {
    if (!this.aboveGround()) {
      this.speedY = 20;
      }
    this.x = this.x - 3;
  }

  // async attack(){
  //   if (!this.isDead) {
  //   const rndTime = Math.floor(Math.random() * (5000 - 2500) + 2500);
  //   const rndNrForAttack = Math.round(Math.random() * (3 - 1) + 1);
  //   await this.timeDelay(rndTime);
  //       this.stopAllBossIntervals();
  //       if (this.isDead) return;
  //       await this.playAnimationSpecificTime(1, this.ALERT_ANIMATION, 'alertAnimationInterval');
  //       if (this.isDead) return;
  //       await this.playAnimationSpecificTime(1, this.BOSS_ATTACK_ALERT_ANIMATION, 'bossAttackAlertAnimationInterval');
  //       if (this.isDead) return;
  //       await this.randomAttackJumps(rndNrForAttack);
  //       if (this.isDead) return;
  //       this.stopAllBossIntervals()
  //       this.animateWalk();
  //       this.moveEnemies();
  //     if (!this.isDead){
  //       this.attack();
  //     }
  // }}

  // async randomAttackJumps(rounds){
  //   for (let attackIndex = 0; attackIndex < rounds; attackIndex++) {
  //     if (this.isDead) return;
  //     await this.bossMovesToFloor();
  //     this.speedY = 20;
  //     this.jumpAttackInterval = setInterval(() => {
  //          this.x = this.x - 7;
  //     }, 20);
  //     await this.playAnimationSpecificTime(1, this.BOSS_ATTACK_JUMP_ANIMATION, 'bossAttackJumpAnimationInterval');
  //     clearInterval(this.jumpAttackInterval);
  //     if (this.isDead) return;
  //   }
  // }
  async randomAttackJumps(rounds) {
    for (let attackIndex = 0; attackIndex < rounds; attackIndex++) {
      if (this.isDead) return;
      await this.bossMovesToFloor();
      this.speedY = 20;
      this.jumpAttackInterval = setInterval(() => {
        this.x = this.x - 7;
      }, 20);
      await this.playAnimationSpecificTime(
        1,
        this.BOSS_ATTACK_JUMP_ANIMATION,
        "bossAttackJumpAnimationInterval"
      );
      clearInterval(this.jumpAttackInterval);
      if (this.isDead) return;
    }
  }

  // async timeDelay(time){
  //   return new Promise (resolve => setTimeout(resolve, time))
  // }

  //   async bossMovesToFloor(){
  //     return new Promise((resolve) => {
  //       setInterval(() => {
  //               if (this.y == this.floorPosition()) {
  //         resolve(true);
  //       };
  //       }, 40);

  //   })
  // }

  applyGravity() {
    setInterval(() => {
      if (this.aboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      } else {
        this.y = this.floorPosition() + 15;
      }
    }, 1000 / 25);
  }

  moveLeft() {
    this.x = this.x - this.walkingSpeed;
    this.offsetHead.x = this.offsetHead.x - this.walkingSpeed;
  }

  // animateAlert() {
  //   this.alertAnimationInterval = setInterval(() => {
  //     this.playAnimation(this.ALERT_ANIMATION);
  //   }, this.animationCycle);
  // }

  // async bossBottleHit() {
  //   if (this.isDead === true) {
  //     this.stopAllBossIntervals();
  //     this.img.src = this.BOSS_DEAD_ANIMATION[2];
  //   } else {
  //     this.energy -= 10;
  //     world.bossHealthbar.updateBossHealthbar();
  //     if (this.energy > 0) {
  //     this.stopAllBossIntervals();
  //     await this.playAnimationSpecificTime(3, this.BOSS_BOTTLE_HIT_ANIMATION, 'bottleHitAnimationInterval');
  //     this.animateWalk();
  //     this.moveEnemies();
  //     this.attack();
  //   } else {
  //     this.stopAllBossIntervals();
  //     this.isDead = true;
  //     await this.playAnimationSpecificTime(3, this.BOSS_BOTTLE_HIT_ANIMATION, 'bottleHitAnimationInterval');
  //     await this.playAnimationSpecificTime(3, this.BOSS_DEAD_ANIMATION, 'bossDeadAnimationInterval');
  //   }
  // }
  // }

  stopAllBossAnimateIntervals() {
    this.allAnimateIntervals.forEach((interval) =>
      clearInterval(this[interval])
    );
  }

  stopAllBossMovementIntervals() {
    this.allMovementIntervals.forEach((interval) =>
      clearInterval(this[interval])
    );
  }

  // stopAllBossIntervals(){
  //   this.stopAllBossAnimateIntervals();
  //   this.stopAllBossMovementIntervals();
  // }
}
