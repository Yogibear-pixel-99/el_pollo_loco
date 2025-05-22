/**
 * This function hides a html container. It adds the class d-none.
 *
 * @param {string} containerId - The id of the HTML container.
 */
function toggleSingleContainerById(containerId) {
  let content = document.getElementById(containerId);
  content.classList.toggle("d-none");
}

/**
 * Gets a HTML template and renders it in an HTML element.
 *
 * @param {string} id - The id of the HTML element to render the template.
 * @param {HTMLElement} template - The HTML template.
 */
function getTemplateToContent(id, template) {
  let ref = document.getElementById(id);
  ref.innerHTML = template;
}

/**
 * This function shows a html container. It removes the class d-none.
 *
 * @param {string} containerId - The id of the HTML container.
 */
function showSingleContainerById(containerId) {
  let content = document.getElementById(containerId);
  content.classList.remove("d-none");
}

/**
 * This function hides a html container. It adds the class d-none.
 *
 * @param {string} containerId - The id of the HTML container.
 */
function hideSingleContainerById(containerId) {
  let content = document.getElementById(containerId);
  content.classList.add("d-none");
}

/**
 * Shows the settings HTMLElement and gets the story template.
 */
function toggleStory() {
  toggleSingleContainerById("canvas-option-container");
  getTemplateToContent("canvas-option-container", getStoryTemp());
}

/**
 * Shows the settingsHTMLElement and gets the controls template.
 */
function toggleControls() {
  toggleSingleContainerById("canvas-option-container");
  getTemplateToContent("canvas-option-container", getControlsTemp());
}

function toggleSounds() {
  toggleSingleContainerById("canvas-option-container");
  getTemplateToContent("canvas-option-container", getSoundOptionsTemp());
  initSoundSettings();
}

function returnOnlyLettersAndNumbers(id) {
  let regex = /[^\u00c4\u00e4\u00d6\u00f6\u00dc\u00fc\u00dfA-Za-z0-9\s+]/g;
  let userInput = id.value;
  userInput = userInput.replace(regex, "");
  id.value = userInput;
}

function unblurInput(event, element) {
  if (event.key === "Enter") {
    element.blur();
  }
}

function trimPlayerName(element) {
  element.value = element.value.trim();
}

function getSoundSettings() {
  soundMute = localStorage.getItem("soundMute") === "true";
  console.log(soundMute);
  musicMute = localStorage.getItem("musicMute") === "true";
  console.log(musicMute);
  sfxVolume = localStorage.getItem("sfxVolume");
  musicVolume = localStorage.getItem("musicVolume");

  if (soundMute === null) soundMute = false;
  if (musicMute === null) musicMute = false;
  if (sfxVolume === null) sfxVolume = 5;
  if (musicVolume === null) musicVolume = 8;
}

function assignSoundSettings() {
  calculateVolumesForAssign();
  assignVolume("sfx", sfxVolume);
  assignVolume("music", musicVolume);
  assignMute("sfx", soundMute);
  assignMute("music", musicMute);
}

function calculateVolumesForAssign() {
  sfxVolume === 10 ? (sfxVolume = 1) : (sfxVolume = sfxVolume / 10);
  musicVolume === 10 ? (musicVolume = 1) : (musicVolume = musicVolume / 10);
}

function assignVolume(src, vol) {
  Object.values(audio[src]).forEach((audio) => {
    checkArrayAndSetVol(audio, vol);
  });
}

function checkArrayAndSetVol(audio, vol) {
  if (Array.isArray(audio)) {
    audio.forEach((audio) => {
      checkArrayAndSetVol(audio, vol);
    });
  } else {
    audio.volume = vol;
  }
}

function assignMute(src, mute) {
  Object.values(audio[src]).forEach((audio) => {
    checkArrayAndSetMute(audio, mute);
  });
}

function checkArrayAndSetMute(audio, mute) {
  if (Array.isArray(audio)) {
    audio.forEach((audio) => {
      checkArrayAndSetMute(audio, mute);
    });
  } else {
    audio.muted = mute;
  }
}





function toggleSoundsOnOff() {
  soundMute ? soundMute = false : soundMute = true;
  console.log(soundMute);
  assignMute("sfx", soundMute);
  localStorage.setItem('soundMute', soundMute.toString());
  initSoundSettings();
}

function toggleMusicOnOff() {
    musicMute ? musicMute = false : musicMute = true;
  assignMute("music", musicMute);
  localStorage.setItem('musicMute', musicMute.toString());
  initSoundSettings();
}
// function toggleSoundsOnOff() {
//   let onRef = document.getElementById("sound-on");
//   let offRef = document.getElementById("sound-off");
//   onRef.classList.toggle("selected");
//   onRef.classList.toggle("not-selected");
//   offRef.classList.toggle("selected");
//   offRef.classList.toggle("not-selected");
//   onRef.classList.contains("selected")
//     ? (soundMute = false)
//     : (soundMute = true);
//   assignMute("sfx", soundMute);
//   localStorage.setItem('soundMute', soundMute.toString());
// }

// function toggleMusicOnOff() {
//   let onRef = document.getElementById("music-on");
//   let offRef = document.getElementById("music-off");
//   onRef.classList.toggle("selected");
//   onRef.classList.toggle("not-selected");
//   offRef.classList.toggle("selected");
//   offRef.classList.toggle("not-selected");
//   onRef.classList.contains("selected")
//     ? (musicMute = false)
//     : (musicMute = true);
//   assignMute("music", musicMute);
//   localStorage.setItem('musicMute', musicMute.toString());
// }

function initSoundSettings() {
  let soundOnRef = document.getElementById("sound-on");
  let soundOffRef = document.getElementById("sound-off");
  let musicOnRef = document.getElementById("music-on");
  let musicOffRef = document.getElementById("music-off");
  if (soundMute === false) {
    soundOnRef.classList.add('selected');
    soundOffRef.classList.remove('selected');
  } else {
        soundOnRef.classList.remove('selected');
    soundOffRef.classList.add('selected');
  }
  if (musicMute === false) {
    musicOnRef.classList.add('selected');
    musicOffRef.classList.remove('selected');
  } else {
        musicOnRef.classList.remove('selected');
    musicOffRef.classList.add('selected');
  }
    assignMute("sfx", soundMute);
      assignMute("music", musicMute);
}



// get sound setings from local

// if not data
// set volume to 50
// on sfx
// on music
// set sound/music to on
// on sfx
// on music
// set sound text on to bold
// on sfx
// on music
// set sound range to 50
// on sfx
// on music

// start GAME

// get sound settings
// get sound voume
// set soundVolume
// set sound settings to settings container if open
