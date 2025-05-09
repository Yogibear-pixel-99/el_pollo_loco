class Coin extends DrawableObject {
  height = 100;
  width = 100;
  collected = false;

  offset = {
    top: 35,
    right: 35,
    bottom: 35,
    left: 35,
  };

  COIN_ANIMATION = [
      "./img/8_coin/coin_1.png",
      "./img/8_coin/coin_1.png",
      "./img/8_coin/coin_1.png",
      "./img/8_coin/coin_1.png",
      "./img/8_coin/coin_1.png",
      "./img/8_coin/coin_1.png",
      "./img/8_coin/coin_1.png",
      "./img/8_coin/coin_3.png",
      "./img/8_coin/coin_3.png",
      "./img/8_coin/coin_3.png",
      "./img/8_coin/coin_3.png",
      "./img/8_coin/coin_3.png",
      "./img/8_coin/coin_3.png",
      "./img/8_coin/coin_3.png"
    ];
    
  COLLECTED_COIN_ANIMATION = [
    "./img/8_coin/collected/coin_collect_2.png",
    "./img/8_coin/collected/coin_collect_3.png",
    "./img/8_coin/collected/coin_collect_4.png",
    "./img/8_coin/collected/coin_collect_5.png",
    "./img/8_coin/collected/coin_collect_6.png",
    "./img/8_coin/collected/coin_collect_7.png",
  ];

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadImage("./img/8_coin/collected/coin_collect_2.png");
    this.loadImagesArray(this.COIN_ANIMATION);
    this.loadImagesArray(this.COLLECTED_COIN_ANIMATION);
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (!this.collected) {
        this.playAnimation(this.COIN_ANIMATION);
      } else {
        this.playAnimation(this.COLLECTED_COIN_ANIMATION);
      }
    }, 50);
  }

  isCollected() {
    setInterval(() => {
      this.y = this.y - 2;
    }, 20);
    console.log("Pepe collected this coin!");
  }
}
