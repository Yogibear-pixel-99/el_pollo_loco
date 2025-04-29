class Cloud extends MovableObject{

    constructor(imagePath){
        super().loadImage(imagePath);
        this.x = 100;
        this.y = 30;
        this.height = 200;
        this.width = 350;
        this.x = Math.random() * (this.canvasWidth - -100) + -100;
    }
}