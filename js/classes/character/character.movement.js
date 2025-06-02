/**
 * Moves the character by setting the keyboard object varaibles on pressing the steering keys.
 */
function moveDetection(char) {
  char.moveInterval = setInterval(() => {
    if (!char.isDead()) {
      if (char.world.keyboard.KEY_JUMP === true && !char.aboveGround()) {
        jump(char);
      }
      if (
        char.world.keyboard.KEY_RIGHT === true &&
        char.x < char.world.level.level_end_x - 30
      ) {
        char.moveRight();
        char.world.camera_x = 200 - char.x;
        char.otherDirection = false;
      }
      if (char.world.keyboard.KEY_LEFT === true && char.x > -290) {
        char.moveLeft();
        char.world.camera_x = 200 - char.x;
        char.otherDirection = true;
      }
      if (char.world.keyboard.KEY_SHOT === true) {
        char.throwBottle();
      }
    }
  }, 1000 / 60);
}

/**
 * Plays the jumping animation, depending on the vertical speed (speedY variable) to show the rising
 * or falling animation. Updates the jump state (isJumping variable).
 * @returns {void}
 */
function animateJump(char) {
  if (!char.isJumping) {
    char.img = char.animatedImages[char.JUMPING_ANIMATION[2]];
    char.isJumping = true;
    return;
  }
  char.loadImage(char.JUMPING_ANIMATION[2]);
  if (char.speedY >= 0.5 && !char.isHurt()) {
    char.img = char.animatedImages[char.JUMPING_ANIMATION[3]];
  } else if (jumpIsOnHighestPoint(char)) {
    char.img = char.animatedImages[char.JUMPING_ANIMATION[4]];
  } else if (char.speedY >= -0.2 && char.speedY <= -0.6 && !char.isHurt()) {
    char.img = char.animatedImages[char.JUMPING_ANIMATION[5]];
  } else if (char.speedY < -0.6 && !char.isHurt() && char.aboveGround()) {
    char.img = char.animatedImages[char.JUMPING_ANIMATION[6]];
  } else {
    char.img = char.animatedImages[char.JUMPING_ANIMATION[7]];
    char.isJumping = false;
  }
}

/**
 * Checks if the character is on the highest jump point before falling.
 * @returns {boolean}
 */
function jumpIsOnHighestPoint(char) {
  return (
    char.speedY < 0.5 &&
    char.speedY > -0.2 &&
    !char.isHurt() &&
    char.aboveGround()
  );
}

/**
 * Sets the vertical speed for jumping by setting the speedY variable to a number.
 * Triggers the enemies' reaction to the jump event.
 */
function jump(char) {
  char.speedY = 22;
  world.enemyRunAwayOnCharJump();
}

/**
 * Checks if the character is walking an returns a boolean.
 *
 * @returns {boolean}
 */
function isWalking(char) {
  return char.world.keyboard.KEY_RIGHT || char.world.keyboard.KEY_LEFT;
}
