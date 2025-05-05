class Clouds extends MovableObject {
  height = 200;
  width = 350;
  speedNumber = 0;
  constructor(imagePath, speedNumber) {
    super();
    this.loadImage(imagePath);
    this.y = (Math.random() * this.canvasHeight) / 5;
    this.x = Math.random() * (this.canvasWidth - -100) + -100;
    this.speedNumber = speedNumber;
     
     this.autoMoveLeft();
  }

  autoMoveLeft() {
    requestAnimationFrame(() => {
      this.x = this.x - this.speedNumber;
      if (this.x < -340) {
        this.y = (Math.random() * this.canvasHeight) / 5;
        this.x = this.canvasWidth;
        this.speedNumber = Math.random() * (0.2 - 0.05).toFixed() + 0.05;    
        // this.speedNumber = Math.floor(Math.random() * (0.8 - 0.1) + 0.1);    }
}
this.autoMoveLeft()})


}
}