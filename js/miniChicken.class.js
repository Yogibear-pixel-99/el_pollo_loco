class Minichicken extends MovableObject{
        height = 30;
        width = 30;
        // animationCount = 0;
        WALKING_ANIMATION = [
            './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
            './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
            './img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
        ];
        walkingSpeed = (Math.random() * (1.2 - 0.3) + 0.3);

    constructor(){
        super();
        this.loadImage('./img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.y = this.floorPosition() - (Math.random() * 8 - 1);
        this.x = this.canvasWidth - Math.random() * 500 + 1;
        this.loadImagesArray(this.WALKING_ANIMATION);
        this.animate();
        this.enemyWalkLeft();
    }

    animate(){
        setInterval(() => {
        this.playAnimation(this.WALKING_ANIMATION);
    }, 100);
}


}