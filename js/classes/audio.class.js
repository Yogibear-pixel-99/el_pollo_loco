/**
 * The music and sound object for the game.
 * Separated in sfx for sounds and music for the game music.
 * Handels the volume, pause, loop and clone of the audio files.
 */
class Audiofiles {
  sfx = {
    menuClick: new Audio("./audio/menu/toggle-button-off-166328.mp3"),
    menuError: new Audio("./audio/menu/guitar-apoggiatura2_16b-41545.mp3"),

    cluckern: new Audio("./audio/level/environment/chicken-chatter-33515.mp3"),
    bottleBreak: [
      new Audio("./audio/items/bottles/bottle-break-39916.mp3"),
      new Audio("./audio/items/bottles/broken-beer-bottle-311131.mp3"),
      new Audio("./audio/items/bottles/glass-bottle-smash-277554.mp3"),
    ],

    bottleThrow: [
      new Audio("./audio/items/bottles/movement-swipe-whoosh-1-186575.mp3"),
      new Audio("./audio/items/bottles/movement-swipe-whoosh-3-186577.mp3"),
    ],

    deadChicken: [
      new Audio("./audio/chicken/chicken-noise-196746.mp3"),
      new Audio("./audio/chicken/chicken-single-alarm-call-6056.mp3"),
      new Audio("./audio/chicken/chicken-noise-228106.mp3"),
    ],

    chickenRun: new Audio("./audio/chicken/chicken-noise-196746.mp3"),

    gameWon: new Audio("./audio/level/won_lost/level-win-6416.mp3"),
    gameLost: new Audio("./audio/level/won_lost/fail-234710.mp3"),

    pepeLanding: new Audio("./audio/pepe/land-81509.mp3"),
    pepeWalk: new Audio("./audio/pepe/walking-sound-effect-272246.mp3"),
    pepeJump: new Audio("./audio/pepe/sound_jump-90516.mp3"),
    pepeIdle: new Audio("./audio/pepe/yawn-with-end-38154.mp3"),
    pepeLongIdle: new Audio(
      "./audio/pepe/labored-breathing-sleeping-73258.mp3"
    ),
    pepeHurt: new Audio("./audio/pepe/young-man-being-hurt-95628.mp3"),

    collectCoin: new Audio(
      "./audio/items/coins/coin-collision-sound-342335.mp3"
    ),

    gameAmbience: new Audio(
      "./audio/level/semi-desert-insects-ravens-birds-quiet-with-bad-mic-noise-badlands-ab-190818-7028.mp3"
    ),

    collectBottle: [
      new Audio("./audio/items/bottles/glass-bottle-clink-90671.mp3"),
      new Audio("./audio/items/bottles/glass-clink-6-188126.mp3"),
    ],
    bottleHeal: new Audio("./audio/pepe/health-pickup-6860.mp3"),

    bossHitted: new Audio("./audio/boss/lighting-a-fire-14421.mp3"),
    bossCrys: new Audio("./audio/boss/gatre-101240.mp3"),
    bossDied: new Audio("./audio/boss/rooster-crow-1-281011.mp3"),
    bossAttacks: new Audio("./audio/boss/chicken-laying-an-egg-330874.mp3"),
    bossIsTriggerd: new Audio("./audio/boss/rooster-crowing-80258.mp3"),
  };

  music = {
    bossIsTriggerd: new Audio(),

    menuMusic: new Audio(
      "./audio/menu/mexican-music-latin-guitar-mexico-mariachi-background-intro-theme-328253.mp3"
    ),
    normalModeMusic: new Audio("./audio/level/little-village-251736.mp3"),
    chickenRushMusic: new Audio("./audio/level/fiesta-forever-165168.mp3"),
  };

  constructor() {}

  /**
   * Plays a random audio object from the sfx object.
   *
   * @param {Array} objSrc The audio array name.
   */
  playRandomSound(objSrc) {
    let rnd = Math.floor(Math.random() * this.sfx[objSrc].length);
    let sound = this.sfx[objSrc][rnd].cloneNode();
    sound.muted = sfxMute;
    sound.volume = sfxVolume;
    sound.play();
  }

  /**
   * Plays a sound clone of the audio object.
   *
   * @param {string} objSrc The audio name.
   */
  playSound(objSrc) {
    this.sfx[objSrc].play();
  }

  /**
   * Plays a sound clone of the audio object.
   *
   * @param {string} objSrc The audio name.
   */
  playSoundClone(objSrc) {
    let sound = this.sfx[objSrc].cloneNode();
    sound.muted = sfxMute;
    sound.volume = sfxVolume;
    sound.play();
  }

  pauseSound(objSrc) {
    this.sfx[objSrc].pause();
  }

  /**
   * Plays the audio object in a loop.
   *
   * @param {string} objSrc The audio name.
   */
  playMusicLoop(objSrc) {
    this.music[objSrc].loop = true;
    this.music[objSrc].play();
  }

  /**
   * Plays the audio object in a loop.
   *
   * @param {string} objSrc The audio name.
   */
  playSoundLoop(objSrc) {
    this.sfx[objSrc].loop = true;
    this.sfx[objSrc].play();
  }

  /**
   * Pause the audio object.
   *
   * @param {string} objSrc The audio name.
   */
  pauseMusic(objSrc) {
    this.music[objSrc].pause();
  }

  /**
   * Set the current play time of the audio object to zero.
   *
   * @param {string} objSrc The audio name.
   */
  resetMusic(objSrc) {
    this.music[objSrc].currentTime = 0;
  }

  /**
   * Plays the appropriate end game audio depending on win/loss.
   */
  playEndAudio() {
    if (world.gameWon) {
      this.playSound("gameWon");
    } else {
      console.trace();
      this.playSound("gameLost");
    }
  }

  /**
   * Stops all game-related music and sounds.
   */
  stopGameMusic() {
    this.pauseMusic("chickenRushMusic");
    this.pauseMusic("normalModeMusic");
    this.pauseSound("cluckern");
    this.pauseSound("gameAmbience");
  }

  /**
   * Plays or pauses the clucker sound based on proximity of enemies.
   */
  checkCluckerSound() {
    const enemyNear = world.level.enemies.some((enemy) => {
      return (
        enemy.x > world.character.x - 200 && enemy.x < world.character.x + 450
      );
    });

    if (enemyNear) {
      this.playSound("cluckern");
    } else {
      this.pauseSound("cluckern");
    }
  }
}
