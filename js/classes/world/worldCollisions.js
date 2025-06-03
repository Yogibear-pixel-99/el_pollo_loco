  /**
   * Handles collisions between the player and coins.
   * Collects coins and updates the UI and game state.
   */
  function checkCoinCollision() {
    world.level.coins = world.level.coins.filter((coin) => {
      if (world.character.isColliding(coin) && !coin.collected) {
        audio.playSoundClone("collectCoin");
        world.addPointsToPlayerScore("collectCoin");
        world.character.collectCoin();
        coin.collected = true;
        world.level.collectedCoins.push(coin);
        setTimeout (() => world.deleteCollectedCoin, 1000);
        world.coinbar.updateCoinBar();
        if (world.character.coins === 10 && gameMode != "chickenRush") {
          world.level.endboss.startBossFight();
        }
        return false;
      }
      return true;
    });
}

  /**
   * Handles collisions between player and enemies.
   * Kills enemies if jumped on, otherwise damages player.
   */
  function checkEnemyCollisions() {
    let deadEnemies = [];
    world.level.enemies = world.level.enemies.filter((enemy) => {
      if (world.character.isColliding(enemy)) {
        if (world.character.collisionFromAbove(enemy) && !world.checkGameEnd()) {
          deadEnemies.push(enemy);
          world.deadEnemyRoutine(enemy);
          world.character.jumpOnEnemy();
          world.addPointsToPlayerScore(enemy.scoreNameJump);
          world.level.deadEnemies.push(enemy);
          return false;
        } else {
          world.character.hit();
          world.healthbar.updateHealthbar();
          return true;
        }
      }
      return true;
    });
    deadEnemies.forEach((enemy) => world.spawnNewChickensForRushMode(enemy));
  }

  
  /**
   * Handles collisions between the player and collectible bottles.
   */
  function checkBottleCollision() {
    world.level.bottles.forEach((bottle) => {
      if (world.character.isColliding(bottle)) {
        if (world.character.bottles < 5) {
          world.addPointsToPlayerScore(bottle.itemName);
          audio.playRandomSound("collectBottle");
        }
        bottle.isCollected();
        world.character.collectBottle();
        world.bottlebar.updateBottleBar();
      }
    });
  }

  
  /**
   * Handles collisions between the player and healing bottles.
   * Heals the player and updates the UI.
   */
  function checkHealBottleCollision() {
    world.level.healBottles.forEach((bottle) => {
      if (world.character.isColliding(bottle) && world.character.energy < 100) {
        audio.playSoundClone("bottleHeal");
        bottle.isCollected();
        world.character.bottleHeal();
        world.healthbar.updateHealthbar();
        world.addPointsToPlayerScore(bottle.itemName);
      }
    });
  }

    /**
   * Handles the collision for thrown bottles against the enemies.
   * @param {Object} bottle - The thrown bottle.
   */
  function checkThrownBottleEnemyCollision(bottle) {
    let deadEnemies = [];
    world.level.enemies = world.level.enemies.filter((enemy) => {
      if (bottle.isColliding(enemy) && bottle.alreadyHittet === false) {
        world.animateBrokenBottle(bottle);
        deadEnemies.push(enemy);
        world.deadEnemyRoutine(enemy);
        world.addPointsToPlayerScore(enemy.scoreNameBottle);
        world.level.deadEnemies.push(enemy);
        return false;
      }
      return true;
    });
    deadEnemies.forEach((enemy) => world.spawnNewChickensForRushMode(enemy));
  }

  /**
   * Checks collision between player and boss enemy.
   * Damages player if collision detected.
   */
  function checkBossCollision() {
    if (
      world.character.isColliding(world.level.endboss) ||
      world.character.isCollidingHead(world.level.endboss)
    ) {
      world.character.hit();
      world.healthbar.updateHealthbar();
    }
  }

   /**
   * Handles collisions for thrown bottles against enemies and boss.
   */
  function checkThrownBottleCollision() {
    world.thrownBottles.forEach((bottle) => {
      if (world.bottleHittetFloor(bottle)) {
        world.animateBrokenBottle(bottle);
        world.addPointsToPlayerScore(bottle.itemName);
      } else {
        world.checkThrownBottleBossCollision(bottle);
        world.checkThrownBottleEnemyCollision(bottle);
      }
    });
  }