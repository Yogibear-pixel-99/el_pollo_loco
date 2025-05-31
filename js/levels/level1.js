

function initNormalLevel() {

return new Level(

  [],

    [
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
      new Healbottle(),
      new Healbottle()
    ],

  [
    new Chicken(Math.random() * ((719 * 2) - (719 * 1)) + 719 * 1),
    new Minichicken(Math.random() * ((719 * 2) - (719 * 1)) + 719 * 1),
  ],

  new Endboss(),

  [],

  [],

  719 * 5 + 50,

  [
    new Cactus(-300, 220),
    new Cactus(719 * 5 + 80, 220)
  ]


);
}