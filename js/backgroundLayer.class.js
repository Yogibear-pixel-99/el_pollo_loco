class BackgroundLayer extends MovableObject {
  y = 0;
  xStart;
  width = canvasWidth;
  height = canvasHeight;
  getXPositionInterval;
  xFactor;

  constructor(imagePath, x, xFactor) {
    super();
    this.startPostition = x;
    this.loadImage(imagePath);
    this.xFactor = xFactor;
    this.x = x;
  }
}
