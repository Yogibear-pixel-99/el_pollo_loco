class Enemies extends MovableObject {
    deadPic;
    walkMoveInterval;
    walkAnimationInterval;
    wasHittet = false;
    walkingSpeed;
    acceleration = 2;
    speedY = 0;
    lives = true;
    otherDirection;

    constructor(){
        super();
        this.moveDirection();
    }

    moveDirection(){
      setInterval(() => {
        if (this.x < world.character.x - canvasWidth) {
          this.otherDirection = true;
        }
        if (this.x > world.character.x + canvasWidth) {
          this.otherDirection = false;
        }
      }, 1000);
    }

    moveEnemies(){
        this.walkMoveInterval = setInterval(() => {
          if (this.otherDirection) {
            this.moveRight();
          } else {
            this.moveLeft();
          }
        }, this.moveCycle)
      }
    
      animateWalk() {
        this.walkAnimationInterval = setInterval(() => {
          this.playAnimation(this.WALKING_ANIMATION);
        }, this.animationCycle);
      }

    isKilled(){
      this.clearAllEnemyIntervalls();
      this.img.src = this.deadPic;
      setTimeout(() => {
         let index = world.level.enemies.indexOf(this);
        world.level.enemies.splice(index, 1)}, 700);
    }

    clearAllEnemyIntervalls(){
      clearInterval(this.walkAnimationInterval);
      clearInterval(this.walkMoveInterval);
    };
}