class Minichicken extends MovableObject{
        height = 30;
        width = 30;
    constructor(){
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.y = 480 - this.height - this.floorHeight - (Math.random() * 8 - 1);
        this.x = 720 - Math.random() * 500 + 1;
    }
}