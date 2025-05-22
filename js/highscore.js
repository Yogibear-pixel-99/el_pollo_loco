

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
    points: -50,
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