class BackgroundLayer extends MovableObject{
    y = 0;
    width = this.canvasWidth;
    height = this.canvasHeight;

    constructor(imagePath, x){
        super();
        this.loadImage(imagePath);
        this.x = x
    }

}