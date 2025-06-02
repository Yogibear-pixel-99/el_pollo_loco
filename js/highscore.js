/**
 * Fetches, sorts, trims, and renders the active highscores for the current game mode.
 * Runs asynchronously and ensures the highscores stay within the displayable limit.
 */
async function getActiveHighscores() {
  await fetchHighscores();
  sortHighscores();
  deleteIfMoreThan100Scores();
  renderHighscores();
}

/**
 * Trims the highscore list to a maximum of 30 entries for the current game mode.
 * If trimming occurs, the updated scores are sent to the API.
 * @returns {Promise<void>}
 */
async function deleteIfMoreThan100Scores() {
  let longer = false;
  if (highscores[gameMode]?.length > 30) {
    highscores[gameMode].splice(30);
    longer = true;
  }
  if (longer) await putHighscoreToApi();
}

/**
 * Fetches highscore data from the Firebase backend based on the current game mode.
 * Stores the fetched scores in the global `highscores` object.
 * @returns {Promise<void>}
 */
async function fetchHighscores() {
  try {
    let response = await fetch(MAIN_URL + gameMode + '/.json');
    if (!response.ok) {
      throw new Error();
    } else {
      let data = await response.json();
      if (data) {
        highscores[gameMode] = Object.values(data);
      }
    }
  } catch (error) {
    console.log('Highscore fetch error: ' + error);
  }
}

/**
 * Sends the current highscore list for the current game mode to the Firebase API via PUT.
 * Overwrites the existing highscore data for that mode.
 * @returns {Promise<void>}
 */
async function putHighscoreToApi() {
  try {
    let response = await fetch(MAIN_URL + gameMode + "/.json", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(highscores[gameMode]),
    });
    if (!response.ok) {
      throw new Error();
    }
  } catch (error) {
    console.log(error);
  }
}

/**
 * Saves the current player score to the Firebase API and refreshes the highscore list.
 * @returns {Promise<void>}
 */
async function saveScore() {
  let scoreRef = document.getElementById('player-score');
  let playerNameRef = document.getElementById('player-name-input');
  let payload = {
    name: playerNameRef.value,
    score: scoreRef.innerText,
  };
  await saveHighscoreToApi(payload);
  await getActiveHighscores();
}

/**
 * Sends a new highscore entry to the Firebase API via POST.
 * @param {{name: string, score: number|string}} payload - Object containing player name and score.
 * @returns {Promise<void>}
 */
async function saveHighscoreToApi(payload) {
  try {
    let response = await fetch(MAIN_URL + gameMode + "/.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error();
    }
  } catch (error) {
    console.log(error);
  }
}

/**
 * Sorts the highscore arrays for each game mode in descending order based on score.
 */
function sortHighscores() {
  highscores?.normal?.sort((a, b) => b.score - a.score);
  highscores?.hard?.sort((a, b) => b.score - a.score);
  highscores?.chickenRush?.sort((a, b) => b.score - a.score);
}

/**
 * Renders the highscores for the current game mode into the DOM.
 * Displays a maximum of 30 scores.
 */
function renderHighscores() {
  let ref = document.getElementById("highscore");
  let data = "";
  for (
    let index = 0;
    index < highscores[gameMode]?.length && index <= 30;
    index++
  ) {
    const element = highscores[gameMode][index];
    data += highscoreTemp(element, index);
  }
  ref.innerHTML = data;
}

/**
 * Configuration object for score values assigned to various game actions.
 * @typedef {Object} pointConfig
 */
const pointConfig = {
  chickenJumpKill: {
    name: "chicken jump",
    points: 10,
  },
  chickenBottleHit: {
    name: "chicken bottle hit",
    points: 20,
  },
  miniChickenJumpKill: {
    name: "mini chicken jump",
    points: 30,
  },
  miniChickenBottleHit: {
    name: "mini chicken bottle hit",
    points: 40,
  },
  collectCoin: {
    name: "collect coin",
    points: 10,
  },
  collectBottle: {
    name: "collect bottle",
    points: 5,
  },
  bottleMissed: {
    name: "bottle missed",
    points: -30,
  },
  endbossBottleHit: {
    name: "endboss hit",
    points: 50,
  },
  endbossKilled: {
    name: "endboss killed",
    points: 200,
  },
};
