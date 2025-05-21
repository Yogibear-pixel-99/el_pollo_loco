class BackgroundLayer extends MovableObject {
  y = 0;
  width = canvasWidth;
  height = canvasHeight;

  constructor(imagePath, x, xFactor) {
    super();
    this.startPostition = x;
    this.loadImage(imagePath);
    this.xFactor = xFactor;
    this.x = x;
  }



}
