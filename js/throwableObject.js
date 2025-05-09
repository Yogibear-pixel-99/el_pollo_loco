class ThrowableObject extends DrawableObject {
    width =  55;
    height = 55;
    objectType = '';

    x = 60;
    y = 400;
    // x = world.character.x + world.character.width;
    // y = this.floorPosition() + world.characger.width / 2;

    BOTTLE_THROW_ANIMATION = [
        "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
        "./img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
        "./img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
        "./img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
    ]

    constructor(objectType){
        super();
        this.objectType = objectType;
        this.loadImage("./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png");
        this.loadImagesArray(this.BOTTLE_THROW_ANIMATION);
        this.animate();
    }


    animate(){
        setInterval(() => {
            this.playAnimation(this.BOTTLE_THROW_ANIMATION);
        }, 150)
    }

    checkTypeOfObject(){
            if (objectType == 'bottle') {
                return "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png"
            }
    }

}