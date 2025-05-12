class Bottle extends DrawableObject {
  height = 50;
  width = 50;

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

  getBottleImg() {
    let value = Math.random();
    let src = "";
    if (value >= 0.7) {
      src = "./img/6_salsa_bottle/1_salsa_bottle_on_ground.png";
    } else if (value >= 0.4) {
      src = "./img/6_salsa_bottle/2_salsa_bottle_on_ground.png";
    } else if (value >= 0) {
      src = "./img/6_salsa_bottle/salsa_bottle.png";
    }
    return src;
  }

  calculateNewPosition() {
    return Math.random() * this.canvasWidth * 3;
  }

  isCollected() {
    if (world.character.bottles < 5) this.x = this.calculateNewPosition();
  }
}
