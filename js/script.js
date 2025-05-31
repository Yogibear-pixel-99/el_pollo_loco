



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


async function timeDelay(ms){
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms)
  })
}

function showCursor(){
  document.body.style.cursor = "url('./img/cursor.png'), auto"
}

function hideCursor(){
  document.body.style.cursor = "none";
}

function showActiveCursor(){
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
 * This function shows a html container. It removes the class d-none.
 *
 * @param {string} containerId - The id of the HTML container.
 */
function showSingleContainerById(containerId) {
  let content = document.getElementById(containerId);
  content.classList.remove("d-none");
}

function screenHeightSmallerThan(value) {
  return window.innerHeight <= value;
}

function screenWidthSmallerThan(value) {
  return window.innerWidth <= value;
}

function isSmallScreen(){
  return screenHeightSmallerThan(830) || screenWidthSmallerThan(720);
}