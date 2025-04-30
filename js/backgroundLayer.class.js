class BackgroundLayer extends MovableObject{
    x = 0;
    y = 0;
    width = this.canvasWidth;
    height = this.canvasHeight;

    constructor(imagePath){
        super();
        this.loadImage(imagePath);
    }
}