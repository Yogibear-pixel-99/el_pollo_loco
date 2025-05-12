class Enemies extends MovableObject {
    deadPic;
    walkInterval;
    animateInterval;
    wasHittet = false;
    walkingSpeed;

    constructor(){
        super();
    }

    moveEnemies(){
        this.walkInterval = setInterval(() => {
            this.moveLeft();
        }, this.moveCycle)
      }
    
      animateWalk() {
        this.animateInterval = setInterval(() => {
          this.playAnimation(this.WALKING_ANIMATION);
        }, this.animationCycle);
      }
    

    bottleHit(){
        let hitInterval = setInterval(() => {
          if (this.wasHittet == true) {
            let enemyIndex = world.level.enemies.indexOf(this)
            clearInterval(this.walkInterval);
            clearInterval(this.animateInterval);
            clearInterval(hitInterval);
            this.img.src = this.deadPic;
            console.log(this);
            world.updateScorePointsBottleHit(this.enemyName);
            world.updatePlayerScore();
            setTimeout(() => world.level.enemies.splice(enemyIndex, 1), 1800);
          }
        }, 30);
      }

    

}