class Character extends MovableObject {
  x = 50;
  width = 95;
  height = 180;
  animationNr = 0;
  WALKING_ANIMATION = [
    "./img/2_character_pepe/2_walk/W-21.png",
    "./img/2_character_pepe/2_walk/W-22.png",
    "./img/2_character_pepe/2_walk/W-23.png",
    "./img/2_character_pepe/2_walk/W-24.png",
    "./img/2_character_pepe/2_walk/W-25.png",
    "./img/2_character_pepe/2_walk/W-26.png"]
  constructor() {
    super();
    this.loadImage("./img/2_character_pepe/2_walk/W-21.png");
    this.y = this.canvasHeight - this.height - this.floorHeight;
    this.loadImagesArray(this.WALKING_ANIMATION);
    this.animate();
  }




  animate(){
    setInterval(() => {
      let path = this.WALKING_ANIMATION[this.animationNr];
      this.img = this.animationImgArray[path];
    if (this.animationNr === 5) {
      this.animationNr = 0;
    } else {
    this.animationNr++;}
  }, 150);
  }

  moveRight() {
    if(this.x < this.canvasWidth) {
    this.x = this.x + 10;
    
    }
  }

  moveLeft() {
    if (this.x > 0) {
    this.x = this.x - 10;
  }
}
  throwBottle() {}
  jump() {}
}
