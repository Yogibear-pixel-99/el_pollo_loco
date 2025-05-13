class Enemies extends MovableObject {
    deadPic;
    walkInterval;
    walkAnimationInterval;
    wasHittet = false;
    walkingSpeed;
    hitEnemy = false;
    acceleration = 2;
    speedY = 0;

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

      applyGravity() {
        setInterval(() => {
          if (this.aboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
          } else {
            this.y = this.floorPosition();
          }
        }, 1000 / 25);
      }
}