class Coin extends MovableObject {
    x = 200;
    y = 200;
    height = 100;
    width = 100;

    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      };


    COIN_ANIMATION = [
        "./img/8_coin/coin_1.png",
        "./img/8_coin/coin_2.png",
    ]

        constructor(){
            super();
            this.loadImage("./img/8_coin/coin_1.png");
            // this.x = 400;
            // this.y = 200;
            // this.loadImagesArray(this.COIN_ANIMATION);
            // this.animate();
        }

}