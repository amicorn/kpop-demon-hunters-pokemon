document.addEventListener("DOMContentLoaded", () => {
  const promptText = document.getElementById("promptText");
  const buttons = document.getElementById("buttons");
  const hearts = document.getElementById("hearts");
  const surpriseModal = document.getElementById("surpriseModal");
  const openCardBtn = document.getElementById("openCardBtn");
  const finalCard = document.getElementById("finalCard");

  // Start: show intro
  promptText.textContent = "A wild DERPY TIGER appeared!";
  buttons.innerHTML = `<button class="action-btn" id="meetBtn">Meet DERPY TIGER</button>`;

  // Step 1: Meet button
  document.addEventListener("click", (e) => {
    if (e.target.id === "meetBtn") {
      promptText.textContent = "What will RUMI do?";
      buttons.innerHTML = `
        <button class="action-btn" id="rapBtn">RAP BATTLE</button>
        <button class="action-btn" id="hugBtn">HUG</button>
        <button class="action-btn" id="singBtn">SING</button>
        <button class="action-btn" id="danceBtn">DANCE</button>
      `;
    }

    // Step 2: Hug button triggers hearts
    if (e.target.id === "hugBtn") {
      promptText.textContent = "RUMI hugs DERPY TIGER!";
      spawnHearts();

      setTimeout(() => {
        surpriseModal.style.display = "grid";
      }, 1200);
    }

    // Step 3: Open card button
    if (e.target.id === "openCardBtn") {
      surpriseModal.style.display = "none";
      finalCard.style.display = "grid";
    }
  });

  function spawnHearts() {
    for (let i = 0; i < 12; i++) {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.textContent = "💖";
      heart.style.left = 50 + (Math.random() * 80 - 40) + "%";
      heart.style.top = "40%";
      hearts.appendChild(heart);

      setTimeout(() => heart.remove(), 900);
    }
  }
});
