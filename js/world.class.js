class World {
  character = new Character();
  enemies = [
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Minichicken(),
    new Minichicken(),
  ];
  skyObjects = [
    new Clouds('./img/5_background/layers/4_clouds/1.png', 0.1),
    new Clouds('./img/5_background/layers/4_clouds/2.png', 0.5)
  ];

  backgrounds = [
    new BackgroundLayer("./img/5_background/layers/air.png"),
    new BackgroundLayer("./img/5_background/layers/3_third_layer/1.png"),
    new BackgroundLayer("./img/5_background/layers/2_second_layer/1.png"),
    new BackgroundLayer("./img/5_background/layers/1_first_layer/1.png"),
  ];

  canvas;
  ctx;
  keyboard;

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
  }

  setWorld(){
    this.character.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.addObjectsToCanvas(this.backgrounds);
    this.addObjToCanvas(this.character);
    this.addObjectsToCanvas(this.enemies);
    this.addObjectsToCanvas(this.skyObjects);
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjToCanvas(obj){
    if (obj.otherDirection) {
        this.ctx.save();
        this.ctx.translate(obj.width, 0);
        this.ctx.scale(-1, 1);
        obj.x = obj.x * -1;
    }
    this.ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height);
    if (obj.otherDirection) {
      obj.x = obj.x * -1;
      this.ctx.restore();
    }
  }

  addObjectsToCanvas(array){
    array.forEach((element) => {
      this.addObjToCanvas(element);
    })
  }
}
