

function getStoryTemp(){
    return `<div class="story-text">
    Welcome to the world of Pepe. Last night, there was a crumbling
            voice in the air. On the next morning, pepe woke up and
            heard...nothing. The villagers are all gone. but in the distance a
            chicken could be heard clucking. Pepe now moves on to that chicken
            sound... El pollo loco is a 2D jump n run platformer. Collect ten
            coins to trigger the bossfight. Kill the boss to finish the game.
            </div>`
}


function getControlsTemp(){

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



function toggleStory(){
    toggleSingleContainerById('canvas-option-container');
    getTemplateToContent('canvas-option-container', getStoryTemp());
}