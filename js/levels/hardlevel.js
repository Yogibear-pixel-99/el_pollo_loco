/**
 * Initializes and returns a new Level instance configured for the Chicken Rush game mode.
 * 
 * The level includes:
 * - An empty coins array.
 * - Seven Bottle objects to collect.
 * - Two Healbottle objects to collect.
 * - Two enemies: one Chicken and one Minichicken, positioned randomly within a range.
 * - One Endboss Object.
 * - Empty arrays for dead enemies and sky objects.
 * - The level end position calculated.
 * 
 * @returns {Level} A new Level instance configured specifically for Chicken Rush mode.
 */
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

    [
    new Cactus(-300, 220),
    new Cactus(719 * 5 + 80, 220)
  ]
);
}