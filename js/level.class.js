class Level {
  coins;
  bottles;
  healBottles;
  enemies;
  endboss;
  skyObjects;
  backgrounds;
  level_end_x;
  level_size = 6;

  constructor(
    coins,
    bottles,
    healBottles,
    enemies,
    endboss,
    clouds,
    backgrounds,
    level_end_x
  ) {
    this.coins = coins;
    this.bottles = bottles;
    this.healBottles = healBottles;
    this.enemies = enemies;
    this.endboss = endboss;
    this.skyObjects = clouds;
    this.backgrounds = backgrounds;
    this.level_end_x = level_end_x;
    this.setBackgrounds();
    this.addCoins();
  }

  setBackgrounds() {
    this.addAirLayers("./img/5_background/layers/air.png", 0);
    this.addClouds(
      "./img/5_background/layers/4_clouds/1.png",
      "./img/5_background/layers/4_clouds/2.png",
      0
    );
    this.addLayers(
      "./img/5_background/layers/3_third_layer/1.png",
      "./img/5_background/layers/3_third_layer/2.png",
      -3
    );
    this.addLayers(
      "./img/5_background/layers/2_second_layer/1.png",
      "./img/5_background/layers/2_second_layer/2.png",
      -1.5
    );
    this.addLayers(
      "./img/5_background/layers/1_first_layer/1.png",
      "./img/5_background/layers/1_first_layer/2.png",
      0
    );
  }

  addClouds(firstLayer, secondLayer) {
    for (let lvlIndex = 0; lvlIndex < this.level_size; lvlIndex++) {
      this.skyObjects.push(
        new Clouds(firstLayer, 0.1, (lvlIndex * 2 - 1) * (canvasWidth - 1)),
        new Clouds(secondLayer, 0.2, lvlIndex * 2 * (canvasWidth - 1))
      );
    }
  }

  addLayers(firstLayer, secondLayer, parallaxFactor) {
    for (let lvlIndex = 0; lvlIndex < this.level_size; lvlIndex++) {
      this.backgrounds.push(
        new BackgroundLayer(
          firstLayer,
          (lvlIndex * 2 - 1) * (canvasWidth - 1),
          parallaxFactor
        ),
        new BackgroundLayer(
          secondLayer,
          lvlIndex * 2 * (canvasWidth - 1),
          parallaxFactor
        )
      );
    }
  }

  addAirLayers(layer, parallaxFactor) {
    for (let lvlIndex = 0; lvlIndex < this.level_size; lvlIndex++) {
      this.backgrounds.push(
        new BackgroundLayer(
          layer,
          (lvlIndex * 2 - 1) * (canvasWidth - 1),
          parallaxFactor
        ),
        new BackgroundLayer(
          layer,
          lvlIndex * 2 * (canvasWidth - 1),
          parallaxFactor
        )
      );
    }
  }

  addCoins() {
    for (let lvlIndex = 0; lvlIndex < this.level_size - 1; lvlIndex++) {
      this.coins.push(
        new Coin(this.getXForCoins(lvlIndex), this.getYForCoins()),
        new Coin(this.getXForCoins(lvlIndex), this.getYForCoins())
      );
    }
  }

  getXForCoins(lvlIndex) {
    let x =
      Math.random() * (canvasWidth * (lvlIndex + 1) - canvasWidth * lvlIndex) +
      canvasWidth * lvlIndex;
    if (x > this.level_end_x || (x > 100 && x < 300)) {
      return this.getXForCoins(lvlIndex);
    } else {
      return x;
    }
  }

  getYForCoins() {
    return Math.random() * (canvasHeight - 158 - 130) + 130;
  }


}
// PROBLEM WITH THE PUSH FUNCTION
