class Character extends MovableObject {
  x = 200;
  width = 95;
  height = 190;
  jumpKill = false;
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

  animationCycle = 100;
  moveCycle = 1000 / 60;

  energy = 100;
  idleLoopCount = 0;

  offset = {
    top: 90,
    right: 30,
    bottom: 10,
    left: 20,
  };

  coins = 0;
  bottles = 0;
  bottleThrown = false;

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
    this.animate();
    this.moveDetection();
    this.animateIdle();
    this.applyGravity();
  }

  animate() {
    setInterval(() => {
      if (this.isDead()) {
        this.animateDead();
        this.world.healthbar.updateHealthbar();
      } else if (this.isHurt()) {
        this.animateHurt();
        this.world.healthbar.updateHealthbar();
      } else if (this.aboveGround()) {
        this.animateJump();
        // console.log(this.y + this.offset.top);
      } else if (this.characterIdle()) {
        // console.log('pepe is idle')
        this.animateIdle();
      } else {
        if (
          this.world.keyboard.KEY_RIGHT == true ||
          this.world.keyboard.KEY_LEFT == true
        ) {
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
        this.world.camera_x = 200 - this.x;
        this.otherDirection = false;
      }
      if (this.world.keyboard.KEY_LEFT == true && this.x > -200) {
        this.moveLeft();
        this.world.camera_x = 200 - this.x;
        this.otherDirection = true;
      }
      if (this.world.keyboard.KEY_SHOT == true) {
        this.throwBottle();
      }
    }, this.moveCycle);
  }

  characterIdle() {
    return (
      this.world.keyboard.KEY_RIGHT == false &&
      this.world.keyboard.KEY_LEFT == false &&
      this.world.keyboard.KEY_JUMP == false
    );
  }

  animateIdle() {
    this.playAnimation(this.IDLE_ANIMATION);
  }

  animateWalk() {
    this.playAnimation(this.WALKING_ANIMATION);
  }

  animateHurt() {
    this.playAnimation(this.HURT_ANIMATION);
    this.speedY = 6;
    this.otherDirection ? (this.x += 8) : (this.x -= 8);

    this.world.camera_x = 200 - this.x;
  }

  animateDead() {
    this.playAnimation(this.DEAD_ANIMATION);
  }

  animateJump() {
    this.playAnimation(this.JUMPING_ANIMATION);
  }
  
  throwBottle() {
    if (!this.bottleThrown && this.bottles > 0 ) {
      this.world.thrownBottles.push(new Thrownbottle());
      this.bottleThrown = true;
      this.bottles--;
      this.world.bottlebar.updateBottleBar();
      setTimeout(() => {
        this.bottleThrown = false;
      }, 2000);
    }
  }

  jump() {
    this.speedY = 22;
  }

  jumpOnEnemy() {
    this.speedY = 15;
  }

  collectCoin() {
    this.coins++;
  }

  collectBottle() {
    if (this.bottles < 5) this.bottles++;
  }

  // throwBottle(){
  //   this.world.
  // }
}
