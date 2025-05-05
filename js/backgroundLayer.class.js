class BackgroundLayer extends MovableObject{
    x = 0;
    y = 0;
    width = this.canvasWidth;
    height = this.canvasHeight;

    constructor(imagePath, camera_x_speed){
        super();
        this.camera_x_speed = camera_x_speed;
        this.loadImage(imagePath);
    }

}