

function initNormalLevel() {
 







return new Level(

  [
    // new Coin(Math.random() * ((719 * 1) - (719 * 0)) + 719 * 0, Math.random() * ((480 - 100 - 58) - 130) + 130),
    // new Coin(Math.random() * ((719 * 1) - (719 * 0)) + 719 * 0, Math.random() * ((480 - 100 - 58) - 130) + 130),
    // new Coin(Math.random() * ((719 * 2) - (719 * 1)) + 719 * 1, Math.random() * ((480 - 100 - 58) - 130) + 130),
    // new Coin(Math.random() * ((719 * 2) - (719 * 1)) + 719 * 1, Math.random() * ((480 - 100 - 58) - 130) + 130),
    // new Coin(Math.random() * ((719 * 3) - (719 * 2)) + 719 * 2, Math.random() * ((480 - 100 - 58) - 130) + 130),
    // new Coin(Math.random() * ((719 * 3) - (719 * 2)) + 719 * 2, Math.random() * ((480 - 100 - 58) - 130) + 130),
    // new Coin(Math.random() * ((719 * 4) - (719 * 3)) + 719 * 3, Math.random() * ((480 - 100 - 58) - 130) + 130),
    // new Coin(Math.random() * ((719 * 4) - (719 * 3)) + 719 * 3, Math.random() * ((480 - 100 - 58) - 130) + 130),
    // new Coin(Math.random() * ((719 * 5) - (719 * 4)) + 719 * 4, Math.random() * ((480 - 100 - 58) - 130) + 130),
    // new Coin(Math.random() * ((719 * 5) - (719 * 4)) + 719 * 4, Math.random() * ((480 - 100 - 58) - 130) + 130),
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

  ],

  [

  ],
  719 * 5 + 50,

  6,


);
}