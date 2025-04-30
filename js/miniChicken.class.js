class Minichicken extends MovableObject{
        height = 30;
        width = 30;
    constructor(){
        super();
        this.loadImage('./img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.y = this.canvasHeight - this.height - this.floorHeight - (Math.random() * 8 - 1);
        this.x = this.canvasWidth - Math.random() * 500 + 1;
    }
}