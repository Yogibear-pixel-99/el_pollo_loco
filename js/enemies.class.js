class Enemies extends MovableObject {
    deadPic;
    walkInterval;
    walkAnimationInterval;
    wasHittet = false;
    walkingSpeed;
    hitEnemy = false;

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
}