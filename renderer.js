document.addEventListener("DOMContentLoaded", () => {
  const textBox = document.getElementById("text-box");
  const opponentSprite = document.getElementById("opponent-sprite");
  const playerSprite = document.getElementById("player-sprite");
  const opponentStats = document.getElementById("opponent-stats");
  const playerStats = document.getElementById("player-stats");

  function startBattle() {
    // Animate sprites
    opponentSprite.classList.add("slide-in-opponent");
    playerSprite.classList.add("slide-in-player");

    // First message
    textBox.innerHTML = `<p>A wild DERPY TIGER appeared!</p>
      <button id="meet-btn">Meet DERPY TIGER</button>`;

    // Show opponent stats after slide
    setTimeout(() => { opponentStats.style.opacity = "1"; }, 2000);

    // Button action
    textBox.addEventListener("click", (e) => {
      if (e.target.id === "meet-btn") {
        showOptions();
      }
    });
  }

  function showOptions() {
    playerStats.style.opacity = "1";

    textBox.innerHTML = `<p>What will RUMI do?</p>
      <div class="options">
        <button id="rap-btn">RAP BATTLE</button>
        <button id="hug-btn">HUG</button>
        <button id="sing-btn">SING</button>
        <button id="dance-btn">DANCE</button>
      </div>`;
  }

  textBox.addEventListener("click", (e) => {
    if (e.target.id === "hug-btn") {
      triggerHug();
    }
  });

  function triggerHug() {
    opponentSprite.classList.add("hearts");

    const popup = document.createElement("div");
    popup.className = "popup";
    popup.innerHTML = `
      <p>🎉 Surprise! DERPY has a secret message for you! 🎉</p>
      <button id="open-card">OPEN CARD</button>
    `;
    document.body.appendChild(popup);

    popup.addEventListener("click", (e) => {
      if (e.target.id === "open-card") {
        showBirthdayCard(popup);
      }
    });
  }

  function showBirthdayCard(popup) {
    popup.innerHTML = `
      <p>💌 Happy Birthday!! 💌</p>
      <p>To my amazing roommate and best friend,<br>
      May your day be full of joy, laughter, and cake.<br>
      Thanks for being wonderful. 💕</p>
    `;
  }

  startBattle();
});
