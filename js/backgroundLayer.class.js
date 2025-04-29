class BackgroundLayer extends MovableObject{
    x = 0;
    y = 35;
    width = 720;
    height = 450;

    constructor(imagePath){
        super().loadImage(imagePath);
    }
}