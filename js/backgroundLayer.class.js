class BackgroundLayer extends MovableObject {
  y = 0;
  width = this.canvasWidth;
  height = this.canvasHeight;

  constructor(imagePath, x, xFactor) {
    super();
    this.startPostition = x;
    this.loadImage(imagePath);
    this.xFactor = xFactor;
    this.x = x;
  }



}
