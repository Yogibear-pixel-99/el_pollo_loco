class Clouds extends MovableObject {
  height = 200;
  width = 350;
  speedNumber = 0;
  constructor(imagePath, speedNumber, x) {
    super();
    this.loadImage(imagePath);
    this.y = (Math.random() * this.canvasHeight) / 5;
    this.x = x + Math.random() * (this.canvasWidth - -100) + -100;
    this.speedNumber = speedNumber;

    this.autoMoveLeft();
  }

  autoMoveLeft() {
    requestAnimationFrame(() => {
      this.x = this.x - this.speedNumber;
      if (this.x < -340 - 719) {
        this.y = (Math.random() * this.canvasHeight) / 5;
        this.x = this.canvasWidth * 6;
        this.speedNumber = Math.random() * (0.2 - 0.05).toFixed() + 0.05;
      }
      this.autoMoveLeft();
    });
  }
}
