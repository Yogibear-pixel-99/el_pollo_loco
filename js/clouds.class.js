class Clouds extends MovableObject {
  height = 200;
  width = 350;
  constructor(imagePath, speedNumber) {
    super().loadImage(imagePath);
    this.y = (Math.random() * this.canvasHeight) / 5;
    this.x = Math.random() * (this.canvasWidth - -100) + -100;
    this.speedNumber = speedNumber;
  }

  autoMoveLeft() {
      this.x = this.x - Math.random() * this.speedNumber;
      if (this.x < -340) {
        this.y = (Math.random() * this.canvasHeight) / 5;
        this.x = this.canvasWidth;
        this.speedNumber = Math.random() * (0.5 - 0.1).toFixed() + 0.1;    
        // this.speedNumber = Math.floor(Math.random() * (0.8 - 0.1) + 0.1);    }
}


}
}