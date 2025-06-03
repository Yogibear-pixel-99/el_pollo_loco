/**
 * Starts a random attack mode for the boss if the game is not ended.
 *
 * @param {object} boss - The boss instance executing the attack.
 * @returns {void}
 */
function attack(boss) {
  if (!world.checkGameEnd() && gamesHasStarted && !gamePaused) {
    let attackDelay = Math.round(Math.random() * (4500 - 2500) + 2500);
    setTimeout(() => {
      boss.stopAllBossIntervals();
      jumpAttack(boss);
    }, attackDelay);
  }
}

/**
 * Initiates the boss jump attack sequence.
 * Handles animation phases, plays attack sound, and triggers movement.
 * Ends if the boss dies or the animation finishes.
 *
 * @param {object} boss - The boss instance.
 * @returns {void}
 */
function jumpAttack(boss) {
  if (boss.gamePaused) return;
  boss.attackAnimationNr = Math.ceil(Math.random() * 3) * 5 + 10;
  boss.attackCount = 0;
  boss.animationCount = 0;
  boss.jumpAttackInterval = setInterval(() => {
    if (boss.isDead()) {
      clearJumpAttack(boss);
    }
    attackJumpPhaseOne(boss);
    attackJumpPhaseTwo(boss);
    attackJumpPhaseThree(boss);
    attackJumpReset(boss);
    boss.attackCount++;
    if (boss.bossIsHurt()) {
      boss.playAnimation(boss.BOSS_BOTTLE_HIT_ANIMATION);
    }
  }, 150);
}

/**
 * Phase 1 of the jump attack.
 * Plays the alert animation for the first 8 frames.
 *
 * @param {object} boss - The boss instance.
 * @returns {void}
 */
function attackJumpPhaseOne(boss) {
  if (boss.attackCount < 8) {
    boss.playAnimation(boss.ALERT_ANIMATION);
  }
}

/**
 * Phase 2 of the jump attack.
 * Plays the warning animation between frames 8 and 10.
 * Resets animation counter at frame 8.
 *
 * @param {object} boss - The boss instance.
 * @returns {void}
 */
function attackJumpPhaseTwo(boss) {
  if (boss.attackCount >= 8 && boss.attackCount <= 10) {
    if (boss.attackCount === 8) {
      boss.animationCount = 0;
    }
    boss.playAnimation(boss.BOSS_ATTACK_ALERT_ANIMATION);
  }
}

/**
 * Phase 3 of the jump attack.
 * Plays the jump animation from frame 11 onwards.
 * Triggers boss movement and plays attack sound.
 * Resets animation counter at frame 11.
 *
 * @param {object} boss - The boss instance.
 * @returns {void}
 */
function attackJumpPhaseThree(boss) {
  if (
    boss.attackCount >= 11 &&
    boss.attackCount <= boss.attackAnimationNr &&
    !boss.isDead()
  ) {
    if (boss.attackCount === 11) {
      boss.animationCount = 0;
    }
    boss.playAnimation(boss.BOSS_ATTACK_JUMP_ANIMATION);
    audio.playSound("bossAttacks");
    bossAttackMovement(boss);
  }
}

/**
 * Finalizes the jump attack.
 * Clears the interval and restarts the boss behavior cycles.
 * Triggered when the current frame exceeds the attack animation length.
 *
 * @param {object} boss - The boss instance.
 * @returns {void}
 */
function attackJumpReset(boss) {
  if (boss.attackCount > boss.attackAnimationNr) {
    boss.animationCount = 0;
    clearInterval(boss.jumpAttackInterval);
    boss.startBossIntervals();
  }
}

/**
 * Clears the jump attack interval and resumes the boss animation loop.
 *
 * @param {object} boss - The boss instance.
 * @returns {void}
 */
function clearJumpAttack(boss) {
  clearInterval(boss.jumpAttackInterval);
  boss.animate();
}

/**
 * Controls the jump attack movement of the boss.
 * Moves the boss horizontally depending on direction and applies vertical speed.
 *
 * @param {object} boss - The boss instance.
 * @returns {void}
 */
function bossAttackMovement(boss) {
  if (gamePaused) return;
  let count = 0;
  let interval;
  if (!boss.aboveGround()) {
    boss.speedY = 22;
    interval = setInterval(() => {
      if (gamePaused) return;
      if (count < 30) {
        if (boss.otherDirection) {
          boss.x = boss.x + 6;
        } else {
          boss.x = boss.x - 6;
        }
        count++;
      } else {
        clearInterval(interval);
      }
    }, 20);
  }
}
