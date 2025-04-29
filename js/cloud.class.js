class Cloud extends MovableObject{

    constructor(){
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = 100;
        this.y = 30;
        this.height = 200;
        this.width = 350;
        this.x = Math.random() * (this.canvasWidth - -200) + -200;
    }
}