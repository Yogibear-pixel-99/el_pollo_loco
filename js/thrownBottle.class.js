class Thrownbottle extends ThrowableObject {
    width =  80;
    height = 80;

    BOTTLE_THROW_ANIMATION = [
        "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation_New_1.png",
        "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation_New_2.png",
        "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation_New_3.png",
        "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation_New_4.png",
        "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation_New_5.png",
        "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation_New_6.png",
        "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation_New_7.png",
        "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation_New_8.png",
    ]

    constructor() {
        super();
        this.loadImage("./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation_New_1.png");
        this.loadImagesArray(this.BOTTLE_THROW_ANIMATION);
        this.animate();
        this.move();
    }

    animate(){
        setInterval(() => {
            this.playAnimation(this.BOTTLE_THROW_ANIMATION);
            this.x += 1;
        }, 50)
    }

    move(){
        this.x = world.character.x + world.character.width / 2;
        this.y = this.floorPosition() - world.character.height / 3
        setInterval(() => {
            this.x += 1;
        }, 1000 / 60)
    }
}