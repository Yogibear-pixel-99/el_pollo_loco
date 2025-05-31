/**
 * Creates the HTMLElement for the story.
 *
 * @returns - The story template.
 */
function getStoryTemp() {
  return `<div class="story-text">
                <div class="flex-ctr-spbtw">
                <p>Welcome to the world of Pepe!</p>
                <img class="settings-close-button" onclick="closeSettings()" src="./img/icons/close-svgrepo-com.svg" alt="close-icon">
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
                <img class="settings-close-button" onclick="closeSettings()" src="./img/icons/close-svgrepo-com.svg" alt="close-icon">
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
function highscoreTemp(element, index) {
  return `<div class="score-wrapper">
            <div class="highscore-player-name"><span>${index + 1}. </span>${element.name}</div>
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
            <img class="settings-close-button" onclick="closeSettings()" src="./img/icons/close-svgrepo-com.svg" alt="close-icon">
            <div class="sound-wrapper" onclick="">
                <div class="sound-text-wrapper" onclick="toggleSoundsOnOff(); audio.playSoundClone('menuClick')">
                    <span>Sounds</span>
                    <span id="sound-on" class="not-selected">On</span>
                    <span>/</span>
                    <span id="sound-off" class="not-selected">Off</span>
                </div>
                <input id="menu-sound-vol" onchange="audio.playSoundClone('menuClick')" oninput="setVolume()" type="range" value="5" min="1" max="10">
            </div>

            <div class="sound-wrapper" onclick="audio.playSoundClone('menuClick')">
                <div class="sound-text-wrapper" onclick="toggleMusicOnOff()">
                    <span>Music</span>
                    <span id="music-on" class="not-selected">On</span>
                    <span>/</span>
                    <span id="music-off" class="not-selected">Off</span>
                </div>
                <input id="menu-music-vol" onchange="audio.playSoundClone('menuClick')" oninput="setVolume()" type="range" value="5" min="1" max="10">
            </div>
        `;
}

/**
 * Creates a HTML element for the loading spinner.
 * 
 * @returns - A HTML template.
 */
function getLoadingSpinnerTemp(){
    return `<div class="loading-spinner-container flex-ctr-ctr flex-col">
                <img src="./img/icons/graphic-3578420_1280.png" alt="loading spinner">
                <span>. . . loading . . .</span>
            </div>
            `
}

/**
 * Creates a HTML element for the impressum.
 * 
 * @returns - A HTML template.
 */
function getImpressumTemp(){
    return `<div class="impressum-wrapper">
            <img class="settings-close-button impressum-close" onclick="closeSettings()" src="./img/icons/close-svgrepo-com.svg" alt="close-icon">
    <h4>Impressum</h4><p><b>Informationen und Offenlegung gemäß &sect;5 (1) ECG, &sect; 25 MedienG, &sect; 63 GewO und &sect; 14 UGB</b></p> <p><b>Webseitenbetreiber:</b> Joachim Puercher</p>
<p><b>Anschrift:</b> Schöneringer Straße 12e, 407, 4073 Wilhering</p>
<p><b>UID-Nr:</b>  <br> <b>Gewerbeaufsichtbehörde:</b>  <br> <b>Mitgliedschaften:</b></p>
<p><b>Kontaktdaten:</b> <br> Telefon: 06767704199 <br> Email: joachim.puercher@gmail.com <br> Fax: </p>

<p><b>Anwendbare Rechtsvorschrift:</b> www.ris.bka.gv.at <br> <b>Berufsbezeichnung:</b> </p>
<p><b>Online Streitbeilegung:</b> Verbraucher, welche in Österreich oder in einem sonstigen Vertragsstaat der ODR-VO niedergelassen sind, haben die Möglichkeit Probleme bezüglich dem entgeltlichen Kauf von Waren oder Dienstleistungen im Rahmen einer Online-Streitbeilegung (nach OS, AStG) zu lösen. Die Europäische Kommission stellt eine Plattform hierfür bereit: https://ec.europa.eu/consumers/odr</p>
<p><b>Urheberrecht:</b> Die Inhalte dieser Webseite unterliegen, soweit dies rechtlich möglich ist, diversen Schutzrechten (z.B dem Urheberrecht). Jegliche Verwendung/Verbreitung von bereitgestelltem Material, welche urheberrechtlich untersagt ist, bedarf schriftlicher Zustimmung des Webseitenbetreibers.</p><p><b>Haftungsausschluss:</b> Trotz sorgfältiger inhaltlicher Kontrolle übernimmt der Webseitenbetreiber dieser Webseite keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich. Sollten Sie dennoch auf ausgehende Links aufmerksam werden, welche auf eine Webseite mit rechtswidriger Tätigkeit/Information verweisen, ersuchen wir um dementsprechenden Hinweis, um diese nach § 17 Abs. 2 ECG umgehend zu entfernen.<br>Die Urheberrechte Dritter werden vom Betreiber dieser Webseite mit größter Sorgfalt beachtet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden derartiger Rechtsverletzungen werden wir den betroffenen Inhalt umgehend entfernen.</p>
<p>Quelle: <b><a href="https://www.fairesrecht.at/kostenlos-impressum-erstellen-generator.php">Impressum Generator Österreich</a></b></p>
</div>`
}

