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