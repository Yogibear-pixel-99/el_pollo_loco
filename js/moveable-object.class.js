class MovableObject {
  floorHeight = 58;
  canvasHeight = 480;
  canvasWidth = 720;
  img;
  animationImgArray = {};

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImagesArray(array){
    array.forEach(path => {
      this.img = new Image();
      this.img.src = path;
      this.animationImgArray[path] = path;
    });
  }
}
