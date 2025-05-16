
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
  showSingleContainerById("canvas-option-container");
  getTemplateToContent("canvas-option-container", getStoryTemp());
}

/**
 * Shows the settingsHTMLElement and gets the controls template.
 */
function toggleControls() {
  showSingleContainerById("canvas-option-container");
  getTemplateToContent("canvas-option-container", getControlsTemp());
}


function returnOnlyLettersAndNumbers (id){
    let regex = /[^\u00c4\u00e4\u00d6\u00f6\u00dc\u00fc\u00dfA-Za-z0-9\s+]/g;
    let userInput = id.value;
        userInput = userInput.replace(regex, '');
    id.value = userInput;
}

function unblurInput(event, element) {
    if (event.key === 'Enter') {
        element.blur();
    }
}

function trimPlayerName(element) {
    element.value = element.value.trim();
}