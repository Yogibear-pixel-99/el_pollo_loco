class Enemies extends MovableObject {
  deadPic;
  moveInterval;
  walkAnimationInterval;
  wasHittet = false;
  walkingSpeed;
  acceleration = 2;
  speedY = 0;
  lives = true;
  otherDirection = false;
  character;

  constructor() {
    super();
  }



  startEnemy(){
    this.moveEnemy();
    this.animateWalk();
  }

  animateWalk() {
    this.walkAnimationInterval = setInterval(() => {
      this.playAnimation(this.WALKING_ANIMATION);
    }, this.animationCycle);
  }

  isKilled(index) {
    this.stopAllEnemyIntervalls();
    this.img.src = this.deadPic;
    setTimeout(() => {
      world.level.enemies.splice(index, 1);
    }, 700);
  }



  stopAllEnemyIntervalls() {
    clearInterval(this.walkAnimationInterval);
    clearInterval(this.moveInterval);
  }

      moveEnemy() {
    this.moveInterval = setInterval(() => {
      if (this.otherDirection) {
        this.moveRight();
      } else {
        this.moveLeft();
      }
    }, this.moveCycle);
  }

  runAway() {
    audio.playSoundClone('chickenRun');
    let activeDirection = this.otherDirection;
    let count = 0;
    let interval = setInterval(() => {
      if (count < 20) {
      this.playAnimation(this.WALKING_ANIMATION);

      if (this.x < world.character.x) {
        this.otherDirection = false;
        this.x -= this.walkingSpeed + 5;
      } else {
        this.otherDirection = true;
        this.x += this.walkingSpeed + 5;
      }
      count++;
    } else {
      if (this.x > world.character.x) {
        this.otherDirection = false;
      } else {
        this.otherDirection = true;
      }
      clearInterval(interval);
      this.otherDirection = activeDirection;
      this.animateWalk();
      this.moveEnemy();
    }
    }, 20)
  }



}
