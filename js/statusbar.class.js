class NoneMoveableObject {

img;
canvasHeight = 480;
canvasWidth = 720;
x;
y;

loadImage(path){
    this.img = new Image();
    this.img.src = path;
};

draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (
      this instanceof Coin 
    ) {
      ctx.beginPath();
      ctx.lineWidth = "3";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }
  drawOffsetFrame(ctx) {
    if (
      this instanceof Coin
    ) {
      ctx.beginPath();
      ctx.lineWidth = "3";
      ctx.strokeStyle = "red";
      ctx.rect(
        this.x + this.offset.left,
        this.y + this.offset.top,
        this.width - this.offset.left - this.offset.right,
        this.height - this.offset.bottom - this.offset.top
      );
      ctx.stroke();
    }
  }


}