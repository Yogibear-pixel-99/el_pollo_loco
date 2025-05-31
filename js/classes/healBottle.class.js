class Healbottle extends DrawableObject {
  height = 55;
  width = 55;
  itemName = 'collectBottle';

  offset = {
    top: 10,
    right: 10,
    bottom: 5,
    left: 20,
  };

  constructor() {
    super();

    this.x = this.calculateNewPosition();
    this.y = this.floorPosition();
    this.loadImage(this.getBottleImg());
  }

  /**
   * Chooses with a random number, the bottle img.
   * 
   * @returns - The img src of the bottle to collect.
   */
  getBottleImg() {
    let value = Math.random();
    let src = "";
    if (value >= 0.7) {
      src = "./img/6_salsa_bottle/heal_bottle_2.png";
    } else if (value >= 0.4) {
      src = "./img/6_salsa_bottle/heal_bottle_3.png";
    } else if (value >= 0) {
      src = "./img/6_salsa_bottle/heal_bottle.png";
    }
    return src;
  }

  /**
   * Calculates a new x position, depending on the canvas width.
   * 
   * @returns 
   */
  calculateNewPosition() {
    let x = Math.random() * canvasWidth * 6;
    // let x = Math.random() * canvasWidth * 5;
     if (x < -200 || x > 3600) {
      return this.calculateNewPosition();
     }
     return x;
  }

    isCollected() {
    this.x = this.calculateNewPosition();
  }
}
