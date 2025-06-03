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
 * Delays the execution for a given number of milliseconds.
 *
 * @param {number} ms - The delay time in milliseconds.
 * @returns {Promise<void>} A promise that resolves after the delay.
 */
async function timeDelay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });
}

/**
 * Shows the custom cursor image.
 */
function showCursor() {
  document.body.style.cursor = "url('./img/cursor.png'), auto";
}

/**
 * Hides the cursor by setting it to "none".
 */
function hideCursor() {
  document.body.style.cursor = "none";
}

/**
 * Shows the active cursor image.
 */
function showActiveCursor() {
  document.body.style.cursor = "url('./img/cursor-active.png'), auto";
}

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
 * Checks if the screen height is smaller than the given value.
 *
 * @param {number} value - The height threshold to compare with.
 * @returns {boolean} True if screen height is smaller or equal.
 */
function screenHeightSmallerThan(value) {
  return window.innerHeight <= value;
}

/**
 * Checks if the screen width is smaller than the given value.
 *
 * @param {number} value - The width threshold to compare with.
 * @returns {boolean} True if screen width is smaller or equal.
 */
function screenWidthSmallerThan(value) {
  return window.innerWidth <= value;
}

/**
 * Determines if the screen is considered small based on width or height.
 *
 * @returns {boolean} True if either width or height is below the threshold.
 */
function isSmallScreen() {
  return screenHeightSmallerThan(830) || screenWidthSmallerThan(720);
}

/**
 * Replaces every input in the input field exept letters and numbers.
 *
 * @param {HTMLInputElement} id - The HTML input element to check.
 */
function returnOnlyLettersAndNumbers(id) {
  let regex = /[^\u00c4\u00e4\u00d6\u00f6\u00dc\u00fc\u00dfA-Za-z0-9\s+]/g;
  let userInput = id.value;
  userInput = userInput.replace(regex, "");
  id.value = userInput;
}

/**
 * Removes a CSS class from an element identified by id.
 * @param {string} id - The element's id.
 * @param {string} className - The CSS class to remove.
 */
function removeClass(id, className) {
  const ref = document.getElementById(id);
  ref.classList.remove(className);
}