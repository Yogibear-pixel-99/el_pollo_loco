const level1 = new Level(



  [
    new Coin(Math.random() * ((720 * 1) - (720 * 0)) + 720 * 0, Math.random() * ((480 - 100 - 58) - 190) + 190),
    new Coin(Math.random() * ((720 * 1) - (720 * 0)) + 720 * 0, Math.random() * ((480 - 100 - 58) - 190) + 190),
    new Coin(Math.random() * ((720 * 2) - (720 * 1)) + 720 * 1, Math.random() * ((480 - 100 - 58) - 190) + 190),
    new Coin(Math.random() * ((720 * 2) - (720 * 1)) + 720 * 1, Math.random() * ((480 - 100 - 58) - 190) + 190),
    new Coin(Math.random() * ((720 * 2) - (720 * 1)) + 720 * 1, Math.random() * ((480 - 100 - 58) - 190) + 190),
    new Coin(Math.random() * ((720 * 3) - (720 * 2)) + 720 * 2, Math.random() * ((480 - 100 - 58) - 190) + 190),
    new Coin(Math.random() * ((720 * 3) - (720 * 2)) + 720 * 2, Math.random() * ((480 - 100 - 58) - 190) + 190),
    new Coin(Math.random() * ((720 * 3) - (720 * 2)) + 720 * 2, Math.random() * ((480 - 100 - 58) - 190) + 190),
    new Coin(Math.random() * ((720 * 4) - (720 * 3)) + 720 * 3, Math.random() * ((480 - 100 - 58) - 190) + 190),
    new Coin(Math.random() * ((720 * 4) - (720 * 3)) + 720 * 3, Math.random() * ((480 - 100 - 58) - 190) + 190),

  ],

    [
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle()
    ],

  [
    // new Chicken(),
    // new Chicken(),
    // new Chicken(),
    // new Minichicken(),
    // new Minichicken()
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
  ],

  [
    new BackgroundLayer("./img/5_background/layers/air.png", -719, 1),
    new BackgroundLayer("./img/5_background/layers/3_third_layer/2.png", -719, -2),
    new BackgroundLayer("./img/5_background/layers/2_second_layer/2.png", -719, -1),
    new BackgroundLayer("./img/5_background/layers/1_first_layer/2.png", -719, 0),

    new BackgroundLayer("./img/5_background/layers/air.png", 0, 1),
    new BackgroundLayer("./img/5_background/layers/3_third_layer/1.png", 0, -2),
    new BackgroundLayer("./img/5_background/layers/2_second_layer/1.png", 0, -1),
    new BackgroundLayer("./img/5_background/layers/1_first_layer/1.png", 0, 0),

    new BackgroundLayer("./img/5_background/layers/air.png", 719, 1),
    new BackgroundLayer("./img/5_background/layers/3_third_layer/2.png", 719, -2),
    new BackgroundLayer("./img/5_background/layers/2_second_layer/2.png", 719, -1),
    new BackgroundLayer("./img/5_background/layers/1_first_layer/2.png", 719, 0),

    new BackgroundLayer("./img/5_background/layers/air.png", 719 * 2, 1),
    new BackgroundLayer("./img/5_background/layers/3_third_layer/1.png", 719 * 2, -2),
    new BackgroundLayer("./img/5_background/layers/2_second_layer/1.png", 719 * 2, -1),
    new BackgroundLayer("./img/5_background/layers/1_first_layer/1.png", 719 * 2, 0),

    new BackgroundLayer("./img/5_background/layers/air.png", 719 * 3, 1),
    new BackgroundLayer("./img/5_background/layers/3_third_layer/2.png", 719 * 3, -2),
    new BackgroundLayer("./img/5_background/layers/2_second_layer/2.png", 719 * 3, -1),
    new BackgroundLayer("./img/5_background/layers/1_first_layer/2.png", 719 * 3, 0),

    new BackgroundLayer("./img/5_background/layers/air.png", 719 * 4, 1),
    new BackgroundLayer("./img/5_background/layers/3_third_layer/1.png", 719 * 4, -2),
    new BackgroundLayer("./img/5_background/layers/2_second_layer/1.png", 719 * 4, -1),
    new BackgroundLayer("./img/5_background/layers/1_first_layer/1.png", 719 * 4, 0),
  ],

  719 * 4 + 50

);