/**
 * script.js - main game flow with full sound support
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- DOM NODES ---
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

    // Static buttons
    const openCardBtn = document.getElementById('openCardPopupBtn');
    const returnToJinuBtn = document.getElementById('returnToJinuBtn');
    const closeDerpyCardBtn = document.getElementById('closeDerpyCardBtn');
    const birthdayCardPopup = document.getElementById('birthdayCardPopup');
    const closeBirthdayCardBtn = document.getElementById('closeBirthdayCardBtn');

    // --- INITIAL STATES ---
    opponentStats.style.opacity = '0';
    playerStats.style.opacity = '0';
    cardPopup.setAttribute('aria-hidden', 'true');

    // --- SOUNDS ---
    const sounds = {
        bgMusic: new Audio('assets/music/k-pop-pack.mp3'),
        heart: new Audio('assets/sfx/popping-bubbles.mp3'),
        cardUp: new Audio('assets/sfx/cute-cat.mp3'),
        cardDown: new Audio('assets/sfx/cat-meow-loud.mp3'),
        birthdayCard: new Audio('assets/music/sound-effect-twinklesparkle.mp3'),
        actionClick: new Audio('assets/sfx/sound-effect-twinklesparkle.mp3'),
        returnToJinu: new Audio('assets/sfx/pokemon-cry-parody.mp3'),
        playerHover: new Audio('assets/sfx/sound-effect-twinklesparkle.mp3'),
        opponentHover: new Audio('assets/sfx/cute-cat.mp3'),
        hoverSounds: {
            meetBtn: new Audio('assets/sfx/cat-meow-loud.mp3'),
            hugBtn: new Audio('assets/music/body-temperature.mp3'),
            rapBtn: new Audio('assets/music/hard-rap-beat.mp3'),
            singBtn: new Audio('assets/music/shine-babe-k-pop-music.mp3'),
            danceBtn: new Audio('assets/music/stupid-stars-k-pop-music.mp3'),
            openCardPopupBtn: new Audio('assets/sfx/weird-pikachu.mp3'),
            backToOptionsBtn: new Audio('assets/sfx/eevee-voice-clips.mp3')
        }
    };

    // --- BACKGROUND MUSIC ---
    sounds.bgMusic.loop = true;
    sounds.bgMusic.volume = 0.4;

    function stopAllExceptBg() {
        Object.values(sounds).forEach(s => {
            if (s instanceof Audio && s !== sounds.bgMusic) {
                s.pause();
                s.currentTime = 0;
            }
        });
        Object.values(sounds.hoverSounds).forEach(s => {
            s.pause();
            s.currentTime = 0;
        });
    }

    function playSound(audio) {
        if (!audio) return;
        stopAllExceptBg();
        audio.currentTime = 0;
        audio.play().catch(() => { });
    }

    // Auto-start background music on first interaction
    function resumeBgMusic() {
        if (sounds.bgMusic.paused) sounds.bgMusic.play().catch(() => { });
        document.removeEventListener('click', resumeBgMusic);
        document.removeEventListener('keydown', resumeBgMusic);
    }
    document.addEventListener('click', resumeBgMusic);
    document.addEventListener('keydown', resumeBgMusic);
    sounds.bgMusic.play().catch(() => { });

    // --- SPRITE HOVER ---
    if (player) player.addEventListener('mouseenter', () => { playSound(sounds.playerHover); wiggleSprite(player); });
    if (opponent) opponent.addEventListener('mouseenter', () => { playSound(sounds.opponentHover); wiggleSprite(opponent); });

    // --- GAME FLOW FUNCTIONS ---
    function showIntro() {
        promptText.textContent = 'A wild DERPY TIGER appeared!';
        buttons.innerHTML = `<button class="action-btn" id="meetBtn">Meet DERPY TIGER</button>`;

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
        }, 700);
    }


    function showOptions() {
        promptText.textContent = 'What will HUNTRIX do?';
        buttons.innerHTML = `
            <button class="action-btn" id="rapBtn">RAP BATTLE</button>
            <button class="action-btn" id="hugBtn">HUG</button>
            <button class="action-btn" id="singBtn">SLAY</button>
            <button class="action-btn" id="danceBtn">DANCE</button>
        `;
    }

    const actionTexts = {
        hugBtn: 'HUNTRIX hugs DERPY TIGER. Derpy is very happy and starts purring.',
        rapBtn: 'Mirror mirror on my phone, who\'s the baddest? YOU, hello! 💖🎤',
        singBtn: 'HUNTRIX slays the real enemy: the flower pot that won\'t stay upright!',
        danceBtn: 'Better sit down for the show \'cause HUNTRIX starts break dancing!'
    };

    // --- EVENT DELEGATION FOR DYNAMIC BUTTONS ---
    let hoverAudio = null;

    buttons.addEventListener('mouseover', e => {
        const id = e.target.id;
        if (!id) return;

        if (sounds.hoverSounds[id]) {
            hoverAudio = sounds.hoverSounds[id];
            hoverAudio.loop = true;
            hoverAudio.currentTime = 0;
            hoverAudio.play().catch(() => { });
        }
    });

    buttons.addEventListener('mouseout', e => {
        if (hoverAudio) {
            hoverAudio.pause();
            hoverAudio.currentTime = 0;
            hoverAudio = null;
        }
    });

    buttons.addEventListener('click', e => {
        const id = e.target.id;
        if (!id) return;

        if (['hugBtn', 'rapBtn', 'singBtn', 'danceBtn'].includes(id)) {
            promptText.textContent = actionTexts[id];
            wiggleSprite(player);
            wiggleSprite(opponent);
            spawnHearts(30);
            setTimeout(showCardPopup, 900);
            playSound(sounds.actionClick);
        }

        if (id === 'meetBtn') showOptions();
    });

    // --- HEARTS ---
    function spawnHearts(count = 30) {
        if (!opponent) return;
        const rect = opponent.getBoundingClientRect();
        for (let i = 0; i < count; i++) {
            const h = document.createElement('div');
            h.className = 'heart';
            h.textContent = '💖';
            const offsetX = (Math.random() * rect.width) - (rect.width * 0.2);
            const startX = rect.left + rect.width / 2 + offsetX;
            const startY = rect.top + (Math.random() * rect.height * 0.6);
            h.style.left = `${startX}px`;
            h.style.top = `${startY}px`;
            const scale = 0.8 + Math.random() * 0.8;
            h.style.transform = `scale(${scale})`;
            h.style.animationDelay = `${Math.random() * 300}ms`;
            heartsContainer.appendChild(h);

            playSound(sounds.heart);
            setTimeout(() => h.remove(), 1400 + Math.random() * 400);
        }
    }

    // --- CARD POPUPS ---
    function showCardPopup() {
        cardPopup.classList.remove('card-popup-hidden');
        cardPopup.classList.add('showing');
        cardPopup.setAttribute('aria-hidden', 'false');
        playSound(sounds.cardUp);
        setTimeout(() => cardPopupContent.classList.add('visible'), 60);
    }

    function hideCardPopup() {
        cardPopupContent.classList.remove('visible');
        cardPopup.classList.remove('showing');
        cardPopup.classList.add('card-popup-hidden');
        cardPopup.setAttribute('aria-hidden', 'true');
    }

    // Function to show birthday card with slide-up animation
function showBirthdayCard() {
    const birthdayCardText = document.getElementById('birthdayCardText');
    const birthdayCardImage = document.getElementById('birthdayCardImage');

    // Set initial state
    birthdayCardPopup.classList.remove('birthday-card-hidden');
    birthdayCardPopup.setAttribute('aria-hidden', 'false');
    birthdayCardText.style.opacity = '0';
    birthdayCardImage.style.opacity = '0';

    // Trigger slide-up animation
    const slideDuration = 1000;
    birthdayCardImage.style.animation = `card-slide-up ${slideDuration}ms cubic-bezier(.22,1,.36,1) forwards`;
    birthdayCardText.style.animation = `card-slide-up ${slideDuration}ms cubic-bezier(.22,1,.36,1) forwards`;

    playSound(sounds.birthdayCard);

    // Fade in text slightly after animation starts
    setTimeout(() => {
        birthdayCardText.style.opacity = '1';
    }, 60);

    // Set text and image content
    birthdayCardImage.src = 'assets/images/Hello_Friend_Birthday_Card_Resized.png';
    birthdayCardText.innerHTML = `
        <strong>💌Happy Birthday Clara!!💌</strong><br><br>
        My beautiful, brilliant, b-girling bestie - like Rumi/Zoey/Mira, you slay! <br>
        Derpy and I wish you a day filled with sugar, spice, and everything yay! 🥳 <br>
        Delivered via messenger tiger, your favourite grass-type 老虎 🐯, <br>
        Enjoy this custom kpop demon hunters x pokémon app I made just for you! <br><br>
        So much love, Amy xx 💖🎂
    `;
    promptText.innerHTML = `<strong>DERPY TIGER opens his mouth, revealing a special birthday card for YOU! 💌</strong><br><br>💖🎂🐯`;
}

// Close birthday card with slide-down animation
if (closeBirthdayCardBtn) closeBirthdayCardBtn.addEventListener('click', () => {
    const container = document.getElementById('birthdayCardContainer');
    const slideDuration = 1000;

    const birthdayCardImage = document.getElementById('birthdayCardImage');
    const birthdayCardText = document.getElementById('birthdayCardText');

    birthdayCardImage.style.animation = `card-slide-down ${slideDuration}ms cubic-bezier(.22,1,.36,1) forwards`;
    birthdayCardText.style.animation = `card-slide-down ${slideDuration}ms cubic-bezier(.22,1,.36,1) forwards`;

    playSound(sounds.cardDown);

    setTimeout(() => {
        birthdayCardPopup.classList.add('birthday-card-hidden');
        birthdayCardPopup.setAttribute('aria-hidden', 'true');

        // Reset animation for next open
        birthdayCardImage.style.animation = '';
        birthdayCardText.style.animation = '';
    }, slideDuration);
});

if (closeDerpyCardBtn) closeDerpyCardBtn.addEventListener('click', () => {
    const slideDuration = 1000;
    const fadeDuration = 1000;

    // Trigger animations
    cardPopupImage.style.animation = `card-slide-down ${slideDuration}ms cubic-bezier(.22,1,.36,1) forwards`;
    cardPopupContent.style.animation = `fade-out ${fadeDuration}ms forwards`;
    playSound(sounds.cardDown);

    // Wait for animation to finish before hiding
    const totalDuration = Math.max(slideDuration, fadeDuration);
    setTimeout(() => {
        cardPopup.classList.add('card-popup-hidden');
        cardPopup.setAttribute('aria-hidden', 'true');

        // Reset animation for next open
        cardPopupImage.style.animation = '';
        cardPopupContent.style.animation = '';
    }, totalDuration);
});


    if (openCardBtn) openCardBtn.addEventListener('click', () => {
        hideCardPopup();
        showBirthdayCard();
        playSound(sounds.actionClick);
    });

    if (openCardBtn) openCardBtn.addEventListener('mouseenter', () => {
        playSound(sounds.hoverSounds.openCardPopupBtn);
    });

    if (returnToJinuBtn) {
    returnToJinuBtn.addEventListener('click', () => {
        playSound(sounds.returnToJinu);

        // Trigger card-slide-down animation for the popup
        const slideDuration = 1500; // match your CSS animation duration
        const fadeDuration = 1000;

        cardPopupImage.style.animation = `card-slide-down ${slideDuration}ms cubic-bezier(.22,1,.36,1) forwards`;
        cardPopupContent.style.animation = `fade-out ${fadeDuration}ms forwards`;
        playSound(sounds.cardDown);

        // Wait for animation to finish before hiding completely
        const totalDuration = Math.max(slideDuration, fadeDuration);
        setTimeout(() => {
            cardPopup.classList.add('card-popup-hidden');
            cardPopup.setAttribute('aria-hidden', 'true');

            // Reset animation for next open
            cardPopupImage.style.animation = '';
            cardPopupContent.style.animation = '';

            // Also hide birthday card if open
            if (birthdayCardPopup) {
                birthdayCardPopup.classList.add('birthday-card-hidden');
                birthdayCardPopup.setAttribute('aria-hidden', 'true');
            }

            // Show menu options again
            showOptions();
        }, totalDuration);
    });

    returnToJinuBtn.addEventListener('mouseenter', () => {
        playSound(sounds.hoverSounds.backToOptionsBtn);
    });
}


    // --- WIGGLE SPRITE ---
    function wiggleSprite(el, duration = 800) {
        if (!el) return;
        let start = null;
        const keyframes = [0, 5, -5, 5, 0];
        const style = window.getComputedStyle(el);
        const matrix = new DOMMatrixReadOnly(style.transform);
        const translateX = matrix.m41;
        const translateY = matrix.m42;

        function step(timestamp) {
            if (!start) start = timestamp;
            const elapsed = timestamp - start;
            const frame = Math.floor(elapsed / duration * (keyframes.length - 1));
            const angle = keyframes[frame] || 0;
            el.style.transform = `translate(${translateX}px,${translateY}px) rotate(${angle}deg)`;
            if (elapsed < duration) requestAnimationFrame(step);
            else el.style.transform = `translate(${translateX}px,${translateY}px)`;
        }
        requestAnimationFrame(step);
    }

    // --- INITIALIZE ---
    showIntro();
});
