class BackgroundLayer extends MovableObject{
    x = 0;
    y = 35;
    width = 720;
    height = 450;

    constructor(){
        super().loadImage("../img/5_background/layers/1_first_layer/1.png");
        // this.y = this.canvasHeight - this.floorHeight - this.height;
        
    }
}