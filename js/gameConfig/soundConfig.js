/**
 * Starts playing menu music once on the first click anywhere on the document.
 */
document.addEventListener("click", () => {
  if (!playMusicOnStart) audio.playMusicLoop("menuMusic");
  playMusicOnStart = true;
});

/**
 * Gets the volume settings from the local storage.
 * Sets a standard volume to the audio files, if local storage is null.
 */
function getSoundSettings() {
  sfxMute = localStorage.getItem("sfxMute") === "true";
  musicMute = localStorage.getItem("musicMute") === "true";
  sfxVolume = localStorage.getItem("sfxVolume");
  musicVolume = localStorage.getItem("musicVolume");

  if (sfxVolume === null) sfxVolume = 7;
  if (musicVolume === null) musicVolume = 4;
}

/**
 * Applies the current volume and mute settings to all audio elements.
 *
 * First calculates the effective volume levels, then assigns the
 * mute state and volume values for both sound effects and music.
 */
function assignSoundSettings() {
  calculateVolumesForAssign();
  assignMuteAndVolume("sfx", sfxMute, sfxVolume);
  assignMuteAndVolume("music", musicMute, musicVolume);
}

/**
 * Calculaters the effective volume levels.
 */
function calculateVolumesForAssign() {
  sfxVolume === 10 ? (sfxVolume = 1) : (sfxVolume = sfxVolume / 10);
  musicVolume === 10 ? (musicVolume = 1) : (musicVolume = musicVolume / 10);
}

/**
 * Assigns the calculated volume to the specified audio elements in the audio object.
 *
 * @param {string} src - The category of the soundfiles - sfx or music.
 * @param {boolean} mute - A boolean to mute or unmute the audio elements.
 * @param {number} vol - The effective sound volume for the audio elements (0 - 1).
 */
function assignMuteAndVolume(src, mute, vol) {
  Object.values(audio[src]).forEach((audio) => {
    checkArrayAndSetMuteAndVol(audio, mute, vol);
  });
}

/**
 * An algorithm to itterate through the audio object and sets the effective volume and mute settings.
 *
 * @param {HTMLAudioElement|Array} audio - A single audio element or a nested array of audio elements.
 * @param {boolean} mute - A boolean to mute or unmute the audio elements.
 * @param {number} vol - The effective sound volume for the audio elements (0 - 1).
 */
function checkArrayAndSetMuteAndVol(audio, mute, vol) {
  if (Array.isArray(audio)) {
    audio.forEach((audio) => {
      checkArrayAndSetMuteAndVol(audio, mute, vol);
    });
  } else {
    audio.muted = mute;
    audio.volume = vol;
  }
}

/**
 * Toggles sound effects on or off and updates settings.
 */
function toggleSoundsOnOff() {
  sfxMute ? (sfxMute = false) : (sfxMute = true);
  console.log(sfxMute);
  assignMuteAndVolume("sfx", sfxMute, sfxVolume);
  localStorage.setItem("sfxMute", sfxMute.toString());
  initSoundSettings();
}

/**
 * Toggles music on or off and updates settings.
 */
function toggleMusicOnOff() {
  musicMute ? (musicMute = false) : (musicMute = true);
  assignMuteAndVolume("music", musicMute, musicVolume);
  localStorage.setItem("musicMute", musicMute.toString());
  initSoundSettings();
}

/**
 * Initializes the sound and music UI settings and applies volume/mute state.
 */
function initSoundSettings() {
  let musicInputRef = document.getElementById("menu-music-vol");
  let sfxInputRef = document.getElementById("menu-sound-vol");
  musicInputRef.value = musicVolume * 10;
  sfxInputRef.value = sfxVolume * 10;
  assignMuteAndVolume("sfx", sfxMute, sfxVolume);
  assignMuteAndVolume("music", musicMute, musicVolume);
  setSoundButton();
  setMusicButton();
}

/**
 * Handles the appearance of the sound button in settings.
 */
function setSoundButton(){
  let soundOnRef = document.getElementById("sound-on");
  let soundOffRef = document.getElementById("sound-off");
  if (sfxMute === false) {
    soundOnRef.classList.add("selected");
    soundOffRef.classList.remove("selected");
  } else {
    soundOnRef.classList.remove("selected");
    soundOffRef.classList.add("selected");
  }
}

function setMusicButton(){
  let musicOnRef = document.getElementById("music-on");
  let musicOffRef = document.getElementById("music-off");
    if (musicMute === false) {
    musicOnRef.classList.add("selected");
    musicOffRef.classList.remove("selected");
  } else {
    musicOnRef.classList.remove("selected");
    musicOffRef.classList.add("selected");
  }
}



/**
 * Sets the music and sound effects volume from the UI sliders and stores the values.
 */
function setVolume() {
  let musicInputRef = document.getElementById("menu-music-vol");
  musicVolume = musicInputRef.value;
  localStorage.setItem("musicVolume", musicVolume.toString());
  let sfxInputRef = document.getElementById("menu-sound-vol");
  sfxVolume = sfxInputRef.value;
  localStorage.setItem("sfxVolume", sfxVolume.toString());
  calculateVolumesForAssign();
  initSoundSettings();
}