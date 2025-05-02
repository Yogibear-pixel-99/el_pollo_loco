class Chicken extends MovableObject {
height = 40;
width = 40;
// animationCount = 0;
WALKING_ANIMATION = [
  "./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
  "./img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
  "./img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
];
walkingSpeed = (Math.random() * (1.5 - 0.6) + 0.6);

  constructor() {
    super();
    this.loadImage("./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.y = this.canvasHeight - this.height - this.floorHeight - (Math.random() * 8 - 1);
    this.x = this.canvasWidth - Math.random() * 500 + 1;
    this.loadImagesArray(this.WALKING_ANIMATION);
    this.animate();
    this.moveLeft();
  }

  animate(){
    setInterval(() => {
    this.animationCount = this.animationCount % this.WALKING_ANIMATION.length;
    let path = this.WALKING_ANIMATION[this.animationCount];
    this.img = this.animatedImages[path];
    this.animationCount++;
  }, 120);
}



}

