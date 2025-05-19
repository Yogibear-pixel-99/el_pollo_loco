class Enemies extends MovableObject {
    deadPic;
    walkMoveInterval;
    walkAnimationInterval;
    wasHittet = false;
    walkingSpeed;
    acceleration = 2;
    speedY = 0;
    deadPic;
    killed = false;

    constructor(){
        super();
    }

    moveEnemies(){
        this.walkMoveInterval = setInterval(() => {
            this.moveLeft();
        }, this.moveCycle)
      }
    
      animateWalk() {
        this.walkAnimationInterval = setInterval(() => {
          this.playAnimation(this.WALKING_ANIMATION);
        }, this.animationCycle);
      }

    isKilled(){
      let index = world.level.enemies.indexOf(this);
      this.img.src = this.deadPic;
      this.clearAllEnemyIntervalls();
      setTimeout(() => world.level.enemies.splice(index, 1), 700);
    }

    clearAllEnemyIntervalls(){
      clearInterval(this.walkAnimationInterval);
      clearInterval(this.walkMoveInterval);
    };
    

}