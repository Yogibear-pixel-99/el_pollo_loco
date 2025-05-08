class Coin extends DrawableObject {
    height = 100;
    width = 100;

    offset = {
        top: 35,
        right: 35,
        bottom: 35,
        left: 35,
      };


    COIN_ANIMATION = [
        "./img/8_coin/coin_1.png",
        "./img/8_coin/coin_2.png"
    ];

        constructor(x, y){
            super();
            this.x = x;
            this.y = y;
            this.loadImage("./img/8_coin/coin_1.png");
            this.loadImagesArray(this.COIN_ANIMATION);
            // this.animate();
        }

  collected(){
    world.coinbar.updateCoinBar();
    console.log('Pepe collected this coin!')
  }

}