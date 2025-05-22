

async function getActiveHighscores() {
  await fetchHighscores();
  sortHighscores();
  renderHighscores();
}


async function deleteIfMoreThan100Scores(){
  let longer = false;
    if (highscores[gameMode]?.length > 10) {
      highscores[gameMode].splice(10);
      checkPost = true;
    }
  if (longer) await patchHighscoreToApi();
}


async function patchHighscoreToApi(){
    try {
    let response = await fetch(MAIN_URL + gameMode + "/.json", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(highscores[gameMode]),
    }
    );
    if (!response.ok) {
      throw new Error();
    }
  } catch (error) {
    console.log(error);
  }
}


async function saveScore(){
  let scoreRef = document.getElementById('player-score');
  let playerNameRef = document.getElementById('player-name-input');
  let payload = {
    name: playerNameRef.value,
    score: scoreRef.innerText
  }
  await saveHighscoreToApi(payload);
  await getActiveHighscores();
}

async function saveHighscoreToApi(payload){
  try {
    let response = await fetch(MAIN_URL + gameMode + "/.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
    );
    if (!response.ok) {
      throw new Error();
    }
  } catch (error) {
    console.log(error);
  }
}

function sortHighscores() {
  highscores?.normal?.sort((a, b) => b.score - a.score);
  highscores?.hard?.sort((a, b) => b.score - a.score);
  highscores?.chickenRush?.sort((a, b) => b.score - a.score);
}

function renderHighscores() {
  let ref = document.getElementById("highscore");
  let data = "";
  for (
    let index = 0;
    index < highscores[gameMode]?.length && index <= 30;
    index++
  ) {
    const element = highscores[gameMode][index];
    data += highscoreTemp(element);
  }
  ref.innerHTML = data;
}






// on load get and render normal - check if more than 100
// on switch get and render switched - check if more than 100
// on game end save score, get and render active on - check if more than 100