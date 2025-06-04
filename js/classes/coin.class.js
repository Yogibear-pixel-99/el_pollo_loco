/**
 * Represents a collectible coin in the game.
 * Extends {@link DrawableObject}.
 */
class Coin extends DrawableObject {
  /**
   * Height of the coin sprite in pixels.
   * @type {number}
   */
  height = 100;

  /**
   * Width of the coin sprite in pixels.
   * @type {number}
   */
  width = 100;

  /**
   * Indicates if the coin has been collected.
   * @type {boolean}
   */
  collected = false;

  /**
   * Name used for scoring or event handling when collected.
   * @type {string}
   */
  itemName = "collectCoin";

  /**
   * Interval ID for the coin animation loop.
   * @type {number}
   */
  coinInterval;

  /**
   * Fixed vertical position to reset or reference the coin's original y.
   * @type {number}
   */
  fixed_y;

  /**
   * Offset values for collision detection.
   * @type {{top: number, right: number, bottom: number, left: number}}
   */
  offset = {
    top: 35,
    right: 35,
    bottom: 35,
    left: 35,
  };

  /**
   * Image frames for the rotating coin animation.
   * @type {string[]}
   */
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
    "./img/8_coin/coin_3.png",
  ];

  /**
   * Image frames shown when the coin is collected.
   * @type {string[]}
   */
  COLLECTED_COIN_ANIMATION = [
    "./img/8_coin/collected/coin_collect_2.png",
    "./img/8_coin/collected/coin_collect_3.png",
    "./img/8_coin/collected/coin_collect_4.png",
    "./img/8_coin/collected/coin_collect_5.png",
    "./img/8_coin/collected/coin_collect_6.png",
    "./img/8_coin/collected/coin_collect_7.png",
  ];

  /**
   * Creates an instance of a coin.
   * Loads animation frames and sets initial position.
   * Starts animation loop.
   *
   * @param {number} x - Initial horizontal position.
   * @param {number} y - Initial vertical position.
   */
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.fixed_y = y;
    this.loadImage("./img/8_coin/collected/coin_collect_2.png");
    this.loadImagesArray(this.COIN_ANIMATION);
    this.loadImagesArray(this.COLLECTED_COIN_ANIMATION);
    this.animate();
  }

  /**
   * Runs the coin animation.
   * Plays the spinning animation when not collected,
   * plays the collected animation and triggers upward movement after collection.
   */
  animate() {
    this.coinInterval = setInterval(() => {
      if (gamePaused) return;
      if (!this.collected) {
        this.playAnimation(this.COIN_ANIMATION);
      } else {
        this.playAnimation(this.COLLECTED_COIN_ANIMATION);
        this.collectMovement();
      }
    }, 30);
  }

  /**
   * Moves the coin upward during the collection animation.
   */
  collectMovement() {
    this.y -= 2;
  }
}
