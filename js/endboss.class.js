class Endboss extends Enemies {
  height = 300;
  width = 250;
  walkingSpeed = 1.3;
  scoreNameKilled = "endbossKilled";
  scoreNameBottle = "endbossBottleHit";
  // y = 480 - this.height - 58 + 15;
  x = 800;
  // x = 719 * 6;
  // energy = 50;
  energy;
  acceleration = 2.5;
  deadAnimationCount = 0;

  animateInterval;
  moveInterval;
  jumpAttackInterval;
  moveDirectionInterval;

  isWalking = false;
  lives = true;
  // attackedTime;

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

  allBossIntervals = [
    "moveInterval",
    "animateInterval",
    "jumpAttackInterval",
  ];
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
    this.animate();
  }

  /**
   * Starts the boss fight by calling the movement, attacking and animate intervall.
   */
  startBossFight() {
    // audio.sfx.bossIsTriggerd.play();
    audio.playSound('bossIsTriggerd');
    this.isTriggered = true;
    this.bossMoveDirection();
    this.attack();
    this.move();
  }

  /**
   * Animates the boss.
   */
  animate() {
    this.animateInterval = setInterval(() => {
      if (this.isDead()) {
        // this.stopAllBossIntervals();
        this.endBossDead();
      } else if (this.bossIsHurt()) {
        this.playAnimation(this.BOSS_BOTTLE_HIT_ANIMATION);
      } else {
        this.playAnimation(this.WALKING_ANIMATION);
      }
    }, 130);
  }

  endBossDead() {
    audio.playSound('bossDied');
    // audio.sfx.bossDied.play();
    // let interval = setInterval(() => {
      if (this.deadAnimationCount < 9) {
        this.playAnimation(this.BOSS_DEAD_ANIMATION);
      } else {
        // clearInterval(interval);
        // clearInterval(this.animateInterval);
        this.stopAllBossIntervals();
        this.img = this.animatedImages[this.BOSS_DEAD_ANIMATION[2]];
      }
      this.deadAnimationCount++;
    // }, 100);
  }

  /**
   *
   */
  move() {
    this.moveInterval = setInterval(() => {
      if (!this.isDead()) {
      }
      if (this.otherDirection) {
        this.bossMoveRight();
      } else {
        this.bossMoveLeft();
      }
    }, 1000 / 60);
  }

  /**
   * Sets the x position to -1.
   */
  bossMoveLeft() {
    this.x = this.x - 1;
  }

  /**
   * Sets the x position to -1.
   */
  bossMoveRight() {
    this.x = this.x + 1;
  }

  /**
   * Calls an attack mode.
   */
  attack() {
    if (!world.checkGameEnd()) {
    let attackDelay = Math.round(Math.random() * (4500 - 2500) + 2500);
    setTimeout(() => {
      this.stopAllBossIntervals();
      this.jumpAttack();
    }, attackDelay);
  }}

  /**
   * Calls a random jump attack.
   */
  jumpAttack() {
    let attackAnimationNr = Math.ceil(Math.random() * 3) * 5 + 10;
    let attackCount = 0;
    this.animationCount = 0;
    this.jumpAttackInterval = setInterval(() => {
      if (!this.bossIsHurt()) {
        if (attackCount < 8) {
          this.playAnimation(this.ALERT_ANIMATION);
        } else if (attackCount >= 8 && attackCount <= 10) {
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
          audio.sfx.bossAttacks.play();
          this.bossAttackMovement(attackAnimationNr);
        } else if (attackCount > attackAnimationNr && !this.isDead()) {
          this.animationCount = 0;
          clearInterval(this.jumpAttackInterval);
          this.animate();
          this.move();
          this.attack();
        } else if (this.isDead()) {
          clearInterval(this.jumpAttackInterval);
          this.animate();
        }
        attackCount++;
      } else {
        this.playAnimation(this.BOSS_BOTTLE_HIT_ANIMATION);
      }
    }, 150);
  }

  /**
   * The jump attack movement from the endboss, changes x with intervall and y by speedY with gravity function.
   */
  bossAttackMovement() {
    let count = 0;
    let interval;
    if (!this.aboveGround()) {
      this.speedY = 22;
      interval = setInterval(() => {
        if (count < 30) {
          if (this.otherDirection) {
            this.x = this.x + 6;
          } else {
            this.x = this.x - 6;
          }
          count++;
        } else {
          clearInterval(interval);
        }
      }, 20);
    }
  }

  /**
   * Reduces the health from the boss and saves the time to a variable at this time.
   */
  hitBoss() {
    this.energy -= 10;
    this.lastHit = new Date().getTime();
    world.bossHealthbar.updateBossHealthbar();
  }

  /**
   * Checks if the boss was hurt within the last 1,5 seconds.
   *
   * @returns A boolean.
   */
  bossIsHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000; // millisec / 1000 = sec.
    return timePassed < 1.5;
  }

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

  stopAllBossIntervals() {
    this.allBossIntervals.forEach((interval) => {
      clearInterval(this[interval]);
    });
  }

  bossMoveDirection() {
    this.moveDirectionInterval = setInterval(() => {
      console.log(this.otherDirection);
      if (this.x < world.character.x - canvasWidth) {
        this.otherDirection = true;
      }
      if (this.x > world.character.x + canvasWidth) {
        this.otherDirection = false;
      }
    }, 1000);
  }
}
