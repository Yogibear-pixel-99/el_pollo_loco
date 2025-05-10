class Enemies extends MovableObject {
    deadPic;
    walkInterval;
    animateInterval;
    wasHittet = 0;
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
          if (this.wasHittet > 1) {
            let enemyIndex = world.level.enemies.indexOf(this)
            clearInterval(this.walkInterval);
            clearInterval(this.animateInterval);
            clearInterval(hitInterval);
            this.img.src = this.deadPic;
            this.updateScorePointsBottleHit();
            setTimeout(() => world.level.enemies.splice(enemyIndex, 1), 1800);
          }
        }, 30);
        
    
       
        // score +
        // splice from array
    
    
    
        // this.img = "./img/3_enemies_chicken/chicken_small/2_dead/dead.png";
        console.log(this);
        // show animation
        // raise score
      }

}