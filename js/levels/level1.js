



function initNormalLevel() {
return new Level(



  [
    new Coin(Math.random() * ((719 * 1) - (719 * 0)) + 719 * 0, Math.random() * ((480 - 100 - 58) - 130) + 130),
    new Coin(Math.random() * ((719 * 1) - (719 * 0)) + 719 * 0, Math.random() * ((480 - 100 - 58) - 130) + 130),
    new Coin(Math.random() * ((719 * 2) - (719 * 1)) + 719 * 1, Math.random() * ((480 - 100 - 58) - 130) + 130),
    new Coin(Math.random() * ((719 * 2) - (719 * 1)) + 719 * 1, Math.random() * ((480 - 100 - 58) - 130) + 130),
    new Coin(Math.random() * ((719 * 3) - (719 * 2)) + 719 * 2, Math.random() * ((480 - 100 - 58) - 130) + 130),
    new Coin(Math.random() * ((719 * 3) - (719 * 2)) + 719 * 2, Math.random() * ((480 - 100 - 58) - 130) + 130),
    new Coin(Math.random() * ((719 * 4) - (719 * 3)) + 719 * 3, Math.random() * ((480 - 100 - 58) - 130) + 130),
    new Coin(Math.random() * ((719 * 4) - (719 * 3)) + 719 * 3, Math.random() * ((480 - 100 - 58) - 130) + 130),
    new Coin(Math.random() * ((719 * 5) - (719 * 4)) + 719 * 4, Math.random() * ((480 - 100 - 58) - 130) + 130),
    new Coin(Math.random() * ((719 * 5) - (719 * 4)) + 719 * 4, Math.random() * ((480 - 100 - 58) - 130) + 130),
  ],

    [
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle()
    ],

  [
    new Chicken(Math.random() * ((719 * 2) - (719 * 1)) + 719 * 1),
    new Chicken(Math.random() * ((719 * 3) - (719 * 2)) + 719 * 2),
    new Chicken(Math.random() * ((719 * 4) - (719 * 3)) + 719 * 3),
    new Chicken(Math.random() * ((719 * 5) - (719 * 4)) + 719 * 4),
    new Minichicken(Math.random() * ((719 * 2) - (719 * 1)) + 719 * 1),
    new Minichicken(Math.random() * ((719 * 3) - (719 * 2)) + 719 * 2),
    new Minichicken(Math.random() * ((719 * 4) - (719 * 3)) + 719 * 3),
    new Minichicken(Math.random() * ((719 * 5) - (719 * 4)) + 719 * 4)
  ],

  new Endboss(),

  [
    new Clouds("./img/5_background/layers/4_clouds/1.png", 0.1, -719),
    new Clouds("./img/5_background/layers/4_clouds/2.png", 0.2, -719),
    new Clouds("./img/5_background/layers/4_clouds/1.png", 0.1, 0),
    new Clouds("./img/5_background/layers/4_clouds/2.png", 0.2, 0),
    new Clouds("./img/5_background/layers/4_clouds/1.png", 0.1, 719),
    new Clouds("./img/5_background/layers/4_clouds/2.png", 0.2, 719),
    new Clouds("./img/5_background/layers/4_clouds/1.png", 0.1, 719 * 2),
    new Clouds("./img/5_background/layers/4_clouds/2.png", 0.2, 719 * 2),
    new Clouds("./img/5_background/layers/4_clouds/1.png", 0.1, 719 * 3),
    new Clouds("./img/5_background/layers/4_clouds/2.png", 0.2, 719 * 3),
    new Clouds("./img/5_background/layers/4_clouds/1.png", 0.1, 719 * 4),
    new Clouds("./img/5_background/layers/4_clouds/2.png", 0.2, 719 * 4),
    new Clouds("./img/5_background/layers/4_clouds/1.png", 0.1, 719 * 5),
    new Clouds("./img/5_background/layers/4_clouds/2.png", 0.2, 719 * 5),
  ],

  [
    new BackgroundLayer("./img/5_background/layers/air.png", -719 * 2, 0),
    new BackgroundLayer("./img/5_background/layers/air.png", -719, 0),
    new BackgroundLayer("./img/5_background/layers/air.png", 0, 0),
    new BackgroundLayer("./img/5_background/layers/air.png", 719, 0),
    new BackgroundLayer("./img/5_background/layers/air.png", 719 * 2, 0),
    new BackgroundLayer("./img/5_background/layers/air.png", 719 * 3, 0),
    new BackgroundLayer("./img/5_background/layers/air.png", 719 * 4, 0),
    new BackgroundLayer("./img/5_background/layers/air.png", 719 * 5, 0),
    new BackgroundLayer("./img/5_background/layers/air.png", 719 * 6, 0),

    new BackgroundLayer("./img/5_background/layers/3_third_layer/1.png", -719 * 2, -3),
    new BackgroundLayer("./img/5_background/layers/3_third_layer/2.png", -719, -3),
    new BackgroundLayer("./img/5_background/layers/3_third_layer/1.png", 0, -3),
    new BackgroundLayer("./img/5_background/layers/3_third_layer/2.png", 719, -3),
    new BackgroundLayer("./img/5_background/layers/3_third_layer/1.png", 719 * 2, -3),
    new BackgroundLayer("./img/5_background/layers/3_third_layer/2.png", 719 * 3, -3),
    new BackgroundLayer("./img/5_background/layers/3_third_layer/1.png", 719 * 4, -3),
    new BackgroundLayer("./img/5_background/layers/3_third_layer/2.png", 719 * 5, -3),
    new BackgroundLayer("./img/5_background/layers/3_third_layer/1.png", 719 * 6, -3),

    new BackgroundLayer("./img/5_background/layers/2_second_layer/1.png", -719 * 2, -1.5),
    new BackgroundLayer("./img/5_background/layers/2_second_layer/2.png", -719, -1.5),
    new BackgroundLayer("./img/5_background/layers/2_second_layer/1.png", 0, -1.5),
    new BackgroundLayer("./img/5_background/layers/2_second_layer/2.png", 719, -1.5),
    new BackgroundLayer("./img/5_background/layers/2_second_layer/1.png", 719 * 2, -1.5),
    new BackgroundLayer("./img/5_background/layers/2_second_layer/2.png", 719 * 3, -1.5),
    new BackgroundLayer("./img/5_background/layers/2_second_layer/1.png", 719 * 4, -1.5),
    new BackgroundLayer("./img/5_background/layers/2_second_layer/2.png", 719 * 5, -1.5),
    new BackgroundLayer("./img/5_background/layers/2_second_layer/1.png", 719 * 6, -1.5),
    
    new BackgroundLayer("./img/5_background/layers/1_first_layer/1.png", -719 * 2, 0),
    new BackgroundLayer("./img/5_background/layers/1_first_layer/2.png", -719, 0),
    new BackgroundLayer("./img/5_background/layers/1_first_layer/1.png", 0, 0),
    new BackgroundLayer("./img/5_background/layers/1_first_layer/2.png", 719, 0),
    new BackgroundLayer("./img/5_background/layers/1_first_layer/1.png", 719 * 2, 0),
    new BackgroundLayer("./img/5_background/layers/1_first_layer/2.png", 719 * 3, 0),
    new BackgroundLayer("./img/5_background/layers/1_first_layer/1.png", 719 * 4, 0),
    new BackgroundLayer("./img/5_background/layers/1_first_layer/2.png", 719 * 5, 0),
    new BackgroundLayer("./img/5_background/layers/1_first_layer/1.png", 719 * 6, 0),
  ],
  719 * 5 + 50

);
}