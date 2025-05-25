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

function toggleOptionMenu(getTemp, settingsMenu) {
      let ref = document.getElementById("canvas-option-container");
      let template = getTemp();
  if (sessionStorage.getItem('menu') === settingsMenu && !ref.classList.contains('d-none')) {
    ref.classList.add("d-none");
  } else {
    if (ref.classList.contains("d-none")) {
      showSingleContainerById("canvas-option-container");
      getTemplateToContent("canvas-option-container", template);
      sessionStorage.setItem('menu', settingsMenu);
    } else {
      getTemplateToContent("canvas-option-container", template);
      sessionStorage.setItem('menu', settingsMenu);
    }
  }
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

function toggleFullScreen(){
  let buttonRef = document.getElementById('full-screen-button');
  if (fullScreen) {
      buttonRef.classList.remove('full-screen-button');
     fullScreen = false;
  } else {
    fullScreen = true;
    buttonRef.classList.add('full-screen-button');
  }
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
     audio.playSoundClone('menuClick');
  }
}

function trimPlayerName(element) {
  element.value = element.value.trim();
}

function getSoundSettings() {
  sfxMute = localStorage.getItem("sfxMute") === "true";
  console.log(sfxMute);
  musicMute = localStorage.getItem("musicMute") === "true";
  console.log(musicMute);
  sfxVolume = localStorage.getItem("sfxVolume");
  musicVolume = localStorage.getItem("musicVolume");

  if (sfxMute === null) sfxMute = false;
  if (musicMute === null) musicMute = false;
  if (sfxVolume === null) sfxVolume = 7;
  if (musicVolume === null) musicVolume = 4;
}

function assignSoundSettings() {
  calculateVolumesForAssign();
  assignMuteAndVolume("sfx", sfxMute, sfxVolume);
  assignMuteAndVolume("music", musicMute, musicVolume);
}

function calculateVolumesForAssign() {
  sfxVolume === 10 ? (sfxVolume = 1) : (sfxVolume = sfxVolume / 10);
  musicVolume === 10 ? (musicVolume = 1) : (musicVolume = musicVolume / 10);
}

function assignMuteAndVolume(src, mute, vol) {
  Object.values(audio[src]).forEach((audio) => {
    checkArrayAndSetMuteAndVol(audio, mute, vol);
  });
}

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

function toggleSoundsOnOff() {
  sfxMute ? (sfxMute = false) : (sfxMute = true);
  console.log(sfxMute);
  assignMuteAndVolume("sfx", sfxMute, sfxVolume);
  localStorage.setItem("sfxMute", sfxMute.toString());
  initSoundSettings();
}

function toggleMusicOnOff() {
  musicMute ? (musicMute = false) : (musicMute = true);
  assignMuteAndVolume("music", musicMute, musicVolume);
  localStorage.setItem("musicMute", musicMute.toString());
  initSoundSettings();
}

function initSoundSettings() {
  let soundOnRef = document.getElementById("sound-on");
  let soundOffRef = document.getElementById("sound-off");
  let musicOnRef = document.getElementById("music-on");
  let musicOffRef = document.getElementById("music-off");
  let musicInputRef = document.getElementById("menu-music-vol");
  let sfxInputRef = document.getElementById("menu-sound-vol");
  if (sfxMute === false) {
    soundOnRef.classList.add("selected");
    soundOffRef.classList.remove("selected");
  } else {
    soundOnRef.classList.remove("selected");
    soundOffRef.classList.add("selected");
  }
  if (musicMute === false) {
    musicOnRef.classList.add("selected");
    musicOffRef.classList.remove("selected");
  } else {
    musicOnRef.classList.remove("selected");
    musicOffRef.classList.add("selected");
  }
  musicInputRef.value = musicVolume * 10;
  sfxInputRef.value = sfxVolume * 10;
  assignMuteAndVolume("sfx", sfxMute, sfxVolume);
  assignMuteAndVolume("music", musicMute, musicVolume);
}

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
