class Enemies extends MovableObject {
    deadPic;
    walkMoveInterval;
    walkAnimationInterval;
    wasHittet = false;
    walkingSpeed;
    acceleration = 2;
    speedY = 0;
    lives = true;

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
    
  playKilledChickenSound() {
    let rnd = Math.floor(
      Math.random() * world.audiofiles.sfx.deadChicken.length
    );
    world.audiofiles.sfx.deadChicken[rnd].play();
  }
}