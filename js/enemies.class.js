class Enemies extends MovableObject {
    deadPic;
    walkInterval;
    walkAnimationInterval;
    wasHittet = false;
    walkingSpeed;
    hitEnemy = false;
    acceleration = 2;
    speedY = 0;
    deadPic;
    isDead = false;

    constructor(){
        super();
    }

    moveEnemies(){
        this.walkInterval = setInterval(() => {
            this.moveLeft();
        }, this.moveCycle)
      }
    
      animateWalk() {
        this.walkAnimationInterval = setInterval(() => {
          this.playAnimation(this.WALKING_ANIMATION);
        }, this.animationCycle);
      }

    jumpKill(){
      let index = world.level.enemies.indexOf(this);
      this.img.src = this.deadPic;
      clearInterval(this.walkAnimationInterval);
      clearInterval(this.walkInterval);
      setTimeout(() => world.level.enemies.splice(index, 1), 700);
    }

    

}