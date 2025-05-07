class Character extends MovableObject {
  x = 80;
  width = 95;
  height = 190;
  WALKING_ANIMATION = [
    "./img/2_character_pepe/2_walk/W-21.png",
    "./img/2_character_pepe/2_walk/W-22.png",
    "./img/2_character_pepe/2_walk/W-23.png",
    "./img/2_character_pepe/2_walk/W-24.png",
    "./img/2_character_pepe/2_walk/W-25.png",
    "./img/2_character_pepe/2_walk/W-26.png",
  ];
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
  DEAD_ANIMATION = [
    "./img/2_character_pepe/5_dead/D-51.png",
    "./img/2_character_pepe/5_dead/D-52.png",
    "./img/2_character_pepe/5_dead/D-53.png",
    "./img/2_character_pepe/5_dead/D-54.png",
    "./img/2_character_pepe/5_dead/D-55.png",
    "./img/2_character_pepe/5_dead/D-56.png",
    "./img/2_character_pepe/5_dead/D-57.png",
  ];
  HURT_ANIMATION = [
    "./img/2_character_pepe/4_hurt/H-41.png",
    "./img/2_character_pepe/4_hurt/H-42.png",
    "./img/2_character_pepe/4_hurt/H-43.png",
  ];

  world;
  walkingSpeed = 2.8;
  animationCycle = 100;
  moveCycle = 15;

  noKeyIntervall;

  idleLoopCount = 0;
  idleInterval = 200;

  characterIdle = true;

  stopJumpAnimation = false;

  energy = 100;

  offset = {
    top: 90,
    right: 30,
    bottom: 10,
    left: 20,
  };

  constructor() {
    super();
    this.loadImage("./img/2_character_pepe/2_walk/W-21.png");
    this.y = this.floorPosition() - 150;
    this.loadImagesArray(this.WALKING_ANIMATION);
    this.loadImagesArray(this.JUMPING_ANIMATION);
    this.loadImagesArray(this.IDLE_ANIMATION);
    this.loadImagesArray(this.IDLE_LONG_ANIMATION);
    this.loadImagesArray(this.DEAD_ANIMATION);
    this.loadImagesArray(this.HURT_ANIMATION);
    this.animate();
    this.moveDetection();
    this.animateIdle();
    this.applyGravity();
    this.checkIfCollided();
  }

  checkIfCollided() {
    setInterval(() => {}, 50);
  }

  animate() {
    setInterval(() => {
      if (this.isDead()) {
        this.animateDead();
        this.deactivateKeyboard();
        this.characterIdle = false;
      } else if (this.isHurt()) {
        this.animateHurt();
        this.characterIdle = false;
      } else if (this.aboveGround() && this.stopJumpAnimation == false) {
        this.animateJump();
        this.characterIdle = false;
      } else {
        if (this.aboveGround()) {
          this.characterIdle = false;
        }

        if (
          this.world.keyboard.KEY_RIGHT == false &&
          this.world.keyboard.KEY_LEFT == false
        ) {
          this.characterIdle = true;
        }
        if (
          this.world.keyboard.KEY_RIGHT == true ||
          this.world.keyboard.KEY_LEFT == true
        ) {
          this.characterIdle = false;
          this.idleLoopCount = 0;
          this.animateWalk();
        }
        if (this.world.keyboard.KEY_JUMP == true && !this.aboveGround()) {
          this.jump();
        }
      }
    }, this.animationCycle);
  }

  moveDetection() {
    setInterval(() => {
      if (
        this.world.keyboard.KEY_RIGHT == true &&
        this.x < this.world.level.level_end_x
      ) {
        this.moveRight();
        this.world.camera_x = 80 - this.x;
        this.otherDirection = false;
      }
      if (this.world.keyboard.KEY_LEFT == true && this.x > -200) {
        this.moveLeft();
        this.world.camera_x = 80 - this.x;
        this.otherDirection = true;
      }
    }, this.moveCycle);
  }

  animateWalk() {
    this.playAnimation(this.WALKING_ANIMATION);
  }

  isHurt() {
    return this.collided;
  }

  animateHurt() {
    this.playAnimation(this.HURT_ANIMATION);
    this.speedY = 6;
  }

  animateDead() {
    this.playAnimation(this.DEAD_ANIMATION);
  }

  animateJump() {
    this.playAnimation(this.JUMPING_ANIMATION);
  }

  throwBottle() {}

  jump() {
    this.speedY = 25;
  }

  deactivateKeyboard(){
    this.noKeyIntervall = setInterval(() => {
      this.world.keyboard.KEY_LEFT = false;
      this.world.keyboard.KEY_RIGHT = false;
      this.world.keyboard.KEY_JUMP = false;
      this.world.keyboard.KEY_SHOT = false;

    }, 20);
  }

  animateIdle() {
    setInterval(() => {
      if (this.idleLoopCount < 21 && this.characterIdle == true) {
        this.playAnimation(this.IDLE_ANIMATION);
        this.idleLoopCount++;
      } else if (this.idleLoopCount >= 21 && this.characterIdle == true) {
        this.playAnimation(this.IDLE_LONG_ANIMATION);
      }
    }, this.idleInterval);
  }
}
