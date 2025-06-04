/**
 * The character in the game.
 * Handles character movement, animation, death and sound effects.
 * Inherits from {@link Enemies}.
 */
class Character extends MovableObject {
  /**
   * Horizontal position where the character starts.
   */
  x = 200;

  /**
   * The width of the character sprite in pixels.
   */
  width = 95;

  /**
   * The height of the boss sprite in pixels.
   */
  height = 190;

  /**
   * The character health.
   */

  energy = 100;

  /**
   * The collected coins.
   */
  coins = 0;

  /**
   * The collected bottles.
   */
  bottles = 0;

  /**
   * If the character is idle, this variable counts up to check if character is long idle.
   */
  idleCount = 0;

  /**
   * The current timestamp.
   */
  timestamp;

  /**
   * Character has already killed an enemie by jumping on it.
   */
  jumpKill = false;

  /**
   * A boolean to check if a bottle is already thrown.
   */
  bottleThrown = false;

  /**
   * The character idle variable.
   */
  isIdle = false;

  /**
   * Sets true or false, if the character is jumping.
   */
  isJumping = false;

  /**
   * The animation interval.
   */
  animateInterval;

  /**
   * The sound interval.
   */
  soundInterval;

  /**
   * The move interval.
   */
  moveInterval;

  /**
   * The offset from the character sprite for the collision detection.
   */
  offset = {
    top: 90,
    right: 30,
    bottom: 10,
    left: 20,
  };

  /**
   * An interval config array from all character intervals.
   */
  allIntervals = [
    "animateInterval",
    "soundInterval",
    "moveInterval",
    "gravityInterval",
  ];

  /**
   * Image frames shown when the character is walking.
   */
  WALKING_ANIMATION = [
    "./img/2_character_pepe/2_walk/W-21.png",
    "./img/2_character_pepe/2_walk/W-22.png",
    "./img/2_character_pepe/2_walk/W-23.png",
    "./img/2_character_pepe/2_walk/W-24.png",
    "./img/2_character_pepe/2_walk/W-25.png",
    "./img/2_character_pepe/2_walk/W-26.png",
  ];

  /**
   * Image frames shown when the character is jumping.
   */
  JUMPING_ANIMATION = [
    "./img/2_character_pepe/3_jump/J-31.png",
    "./img/2_character_pepe/3_jump/J-32.png",
    "./img/2_character_pepe/3_jump/J-33.png",
    "./img/2_character_pepe/3_jump/J-34.png",
    "./img/2_character_pepe/3_jump/J-35.png",
    "./img/2_character_pepe/3_jump/J-36.png",
    "./img/2_character_pepe/3_jump/J-37.png",
    "./img/2_character_pepe/3_jump/J-38.png",
    "./img/2_character_pepe/3_jump/J-39.png",
  ];

  /**
   * Image frames shown when the character is idle.
   */
  IDLE_ANIMATION = [
    "./img/2_character_pepe/1_idle/idle/I-1.png",
    "./img/2_character_pepe/1_idle/idle/I-2.png",
    "./img/2_character_pepe/1_idle/idle/I-3.png",
    "./img/2_character_pepe/1_idle/idle/I-4.png",
    "./img/2_character_pepe/1_idle/idle/I-5.png",
    "./img/2_character_pepe/1_idle/idle/I-6.png",
    "./img/2_character_pepe/1_idle/idle/I-7.png",
    "./img/2_character_pepe/1_idle/idle/I-8.png",
    "./img/2_character_pepe/1_idle/idle/I-9.png",
    "./img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  /**
   * Image frames shown when the character is long idle.
   */
  IDLE_LONG_ANIMATION = [
    "./img/2_character_pepe/1_idle/long_idle/I-11.png",
    "./img/2_character_pepe/1_idle/long_idle/I-12.png",
    "./img/2_character_pepe/1_idle/long_idle/I-13.png",
    "./img/2_character_pepe/1_idle/long_idle/I-14.png",
    "./img/2_character_pepe/1_idle/long_idle/I-15.png",
    "./img/2_character_pepe/1_idle/long_idle/I-16.png",
    "./img/2_character_pepe/1_idle/long_idle/I-17.png",
    "./img/2_character_pepe/1_idle/long_idle/I-18.png",
    "./img/2_character_pepe/1_idle/long_idle/I-19.png",
    "./img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  /**
   * Image frames shown when the character is dead.
   */
  DEAD_ANIMATION = [
    "./img/2_character_pepe/5_dead/D-51.png",
    "./img/2_character_pepe/5_dead/D-52.png",
    "./img/2_character_pepe/5_dead/D-53.png",
    "./img/2_character_pepe/5_dead/D-54.png",
    "./img/2_character_pepe/5_dead/D-55.png",
    "./img/2_character_pepe/5_dead/D-56.png",
    "./img/2_character_pepe/5_dead/D-57.png",
  ];

  /**
   * Image frames shown when the character is hurt.
   */
  HURT_ANIMATION = [
    "./img/2_character_pepe/4_hurt/H-41.png",
    "./img/2_character_pepe/4_hurt/H-42.png",
    "./img/2_character_pepe/4_hurt/H-43.png",
  ];

  /**
   * Creates an instance of the game character.
   * Loads all animation frames to an object.
   */
  constructor() {
    super();
    this.loadImage("./img/2_character_pepe/2_walk/W-21.png");
    this.y = this.floorPosition();
    this.loadImagesArray(this.WALKING_ANIMATION);
    this.loadImagesArray(this.JUMPING_ANIMATION);
    this.loadImagesArray(this.IDLE_ANIMATION);
    this.loadImagesArray(this.IDLE_LONG_ANIMATION);
    this.loadImagesArray(this.DEAD_ANIMATION);
    this.loadImagesArray(this.HURT_ANIMATION);
  }

  /**
   * Start all char intervals. Animate, move, gravity and sound.
   */
  startChar() {
    moveDetection(this);
    this.animate();
    this.applyGravity();
    this.playSounds();
  }

  /**
   * The sound interval, to play the appropriate sound effects.
   * Walking, jumping, landing, hurting.
   */
  playSounds() {
    this.soundInterval = setInterval(() => {
      if (gamePaused) return;
      const right = world.keyboard.KEY_RIGHT;
      const left = world.keyboard.KEY_LEFT;
      const jump = world.keyboard.KEY_JUMP;
      if (!this.aboveGround() && (right || left)) {
        if (audio.sfx.pepeWalk.currentTime > 3.7) {
          audio.sfx.pepeWalk.currentTime = 0;
        }
        audio.playSound("pepeWalk");
      } else {
        audio.pauseSound("pepeWalk");
      }
      if (jump && !this.aboveGround()) {
        audio.playSound("pepeJump");
      }
      if (this.speedY < 0 && !this.aboveGround()) {
        audio.playSound("pepeLanding");
      }
      if (this.isHurt()) {
        audio.playSound("pepeHurt");
      }
    }, 1000 / 60);
  }

  /**
   * The animation interval.
   * Plays the appropriate animaten frames, depending on the characters condition.
   */
  animate() {
    this.animateInterval = setInterval(() => {
      if (gamePaused) return;
      if (!this.characterIdle()) {
        this.idleCount = 0;
        this.resetIdleAudio();
      }
      if (this.isDead()) {
        this.animateDead();
      } else if (this.isHurt()) {
        this.animateHurt();
      } else if (this.aboveGround()) {
        animateJump(this);
      } else if (isWalking(this)) {
        this.animateWalk();
      } else {
        this.animateIdle();
      }
    }, 80);
  }

  /**
   * Checks if no button is pressed and returns a boolean.
   * @returns {boolean}
   */
  characterIdle() {
    return (
      this.world.keyboard.KEY_RIGHT === false &&
      this.world.keyboard.KEY_LEFT === false &&
      this.world.keyboard.KEY_JUMP === false &&
      this.world.keyboard.KEY_SHOT === false &&
      !this.isHurt()
    );
  }

  /**
   * Plays the walking animation.
   */
  animateWalk() {
    this.playAnimation(this.WALKING_ANIMATION);
  }

  /**
   * Plays the hurting animation and bounces the character back by adding a number to speedY.
   */
  animateHurt() {
    this.playAnimation(this.HURT_ANIMATION);
    this.speedY = 6;
    this.otherDirection ? (this.x += 8) : (this.x -= 8);
    this.world.camera_x = 200 - this.x;
  }

  /**
   * Plays the idle or long idle animation. Plays a soundfile if the character is long idle.
   */
  animateIdle() {
    if (this.idleCount < 50) {
      this.playAnimation(this.IDLE_ANIMATION);
    } else {
      this.playAnimation(this.IDLE_LONG_ANIMATION);
      audio.playSound("pepeLongIdle");
    }
    this.idleCount++;
  }

  /**
   * Pauses the long idle audio file if the char is moving.
   * Sets the long idle audio file to the beginning.
   */
  resetIdleAudio() {
    audio.pauseSound("pepeLongIdle");
    audio.sfx.pepeLongIdle.currentTime = 0;
  }

  /**
   * Plays the dead animation.
   */
  animateDead() {
    this.playAnimation(this.DEAD_ANIMATION);
  }

  /**
   * Pushes a new bottle class to the thrown bottles array.
   * Plays a throw sound.
   */
  throwBottle() {
    if (!this.bottleThrown && this.bottles > 0) {
      this.world.thrownBottles.push(new Thrownbottle());
      this.bottleThrown = true;
      this.bottles--;
      this.world.bottlebar.updateBottleBar();
      audio.playRandomSound("bottleThrow");
      setTimeout(() => {
        this.bottleThrown = false;
      }, 2000);
    }
  }

  /**
   * Adding a coin to the coins variable.
   */
  collectCoin() {
    this.coins++;
  }

  /**
   * Makes the character bounce after jumping on an enemy by setting vertical speed.
   */
  jumpOnEnemy() {
    this.speedY = 15;
  }

  /**
   * Increases the bottle count by one, up to a maximum of five.
   */
  collectBottle() {
    if (this.bottles < 5) this.bottles++;
  }

  /**
   * Stops all char intervals by using the all intervals config array.
   */
  stopAllCharIntervals() {
    this.allIntervals.forEach((interval) => {
      clearInterval(this[interval]);
    });
  }

  /**
   * Increases the energy of the character, up to a maximum of 100.
   */
  bottleHeal() {
    if (this.energy < 100) {
      this.energy += 15;
      if (this.energy > 100) {
        this.energy = 100;
      }
    }
  }
}
