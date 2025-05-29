



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
  document.body.style.cursor = "url('./img/cursor-active.png'), auto"
}

function hideCursor(){
  document.body.style.cursor = "none";
}

function showActiveCursor(){
  document.body.style.cursor = "url('./img/cursor-active.png'), auto";
}