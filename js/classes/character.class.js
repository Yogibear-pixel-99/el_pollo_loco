/**
 * The character in the game.
 * Handles character movement, animation, death and sound effects.
 * Inherits from {@link Enemies}.
 */
class Character extends MovableObject {

  /**
 * Horizontal position where the character starts.
 * @type {number}
 */
  x = 200;

  /**
 * The width of the character sprite in pixels.
 * @type {number}
 */
  width = 95;

/**
 * The height of the boss sprite in pixels.
 * @type {number}
 */
  height = 190;

  /**
   * Character has already killed an enemie by jumping on it.
   * @type {boolean}
   */
  jumpKill = false;

  /**
   * The character health.
   * @type {number}
   */
  energy = 100;

  /**
   * The animation interval.
   * @type {number}
   */
  animateInterval;

  /**
   * The sound interval.
   * @type {number}
   */
  soundInterval;

  /**
   * The move interval.
   * @type {number}
   */
  moveInterval;
 
  /**
   * An interval config array from all character intervals.
   * @type {string[]}
   */
  allIntervals = ["animateInterval", "soundInterval", "moveInterval", "gravityInterval"];

  /**
   * The character idle variable.
   * @type {boolean}
   */
  isIdle = false;

  /**
   * If the character is idle, this variable counts up to check if character is long idle.
   * @type {number}
   */
  idleCount = 0;

  /**
   * Sets true or false, if the character is jumping.
   */
  isJumping = false;

  /**
   * The current timestamp.
   * @type {number}
   */
  timestamp;

  /**
   * The offset from the character sprite for the collision detection.
   * @type {width: number, height: number, top: number, right: number, bottom: number, left: number}
   */
  offset = {
    top: 90,
    right: 30,
    bottom: 10,
    left: 20,
  };

  /**
   * The collected coins.
   * @type {number}
   */
  coins = 0;

  /**
   * The collected bottles.
   * @type {number}
   */
  bottles = 0;

  /**
   * A boolean to check if a bottle is already thrown.
   */
  bottleThrown = false;

  /**
   * Image frames shown when the character is walking.
   * @type {string[]}
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
   * @type {string[]}
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
   * @type {string[]}
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
   * @type {string[]}
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
   * @type {string[]}
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
   * @type {string[]}
   */
  HURT_ANIMATION = [
    "./img/2_character_pepe/4_hurt/H-41.png",
    "./img/2_character_pepe/4_hurt/H-42.png",
    "./img/2_character_pepe/4_hurt/H-43.png",
  ];

  /**
   * Creates an instance of the game character.
   * Loads all animation frames to an object.
   * Sets the vertical position to the floor.
   * Sets the first image to a walking image.
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
   * Start all char intervals.
   * Animate, move, gravity and sound.
   */
  startChar() {
    this.animate();
    this.moveDetection();
    this.applyGravity();
    this.playSounds();
  }

  /**
   * The sound interval, to play the appropriate sound effects.
   * Walking, jumping, landing, hurting.
   */
  playSounds() {
    this.soundInterval = setInterval(() => {
      const right = world.keyboard.KEY_RIGHT;
      const left = world.keyboard.KEY_LEFT;
      const jump = world.keyboard.KEY_JUMP;
      if (!this.aboveGround() && (right || left)) {
        if (audio.sfx.pepeWalk.currentTime > 3.7) {
          audio.sfx.pepeWalk.currentTime = 0;
        }
        audio.playSound('pepeWalk');
      } else {
        audio.pauseSound('pepeWalk')
      }
      if (jump && !this.aboveGround()) {
        audio.playSound('pepeJump');
      }
      if (this.speedY < 0 && !this.aboveGround()) {
        audio.playSound('pepeLanding')
      }
      if (this.isHurt()) {
        audio.playSound('pepeHurt');
      }
    }, 1000 / 60);
  }

  /**
   * The animation interval.
   * Plays the appropriate animaten frames, depending on the characters condition.
   * Idle, long idle, dead, hurt, jump.
   */
  animate() {
    this.animateInterval = setInterval(() => {
      if (!this.characterIdle()) {
        this.idleCount = 0;
        this.resetIdleAudio();
      }
      if (this.isDead()) {
        this.animateDead();
      } else if (this.isHurt()) {
        this.animateHurt();
      } else if (this.aboveGround()) {
        this.animateJump();
      } else if (this.isWalking()) {
        this.animateWalk();
      } else {
        this.animateIdle();
      }
    }, 80);
  }

  /**
   * The move interval.
   * Moves the character by setting the keyboard object varaibles on pressing the steering keys.
   */
  moveDetection() {
    this.moveInterval = setInterval(() => {
      if (!this.isDead()) {
        if (this.world.keyboard.KEY_JUMP === true && !this.aboveGround()) {
          this.jump();
        }
        if (
          this.world.keyboard.KEY_RIGHT === true &&
          this.x < this.world.level.level_end_x - 30
        ) {
          this.moveRight();
          this.world.camera_x = 200 - this.x;
          this.otherDirection = false;
        }
        if (this.world.keyboard.KEY_LEFT === true && this.x > -290) {
          this.moveLeft();
          this.world.camera_x = 200 - this.x;
          this.otherDirection = true;
        }
        if (this.world.keyboard.KEY_SHOT === true) {
          this.throwBottle();
        }
      }
    }, 1000 / 60);
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
   * Bounces left or right depending on the other direction variable and corrects the camera x position.
   */
  animateHurt() {
    this.playAnimation(this.HURT_ANIMATION);
    this.speedY = 6;
    this.otherDirection ? (this.x += 8) : (this.x -= 8);
    this.world.camera_x = 200 - this.x;
  }

  /**
   * Plays the idle or long idle animation.
   * Plays a soundfile if the character is long idle.
   */
  animateIdle() {
    if (this.idleCount < 50) {
      this.playAnimation(this.IDLE_ANIMATION);
    } else {
      this.playAnimation(this.IDLE_LONG_ANIMATION);
      audio.playSound('pepeLongIdle');
    }
    this.idleCount++;
  }

  /**
   * Plays the jumping animation, depending on the vertical speed (speedY variable) to show the rising
   * or falling animation. Updates the jump state (isJumping variable).
   * @returns {void}
   */
  animateJump() {
    if (!this.isJumping) {
      this.img = this.animatedImages[this.JUMPING_ANIMATION[2]];
      this.isJumping = true;
      return;
    }
    this.loadImage(this.JUMPING_ANIMATION[2]);
    if (this.speedY >= 0.5 && !this.isHurt()) {
      this.img = this.animatedImages[this.JUMPING_ANIMATION[3]];
    } else if (
      this.speedY < 0.5 &&
      this.speedY > -0.2 &&
      !this.isHurt() &&
      this.aboveGround()
    ) {
      this.img = this.animatedImages[this.JUMPING_ANIMATION[4]];
    } else if (this.speedY >= -0.2 && this.speedY <= -0.6 && !this.isHurt()) {
      this.img = this.animatedImages[this.JUMPING_ANIMATION[5]];
    } else if (this.speedY < -0.6 && !this.isHurt() && this.aboveGround()) {
      this.img = this.animatedImages[this.JUMPING_ANIMATION[6]];
    } else {
      this.img = this.animatedImages[this.JUMPING_ANIMATION[7]];
      this.isJumping = false;
    }
  }

  /**
   * Pauses the long idle audio file if the char is moving.
   * Sets the long idle audio file to the beginning.
   */
  resetIdleAudio() {
    audio.pauseSound('pepeLongIdle');
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
   * Sets the bottleThrown variable for two seconds on true.
   * Removes on bottle from the bottles variable.
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
   * Sets the vertical speed for jumping by setting the speedY variable to a number.
   * Triggers the enemies' reaction to the jump event.
   */
  jump() {
    this.speedY = 22;
    world.enemyRunAwayOnCharJump();
  }

  /**
 * Makes the character bounce after jumping on an enemy by setting vertical speed.
   */
  jumpOnEnemy() {
    this.speedY = 15;
  }

  /**
   * Checks if the character is walking an returns a boolean.
   * 
   * @returns {boolean}
   */
  isWalking() {
    return this.world.keyboard.KEY_RIGHT || this.world.keyboard.KEY_LEFT;
  }

  /**
   * Adding a coin to the coins variable.
   */
  collectCoin() {
    this.coins++;
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