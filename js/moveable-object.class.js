class MovableObject {
  x;
  y;
  height;
  width;
  floorHeight = 50;
  canvasHeight = 480;
  canvasWidth = 720;
  img;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }
}
