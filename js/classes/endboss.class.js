/**
 * The boss enemy in the game.
 * Handles boss movement, animation, attack, dead and soundeffects.
 * Extends the Enemies class.
 */
class Endboss extends Enemies {
  /** The height of the boss sprite in pixels. */
  height = 300;

  /** The width of the boss sprite in pixels. */
  width = 250;

  /** The walking speed. */
  walkingSpeed = 1.3;

  /** Score identifier when the boss is killed. */
  scoreNameKilled = "endbossKilled";

  /** Score identifier when the boss is hit by a bottle. */
  scoreNameBottle = "endbossBottleHit";

  /** Vertical position based on floor and sprite height. */
  y = 480 - this.height - 58 + 15;

  /** Horizontal position where the boss starts. */
  x = 719 * 6;

  /** Health of the boss. */
  energy = 50;

  /** Maximum health of the boss. */
  maxEnergy;

  /** Gravity acceleration used in jumping and falling. */
  acceleration = 2.5;

  /** Counter for dead animation cycles. */
  deadAnimationCount = 0;

  /** Interval ID for the boss animation loop. */
  animateInterval;

  /** Interval ID for boss movement loop. */
  moveInterval;

  /** Interval ID for the jump attack loop. */
  jumpAttackInterval;

  /** Interval ID for checking movement direction. */
  moveDirectionInterval;

  /** Interval ID for gravity simulation. */
  gravityInterval;

  /** Indicates if the boss is currently walking. */
  isWalking = false;

  /** Indicates if the boss is still alive. */
  lives = true;

  /** True when the boss fight has been triggered. */
  isTriggered = false;

  /**
   * Offsets for the boss hitbox used in collision detection.
   * @type {{width: number, height: number, top: number, right: number, bottom: number, left: number}}
   */
  offset = {
    width: 250,
    height: 300,
    top: 115,
    right: 30,
    bottom: 60,
    left: 50,
  };

  /**
   * Returns the boss's head hitbox (e.g. for detecting headshots).
   * @returns {{width: number, height: number, x: number, y: number}} The bounding box of the boss's head.
   */
  get offsetHead() {
    return {
      width: 70,
      height: 100,
      x: this.x + 28,
      y: this.y + 45,
    };
  }

  /** Names of all interval for normal movement and animation. */
  allBossIntervals = ["moveInterval", "animateInterval", "jumpAttackInterval"];

  /** Animation cycle duration for switching frames. */
  animationCycle = 170;

  /** Interval cycle for boss movement logic. */
  moveCycle = 30;

  /** Image frames for the boss's walking animation. */
  WALKING_ANIMATION = [
    "./img/4_enemie_boss_chicken/1_walk/G1.png",
    "./img/4_enemie_boss_chicken/1_walk/G2.png",
    "./img/4_enemie_boss_chicken/1_walk/G3.png",
    "./img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  /** Image frames shown when the boss is alert. */
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

  /** Image frames shown when the boss gets hit by a bottle. */
  BOSS_BOTTLE_HIT_ANIMATION = [
    "./img/4_enemie_boss_chicken/4_hurt/G21.png",
    "./img/4_enemie_boss_chicken/4_hurt/G22.png",
    "./img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  /** Image frames shown during the boss’s death. */
  BOSS_DEAD_ANIMATION = [
    "./img/4_enemie_boss_chicken/5_dead/G24.png",
    "./img/4_enemie_boss_chicken/5_dead/G25.png",
    "./img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  /** Image frames shown just before the boss jumps. */
  BOSS_ATTACK_ALERT_ANIMATION = [
    "./img/4_enemie_boss_chicken/3_attack/G13.png",
    "./img/4_enemie_boss_chicken/3_attack/G14.png",
    "./img/4_enemie_boss_chicken/3_attack/G15.png",
  ];

  /** Image frames shown during the boss's jump attack. */
  BOSS_ATTACK_JUMP_ANIMATION = [
    "./img/4_enemie_boss_chicken/3_attack/G16.png",
    "./img/4_enemie_boss_chicken/3_attack/G17.png",
    "./img/4_enemie_boss_chicken/3_attack/G18.png",
    "./img/4_enemie_boss_chicken/3_attack/G19.png",
    "./img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  /**
   * Creates an instance of the Endboss.
   * Loads all relevant animation frames.
   * Sets the initial image to the first alert animation frame.
   */
  constructor() {
    super();
    this.loadImage(this.ALERT_ANIMATION[0]);
    this.loadImagesArray(this.WALKING_ANIMATION);
    this.loadImagesArray(this.ALERT_ANIMATION);
    this.loadImagesArray(this.BOSS_BOTTLE_HIT_ANIMATION);
    this.loadImagesArray(this.BOSS_DEAD_ANIMATION);
    this.loadImagesArray(this.BOSS_ATTACK_ALERT_ANIMATION);
    this.loadImagesArray(this.BOSS_ATTACK_JUMP_ANIMATION);
  }

  /**
   * Starts the boss fight by calling the boss intrvals.
   * Plays a soundeffect when the boss is triggerd and sets isTriggerd to true;
   */
  startBossFight() {
    audio.playSound("bossIsTriggerd");
    this.isTriggered = true;
    this.bossMoveDirection();
    this.startBossIntervals();
    this.applyGravity();
  }

  /**
   * Start three boss intervals.
   * First for the attack movement.
   * Second for the normal movement.
   * Third for the boss animation.
   */
  startBossIntervals() {
    this.attack();
    this.move();
    this.animate();
  }

  /**
   * Animates the boss.
   */
  animate() {
    this.animateInterval = setInterval(() => {
      if (this.isDead()) {
        clearInterval(this.moveInterval);
        this.endBossDead();
      } else if (this.bossIsHurt()) {
        this.playAnimation(this.BOSS_BOTTLE_HIT_ANIMATION);
      } else {
        this.playAnimation(this.WALKING_ANIMATION);
      }
    }, 130);
  }

  /**
   * Plays a sound at the boss dead animation.
   * Plays two diffrent dead animations in a row.
   */
  endBossDead() {
    audio.playSound("bossDied");
    if (this.deadAnimationCount < 9) {
      this.playAnimation(this.BOSS_DEAD_ANIMATION);
    } else {
      this.stopAllBossIntervals();
      this.img = this.animatedImages[this.BOSS_DEAD_ANIMATION[2]];
    }
    this.deadAnimationCount++;
  }

  /**
   *  Sets a movement intervall, direction depending on the otherDirection variable.
   */
  move() {
    this.moveInterval = setInterval(() => {
      if (this.isDead()) return;
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
    }
  }

  /**
   * Executes a random jump attack sequence for the boss.
   * The attack consists of multiple animation phases: alert, attack warning, and jump attack.
   * A random attack duration is selected to vary the number of jump frames.
   * If the boss is hurt or dead, the attack is interrupted.
   * Also triggers movement and sound effects during the attack phase.
   */

  jumpAttack() {
    if (gamePaused) return;
    let attackAnimationNr = Math.ceil(Math.random() * 3) * 5 + 10;
    let attackCount = 0;
    this.animationCount = 0;
    this.jumpAttackInterval = setInterval(() => {
      if (this.isDead()) {
        this.clearJumpAttack();
      } else if (!this.bossIsHurt()) {
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
          audio.playSound("bossAttacks");
          this.bossAttackMovement(attackAnimationNr);
        } else if (attackCount > attackAnimationNr) {
          this.animationCount = 0;
          clearInterval(this.jumpAttackInterval);
          this.startBossIntervals();
        }
        attackCount++;
      } else {
        this.playAnimation(this.BOSS_BOTTLE_HIT_ANIMATION);
      }
    }, 150);
  }

  /**
   * Clears the jump attack interval and set the normal animate interval.
   * 
   * @returns {void}
   */
  clearJumpAttack() {
    clearInterval(this.jumpAttackInterval);
    this.animate();
    return;
  }

  /**
   * The jump attack movement from the endboss, changes x with intervall and y by speedY with gravity function.
   */
  bossAttackMovement() {
    if (gamePaused) return;
    let count = 0;
    let interval;
    if (!this.aboveGround()) {
      this.speedY = 22;
      interval = setInterval(() => {
        if (gamePaused) return;
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
    timePassed = timePassed / 1000;
    return timePassed < 1.5;
  }

  /**
   * Applys a gravity to the boss, if the boss is more than 15 pixels above the floor.
   */
  applyGravity() {
    this.gravityInterval = setInterval(() => {
      if (this.aboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      } else {
        this.y = this.floorPosition() + 15;
      }
    }, 1000 / 25);
  }

  /**
   * Stops all boss intervals in the "allBossIntervals" array.
   */
  stopAllBossIntervals() {
    this.allBossIntervals.forEach((interval) => {
      clearInterval(this[interval]);
    });
  }

  /**
   * Checks if the boss is on the left or right side of the character and sets the other direction variable.
   */
  bossMoveDirection() {
    this.moveDirectionInterval = setInterval(() => {
      if (this.x < world.character.x - 200) {
        this.otherDirection = true;
      }
      if (this.x > world.character.x + 200) {
        this.otherDirection = false;
      }
    }, 1000);
  }
}
