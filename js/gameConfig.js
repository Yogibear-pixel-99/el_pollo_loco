let levelMode;

// gamemode

// if gamemode is normal this

// if gamemode is chickenrush this.

// spawn chicken function is different

// collect coin function bzw. use coin function

// no endboss

// start enemies moveDirection interval
// load level1 to level

// NORMALGAME
// function loadNormalGame() {
  // startNormalWorld();
  // startNormalCharacter();
  // pushNormalEnemies();
  // pushBoss();
// }

// function startNormalWorld() {
//   world.draw();
//   world.setWorld();
//   world.runCollisions();
//   world.moveBackground();
//   world.updatePlayerScore();
//   world.checkIfGameIsOver();
//   playGameMusic();
//   world.checkCluckerSound();
//   world.enemyMoveDirection();
// }

// function playGameMusic() {
//   world.audiofiles.music.gameMusic.loop = true;
//   world.audiofiles.music.gameMusic.play();
// }

// function startNormalCharacter() {
//   world.character.animate();
//   world.character.moveDetection();
//   world.character.applyGravity();
//   world.character.playSounds();
// }

// function pushNormalEnemies(){
//     world.level.enemies.push(
//     new Chicken(Math.random() * ((719 * 2) - (719 * 1)) + 719 * 1),
//     new Chicken(Math.random() * ((719 * 3) - (719 * 2)) + 719 * 2),
//     new Chicken(Math.random() * ((719 * 4) - (719 * 3)) + 719 * 3),
//     new Chicken(Math.random() * ((719 * 5) - (719 * 4)) + 719 * 4),
//     new Minichicken(Math.random() * ((719 * 2) - (719 * 1)) + 719 * 1),
//     new Minichicken(Math.random() * ((719 * 3) - (719 * 2)) + 719 * 2),
//     new Minichicken(Math.random() * ((719 * 4) - (719 * 3)) + 719 * 3),
//     new Minichicken(Math.random() * ((719 * 5) - (719 * 4)) + 719 * 4)
//     );
// }

// function pushBoss(){
//     world.level.endboss = new Endboss();
// }