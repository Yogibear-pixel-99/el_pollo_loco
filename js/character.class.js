class Character extends MovableObject {
  x = 50;
  width = 95;
  height = 190;
  // animationCount = 0;
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
    "./img/2_character_pepe/3_jump/J-39.png"
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
    "./img/2_character_pepe/1_idle/idle/I-10.png"
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
    "./img/2_character_pepe/1_idle/long_idle/I-20.png"
  ]
  world;
  walkingSpeed = 2.3;
  animationCycle = 90;
  moveCycle = 20;
  
  idleLoopCount = 0;
  idleInterval;

  constructor() {
    super();
    this.loadImage("./img/2_character_pepe/2_walk/W-21.png");
    this.y = this.canvasHeight - this.height - this.floorHeight;
    this.loadImagesArray(this.WALKING_ANIMATION);
    this.loadImagesArray(this.JUMPING_ANIMATION);
    this.loadImagesArray(this.IDLE_ANIMATION);
    this.loadImagesArray(this.IDLE_LONG_ANIMATION);
    this.animate();
    this.animateIdle();
  }

  animate() {
    setInterval(() => {
      if (this.world.character.world.keyboard.KEY_RIGHT == true || this.world.character.world.keyboard.KEY_LEFT == true) {
        this.animateWalk();
        clearInterval(this.idleInterval);
      }
      if (this.world.character.world.keyboard.KEY_SPACE == true) {
        this.animateJump();
      }
    }, this.animationCycle);


    setInterval(() => {
      if (this.world.character.world.keyboard.KEY_RIGHT == true) {
        this.moveRight();
        this.otherDirection = false;
      }
      if (this.world.character.world.keyboard.KEY_LEFT == true) {
        this.moveLeft();
        this.otherDirection = true;
      }
    }, this.moveCycle);

    // if (this.world.character.world.keyboard.KEY_RIGHT == false
    //   // this.world.character.world.keyboard.KEY_LEFT == false
    //   // this.world.character.world.keyboard.KEY_UP == false &&
    //   // this.world.character.world.keyboard.KEY_DOWN == false &&
    //   // this.world.character.world.keyboard.KEY_JUMP == false &&
    //   // this.world.character.world.keyboard.KEY_SHOT == false
    //  ) {
    //   this.idleLoopCount = 0;
    //   this.animateIdle();
    //  }
  }

  moveRight() {
    if (this.x < this.canvasWidth / 2 - this.width / 2) {
      this.x = this.x + this.walkingSpeed;
    }
  }

  animateWalk() {
    this.animationCount = this.animationCount % this.WALKING_ANIMATION.length;
    let path = this.WALKING_ANIMATION[this.animationCount];
    this.img = this.animatedImages[path];
    this.animationCount++;
  }

  moveLeft() {
    if (this.x > 0) {
      this.x = this.x - this.walkingSpeed;
    }
  }

  animateJump() {
    

    this.animationCount = this.animationCount % this.JUMPING_ANIMATION.length;
    let path = this.JUMPING_ANIMATION[this.animationCount];
    this.img = this.animatedImages[path];
    this.animationCount++;


    // max jump height
  }
  throwBottle() {}
  jump() {}

  animateIdle(){
    this.idleInterval = setInterval(() => {
      if (this.idleLoopCount < 20) {
      this.animationCount = this.animationCount % this.IDLE_ANIMATION.length;
      let path = this.IDLE_ANIMATION[this.animationCount];
      this.img = this.animatedImages[path];
      this.animationCount++;
      this.idleLoopCount++;
    } else {
      this.animationCount = this.animationCount % this.IDLE_LONG_ANIMATION.length;
      let path = this.IDLE_LONG_ANIMATION[this.animationCount];
      this.img = this.animatedImages[path];
      this.animationCount++;
      }
  }, this.idleLoopCount + 300);
}}
