class Endboss extends MovableObject {
    height = 300;
    width = 250;
    walkingSpeed = 1.5;
    ALERT_ANIMATION = [
        "./img/4_enemie_boss_chicken/2_alert/G5.png",
        "./img/4_enemie_boss_chicken/2_alert/G6.png",
        "./img/4_enemie_boss_chicken/2_alert/G7.png",
        "./img/4_enemie_boss_chicken/2_alert/G8.png",
        "./img/4_enemie_boss_chicken/2_alert/G9.png",
        "./img/4_enemie_boss_chicken/2_alert/G10.png",
        "./img/4_enemie_boss_chicken/2_alert/G11.png",
        "./img/4_enemie_boss_chicken/2_alert/G12.png",
    ];

    constructor(){
        super();
        this.loadImage(this.ALERT_ANIMATION[0]);
        this.x = this.canvasWidth * 3;
        this.y = this.canvasHeight - this.height - this.floorHeight + 15;
        this.loadImagesArray(this.ALERT_ANIMATION);
        this.animate();
    }

    animate(){
        setInterval(() => {
        this.playAnimation(this.ALERT_ANIMATION);
    }, this.animationCycle)}
}

