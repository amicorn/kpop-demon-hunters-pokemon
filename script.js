/**
 * script.js - main game flow
 * Flow:
 *  - initial: "A wild DERPY TIGER appeared!" + opponent stats appear + "Meet DERPY TIGER" button
 *  - click Meet -> show player's stats + "What will HUNTRIX do?" with 4 buttons
 *  - click HUG -> hearts explosion on opponent, then show card popup (text above image + OPEN CARD)
 *  - click OPEN CARD -> bottom panel displays final birthday poem
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM nodes
    const promptText = document.getElementById('promptText');
    const buttons = document.getElementById('buttons');
    const opponent = document.getElementById('opponent');
    const player = document.getElementById('player');
    const opponentStats = document.getElementById('opponentStats');
    const playerStats = document.getElementById('playerStats');
    const heartsContainer = document.getElementById('hearts');
    const cardPopup = document.getElementById('cardPopup');
    const cardPopupContent = document.getElementById('cardPopupContent');
    const cardPopupImage = document.getElementById('cardPopupImage');
    const openCardPopupBtn = document.getElementById('openCardPopupBtn');

    // initial hidden states (use opacity so CSS transitions still work)
    opponentStats.style.opacity = '0';
    playerStats.style.opacity = '0';
    cardPopup.setAttribute('aria-hidden', 'false');

    // --- Entrance: sprites animate via CSS (animation on .sprite-opponent and .sprite-player)
    // Show initial text and the Meet button
    function showIntro() {
        promptText.textContent = 'A wild DERPY TIGER appeared!';
        buttons.innerHTML = `<button class="action-btn" id="meetBtn">Meet DERPY TIGER</button>`;

        // reveal both stats shortly (so they pop in together with the sprites)
        setTimeout(() => {
            const trans = 'opacity .28s ease, transform .36s cubic-bezier(.22,1,.36,1)';
            opponentStats.style.transition = trans;
            playerStats.style.transition = trans;

            opponentStats.style.opacity = '1';
            opponentStats.style.transform = 'translateY(0) scale(1)';
            opponentStats.setAttribute('aria-hidden', 'false');

            playerStats.style.opacity = '1';
            playerStats.style.transform = 'translateY(0) scale(1)';
            playerStats.setAttribute('aria-hidden', 'false');
        }, 700); // tweak this delay if you want them to appear earlier/later
    }


    // Show option buttons and reveal player stats
    function showOptions() {
        promptText.textContent = 'What will HUNTRIX do?';
        buttons.innerHTML = `
      <button class="action-btn" id="rapBtn">RAP BATTLE</button>
      <button class="action-btn" id="hugBtn">HUG</button>
      <button class="action-btn" id="singBtn">SLAY</button>
      <button class="action-btn" id="danceBtn">DANCE</button>
    `;


    }


    // Hearts explosion around opponent
    function spawnHearts(count = 30) {
        const rect = opponent.getBoundingClientRect();
        for (let i = 0; i < count; i++) {
            const h = document.createElement('div');
            h.className = 'heart';
            h.textContent = '💖';
            // randomize start near opponent area
            const offsetX = (Math.random() * rect.width) - (rect.width * 0.2);
            const startX = rect.left + rect.width / 2 + offsetX;
            const startY = rect.top + (Math.random() * rect.height * 0.6);
            h.style.left = `${startX}px`;
            h.style.top = `${startY}px`;

            // random scale and animation delay
            const scale = 0.8 + Math.random() * 0.8;
            h.style.transform = `scale(${scale})`;
            h.style.animationDelay = `${Math.random() * 300}ms`;
            heartsContainer.appendChild(h);

            // remove after animation ends
            setTimeout(() => {
                h.remove();
            }, 1400 + (Math.random() * 400));
        }
    }

    // Show card popup (text above image). This uses the existing DOM node cardPopup.
    function showCardPopup() {
        cardPopup.classList.remove("card-popup-hidden");
        cardPopup.classList.add("showing");
        cardPopup.setAttribute("aria-hidden", "false");

        // animate/show the content quickly
        setTimeout(() => {
            cardPopupContent.classList.add("visible");
        }, 60);
    }


    // Hide card popup
    function hideCardPopup() {
        cardPopupContent.classList.remove("visible");
        cardPopup.classList.remove("showing");
        cardPopup.classList.add("card-popup-hidden");
        cardPopup.setAttribute("aria-hidden", "true");
    }

    function showBirthdayCard() {
        const popup = document.getElementById('birthdayCardPopup');
        const text = document.getElementById('birthdayCardText');
        const image = document.getElementById('birthdayCardImage');

        image.src = 'assets/Hello_Friend_Birthday_Card_Resized.png';

        text.innerHTML = `
    <strong>💌 Happy Birthday!! 💌</strong><br><br>
    To my amazing roommate and best friend —<br>
    May your day be full of music, laughter, and tiny wild adventures.<br>
    You light up late-night ramen runs, shared playlists, and messy chore days.<br>
    Thank you for being brilliant, kind, and wonderfully you. 💖🎂
  `;

        const poemHTML = `
      <strong>DERPY tiger opens his mouth, revealing a special birthday card for you! 💌</strong><br><br>
      💖🎂
    `;
        // put poem in the left white area
        document.getElementById('promptText').innerHTML = poemHTML;

        popup.classList.remove('birthday-card-hidden');
        popup.setAttribute('aria-hidden', 'false');
    }

    // Close button
    document.getElementById('closeBirthdayCardBtn').addEventListener('click', () => {
        const popup = document.getElementById('birthdayCardPopup');
        popup.classList.add('birthday-card-hidden');
        popup.setAttribute('aria-hidden', 'true');
    });



    // Final poem shown in bottom panel after open
    function showFinalPoem() {
        const poemHTML = `
      <strong>💌 Happy Birthday!! 💌</strong><br><br>
      To my amazing roommate and best friend —<br>
      May your day be full of music, laughter, and tiny wild adventures.<br>
      You light up late-night ramen runs, shared playlists, and messy chore days.<br>
      Thank you for being brilliant, kind, and wonderfully you. 💖🎂
    `;
        // put poem in the left white area
        document.getElementById('promptText').innerHTML = poemHTML;
        // clear buttons
        document.getElementById('buttons').innerHTML = '';
    }

    // Event delegation for clicks
    document.addEventListener('click', (e) => {
        const id = e.target && e.target.id;

        if (id === 'meetBtn') {
            showOptions();
            return;
        }

        if (id === 'hugBtn') {
            // immediate hug feedback
            promptText.textContent = 'HUNTRIX hugs DERPY TIGER!';
            spawnHearts(30);

            // after short delay show card popup
            setTimeout(() => {
                showCardPopup();
            }, 900);

            return;
        }

        if (id === 'openCardPopupBtn') {
            // Hide popup, then show poem in bottom panel
            hideCardPopup();
            showBirthdayCard(); // show the final birthday card popup
            return;
        }

        // Example placeholders (not fleshed out)
        if (id === 'rapBtn') {
            promptText.textContent = 'HUNTRIX drops a sick beat!';
            spawnHearts(30);

            // after short delay show card popup
            setTimeout(() => {
                showCardPopup();
            }, 900);

            return;
            //   buttons.innerHTML = `<button class="action-btn" id="backToOptionsBtn">Continue</button>`;
        }

        if (id === 'singBtn') {
            promptText.textContent = 'HUNTRIX slays the real enemy: the flower pot that won\'t stay upright!';
            spawnHearts(30);

            // after short delay show card popup
            setTimeout(() => {
                showCardPopup();
            }, 900);

            return;
            //   buttons.innerHTML = `<button class="action-btn" id="backToOptionsBtn">Continue</button>`;
        }

        if (id === 'danceBtn') {
            promptText.textContent = 'HUNTRIX starts break dancing.';
            spawnHearts(30);

            // after short delay show card popup
            setTimeout(() => {
                showCardPopup();
            }, 900);

            return;
            //   buttons.innerHTML = `<button class="action-btn" id="backToOptionsBtn">Continue</button>`;
        }

        if (id === 'backToOptionsBtn') {
            showOptions();
            return;
        }
    });

    // initialize
    showIntro();

}); // DOMContentLoaded