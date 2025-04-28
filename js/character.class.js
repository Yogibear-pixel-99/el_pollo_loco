class Character extends MovableObject {
  x = 50;
  y = 280;
  height = 150;
  width = 80;
  constructor() {
    super().loadImage("./img/2_character_pepe/2_walk/W-21.png");
  }

  throwBottle() {}
  jump() {}
}
