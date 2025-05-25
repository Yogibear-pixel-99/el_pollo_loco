

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
      new Bottle(),
      new Bottle(),
      new Bottle()
    ],

  [
    new Chicken(Math.random() * ((719 * 2) - (719 * 1)) + 719 * 1),
    new Minichicken(Math.random() * ((719 * 2) - (719 * 1)) + 719 * 1),
  ],

  new Endboss(),

  [],

  [],

  719 * 5 + 50,

  6,


);
}