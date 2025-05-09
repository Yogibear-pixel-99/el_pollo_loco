class Bottle extends DrawableObject {
    height = 50;
    width = 50;
    collected = false;
  
    offset = {
      top: 10,
      right: 10,
      bottom: 5,
      left: 20,
    };
  
    // BOTTLE_ANIMATION = [
    //     "./img/8_coin/coin_1.png",
    //     "./img/8_coin/coin_1.png",
    //     "./img/8_coin/coin_1.png",
    //     "./img/8_coin/coin_1.png",
    //     "./img/8_coin/coin_1.png",
    //     "./img/8_coin/coin_1.png",
    //     "./img/8_coin/coin_1.png",
    //     "./img/8_coin/coin_3.png",
    //     "./img/8_coin/coin_3.png",
    //     "./img/8_coin/coin_3.png",
    //     "./img/8_coin/coin_3.png",
    //     "./img/8_coin/coin_3.png",
    //     "./img/8_coin/coin_3.png",
    //     "./img/8_coin/coin_3.png"
    //   ];
      
    // COLLECTED_COIN_ANIMATION = [
    //   "./img/8_coin/collected/coin_collect_2.png",
    //   "./img/8_coin/collected/coin_collect_3.png",
    //   "./img/8_coin/collected/coin_collect_4.png",
    //   "./img/8_coin/collected/coin_collect_5.png",
    //   "./img/8_coin/collected/coin_collect_6.png",
    //   "./img/8_coin/collected/coin_collect_7.png",
    // ];
  
    constructor() {
      super();
      this.isFlipped();


    //   this.x = this.calculateNewPosition();
      this.x = Math.random() * this.canvasWidth;
      this.y = this.floorPosition();
      this.loadImage("./img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    //   this.loadImagesArray(this.COIN_ANIMATION);
    //   this.loadImagesArray(this.COLLECTED_COIN_ANIMATION);
    //   this.animate();
    }


    isFlipped(){
        let value = Math.random();
        if (value >= 0.5) this.otherDirection = true;
    }

    calculateNewPosition(){
        // console.log(this.world.character);
        console.log(world.character);
        return Math.random() * this.canvasWidth + world.character.x;
    }
  
    // animate() {
    //   setInterval(() => {
    //     if (!this.collected) {
    //       this.playAnimation(this.COIN_ANIMATION);
    //     } else {
    //       this.playAnimation(this.COLLECTED_COIN_ANIMATION);
    //     }
    //   }, 50);
    // }
  
    // isCollected() {
    //   setInterval(() => {
    //     this.y = this.y - 2;
    //   }, 20);
    //   console.log("Pepe collected this coin!");
    // }
  }
  