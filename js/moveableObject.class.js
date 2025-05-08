class MovableObject extends DrawableObject {
  walkingSpeed;
  animationCount = 0;
  moveCycle = 1000 / 60;
  otherDirection = false;
  speedY = 0;
  acceleration = 2;
  lastHit = 0;

  applyGravity() {
    setInterval(() => {
      if (this.aboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
        this.world.character.world.keyboard.KEY_JUMP = false;
      } else {
        this.y = this.floorPosition();
      }
    }, 1000 / 25);
  }

  hit() {
    this.energy -= 5;
    if (this.energy <= 0) {
      this.energy = 0;
    }
    this.lastHit = new Date().getTime();
  }

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000; // millisec / 1000 = sec.
    return timePassed < 0.3;
  }

  isDead() {
    return this.energy == 0;
  }

  aboveGround() {
    return this.y < this.floorPosition();
  }

  moveLeft() {
    this.x = this.x - this.walkingSpeed;
  }

  moveRight() {
    this.x = this.x + this.walkingSpeed;
  }
}
