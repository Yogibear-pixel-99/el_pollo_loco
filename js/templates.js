/**
 * Creates the HTMLElement for the story.
 *
 * @returns - The story template.
 */
function getStoryTemp() {
  return `<div class="story-text">
                <div class="flex-ctr-spbtw">
                <p>Welcome to the world of Pepe!</p>
                <img class="settings-close-button" onclick="hideSingleContainerById('canvas-option-container')" src="./img/icons/close-svgrepo-com.svg" alt="close-icon">
                </div>
                <p>Last night, there was a crumbling
                 voice in the air. The next morning,
                  Pepe woke up and heard... nothing.
                   The villagers were all gone. But
                    in the distance, a chicken could
                     be heard clucking. Pepe now moves
                      toward the sound of that chicken...
                </p>
                <p>
El Pollo Loco is a 2D jump 'n' run platformer. Collect ten coins to trigger the boss fight. Defeat the boss to finish the game.
            </p></div>`;
}

/**
 * Creates the HTMLElement for the controls.
 *
 * @returns - The controls template.
 */
function getControlsTemp() {
  return `<div class="controls-settings">
            <div class="flex-ctr-spbtw">
                <h2 class="controls-header">Control Pepe</h2>
                <img class="settings-close-button" onclick="hideSingleContainerById('canvas-option-container')" src="./img/icons/close-svgrepo-com.svg" alt="close-icon">
                </div>
                    <table>
                        <tr>
                            <th>Action</th>
                            <th>Key</th>
                        </tr>
                        <tr>
                            <td>Run left</td>
                            <td>Arrow left</td>
                        </tr>
                        <tr>
                            <td>Run right</td>
                            <td>Arrow right</td>
                        </tr>
                        <tr>
                            <td>Jump</td>
                            <td>Space</td>
                        </tr>
                        <tr>
                            <td>Shot bottle</td>
                            <td>Strg/Ctrl or D</td>
                        </tr>
                    </table>
                </div>`;
}

/**
 * Creates a HTML element to display the players score.
 * 
 * @param {Object} element - The player object with name and score.
 * @returns - A HTML template
 */
function highscoreTemp(element) {
  return `<div class="score-wrapper">
            <div class="highscore-player-name">${element.name}</div>
            <div class="score">${element.score}</div>          
          </div>`;
}

/**
 * Creates a HTML element to display the score board.
 * 
 * @param {Object} element - The score object with name and points.
 * @returns - A HTML template
 */
function getPointsTemp(element) {
  return `<div class="item-point-wrapper">
            <span class="item-name">${element[1].name}</span>
            <span class="item-points" id="${element[0]}">${element[1].points}</span>
          </div>
  `;
}

/**
 * Creates a HTML element for the sound settings.
 * 
 * @returns - A HTML template.
 */
function getSoundOptionsTemp() {
  return `<div class="sound-settings">
    
            <div class="sound-wrapper" onclick="">
                <div class="sound-text-wrapper" onclick="toggleSoundsOnOff(); audio.playSound('menuClick')">
                    <span>Sounds</span>
                    <span id="sound-on" class="not-selected">On</span>
                    <span>/</span>
                    <span id="sound-off" class="not-selected">Off</span>
                </div>
                <input id="menu-sound-vol" onchange="audio.playSound('menuClick')" oninput="setVolume()" type="range" value="5" min="1" max="10">
            </div>

            <div class="sound-wrapper" onclick="audio.playSound('menuClick')">
                <div class="sound-text-wrapper" onclick="toggleMusicOnOff()">
                    <span>Music</span>
                    <span id="music-on" class="not-selected">On</span>
                    <span>/</span>
                    <span id="music-off" class="not-selected">Off</span>
                </div>
                <input id="menu-music-vol" onchange="audio.playSound('menuClick')" oninput="setVolume()" type="range" value="5" min="1" max="10">
            </div>
        `;
}
