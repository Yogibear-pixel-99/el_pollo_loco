function initHardLevel() {
return new Level(

  [],

    [
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
    new Chicken(Math.random() * ((719 * 3) - (719 * 2)) + 719 * 2),
    new Chicken(Math.random() * ((719 * 4) - (719 * 3)) + 719 * 3),
    new Chicken(Math.random() * ((719 * 5) - (719 * 4)) + 719 * 4),
    new Minichicken(Math.random() * ((719 * 2) - (719 * 1)) + 719 * 1),
    new Minichicken(Math.random() * ((719 * 3) - (719 * 2)) + 719 * 2),
    new Minichicken(Math.random() * ((719 * 4) - (719 * 3)) + 719 * 3),
    new Minichicken(Math.random() * ((719 * 5) - (719 * 4)) + 719 * 4),
  ],

  new Endboss(),

  [],

  [],

  719 * 5 + 50,


);
}