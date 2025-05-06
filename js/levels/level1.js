const level1 = new Level(
  [
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Minichicken(),
    new Minichicken(),
    new Endboss(),
  ],

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
  ],

  [
    new BackgroundLayer("./img/5_background/layers/air.png", -719),
    new BackgroundLayer("./img/5_background/layers/3_third_layer/2.png", -719),
    new BackgroundLayer("./img/5_background/layers/2_second_layer/2.png", -719),
    new BackgroundLayer("./img/5_background/layers/1_first_layer/2.png", -719),
    new BackgroundLayer("./img/5_background/layers/air.png", 0),
    new BackgroundLayer("./img/5_background/layers/3_third_layer/1.png", 0),
    new BackgroundLayer("./img/5_background/layers/2_second_layer/1.png", 0),
    new BackgroundLayer("./img/5_background/layers/1_first_layer/1.png", 0),
    new BackgroundLayer("./img/5_background/layers/air.png", 719),
    new BackgroundLayer("./img/5_background/layers/3_third_layer/2.png", 719),
    new BackgroundLayer("./img/5_background/layers/2_second_layer/2.png", 719),
    new BackgroundLayer("./img/5_background/layers/1_first_layer/2.png", 719),
    new BackgroundLayer("./img/5_background/layers/air.png", 719 * 2),
    new BackgroundLayer(
      "./img/5_background/layers/3_third_layer/1.png",
      719 * 2
    ),
    new BackgroundLayer(
      "./img/5_background/layers/2_second_layer/1.png",
      719 * 2
    ),
    new BackgroundLayer(
      "./img/5_background/layers/1_first_layer/1.png",
      719 * 2
    ),
    new BackgroundLayer("./img/5_background/layers/air.png", 719 * 3),
    new BackgroundLayer(
      "./img/5_background/layers/3_third_layer/2.png",
      719 * 3
    ),
    new BackgroundLayer(
      "./img/5_background/layers/2_second_layer/2.png",
      719 * 3
    ),
    new BackgroundLayer(
      "./img/5_background/layers/1_first_layer/2.png",
      719 * 3
    ),
  ],
  719 * 3 + 50
);
