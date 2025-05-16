const MAIN_URL =
  "https://el-pollo-loco-79444-default-rtdb.europe-west1.firebasedatabase.app/";

let highscores = {
  chickenrush: [

  ],
  normal: [

  ]
};

async function fetchHighscores() {
  try {
    let response = await fetch(MAIN_URL + '.json');
    if (!response.ok) {
        throw new Error();
    } else {
        let data = await response.json();
        if (data) {
        highscores = data;
        }
    }
  } catch (error) {
    console.log('Highscore fetch error: ' + error)
  }
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


