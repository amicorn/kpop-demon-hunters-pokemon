# KPop Demon Hunters x Pokémon Dance Battle 💃🐯🎂💌

## Overview
Made this Pokémon battle x Kpop Demon Hunters game as a birthday gift for my wonderful friend. This project blends retro Nintendo Pokémon battle mechanics with characters & animals from the KPop Demon Hunters movie. :)

**Live Demo: https://amicorn.github.io/kpop-demon-hunters-pokemon/**

## Demo of opening sequence (game sneak peek)
<div align="center">
  <video src="https://github.com/user-attachments/assets/82fca369-e45a-4b7f-a867-84219b534234" width="100%" controls autoplay muted loop>
    Your browser does not support the video tag.
  </video>
</div>


## Game sequences & screenshots

| Game Phase | Screenshot | Dialogue / Interaction | User Options |
| :--- | :---: | :---: | :--- |
| **Wild Encounter** | <img src="screenshots/a%20wild%20derpy%20tiger%20appeared.png" width="600" alt="Start Screen"> | "A wild **DERPY TIGER** appeared!" | User can "Meet Derpy Tiger"
| **Battle Menu** | <img src="screenshots/what will huntrix do.png" width="600" alt="Menu"> | "What will **HUNTRIX** do?" | User can select: RAP BATTLE, HUG, SLAY, or DANCE buttons |
| **Secret Message** | <img src="screenshots/derpy has letter large.png" width="600" alt="Secret Message"> | "🎉 Surprise! **DERPY** has a secret message for you! 🎉 " | User can "Open Card" or "Return to Jinu" (Return to sender) |
| **Birthday Surprise** | <img src="screenshots/birthday%20card%20popup.png" width="600" alt="Birthday Card"> | "**DERPY TIGER** opens his mouth, revealing a special birthday card for YOU! 💌🎂🐯" | User can "Close" the letter popup and return to menu screen |

## Battle possibilities, each referencing the movie! ;)
| Battle Menu Option | Screenshot | Text |
| :--- | :---: | :--- |
| **RAP BATTLE** | <img src="screenshots/rap battle button message.png" width="600" alt="Start Screen"> | "Mirror mirror on my phone, who's the baddest? YOU, hello! 💖🎤" | 
| **HUG** | <img src="screenshots/bug button message.png" width="600" alt="Menu"> | "**HUNTRIX** hugs **DERPY TIGER**. Derpy is very happy and starts purring." | 
| **SLAY** | <img src="screenshots/slay button message.png" width="600" alt="Secret Message"> | "**HUNTRIX** slays the real enemy: the flower pot that won't stay upright!" |
| **DANCE** | <img src="screenshots/dance button message.png" width="600" alt="Birthday Card"> | "Better sit down for the show 'cause **HUNTRIX** starts break dancing!" |

## Screenshots
<img src="screenshots/kdh pokemon battle start screen.png" width="1000"> 

## Inspiration
My friend and I hosted a KPop Demon Hunters watch party and I know she likes the blue derpy tiger from the KDH movie, cats, and Pokémon. Her fav Pokémon are grass-type Pokémon. 
I imagine if Derpy Tiger from Kpop Demon Hunters were to be a Pokémon, he would be a grass-type, so perfect for my friend! Plus, he's a big blue cat, so I made him a player sprite in my game representing Saja Boys team, facing off against Huntrix. 

Decided to design this game like a retro nintendo Pokémon battle, which I feel would be in line with the spirit of the KPop Demon Hunters characters since they'd totally do dance battles and rap battles and fight with their spirit animals. 

## 🎭 Animations & retro Pokémon mechanics
I designed & coded this game inspiried by the "GameBoy Advance" era Pokémon aesthetic while integrating lore from the KPop Demon Hunters movie.

* **Battlefield slide-in:** Mimics the classic start of a Hoenn-region battle. The trainer and wild Pokémon slide onto the screen from opposite sides using CSS `transform` and `transition` triggered via JS.
* **Sprite wiggle:** Pokémon sprites "wiggle" when they perform a move. This is handled by a custom `wiggleSprite()` function using `requestAnimationFrame` to ensure rotation doesn't break the slide-in position.
* **Tactile UI:** Hovering over character logos triggers a scale enlargement (`scale(1.2)`), providing immediate visual feedback to the player.
* **Vertical popups:** The Derpy Tiger card pops up vertically, directly referencing the specific way Derpy appears to Rumi in the film.
* **Heart particle effect:** A dynamic DOM-injection system spawns 💖 particles at the opponent's coordinates with randomized drift and scale for successful interactions.

## 💻 Technical highlights
I made this to be a fun and creative project referencing pop culture (KPop Demon Hunters, Pokémon), using art and pop culture to bridge CS logic + engineering principles:

* **Modular Rendering Logic:** Separation of concerns between `renderer.js` (DOM construction) and `script.js` (state and event handling).
* **Event Delegation:** Instead of attaching listeners to every individual button, the game uses a single listener on the `buttons` container to efficiently manage clicks and hovers.
* **Safe Resource Loading:** Implements a `loadImageSafe` helper to verify asset existence before rendering, preventing "broken image" UI states.
* **Sophisticated Audio Engine:** Manages a multi-layered audio system that allows global BGM to persist while handling interruptible SFX and unique hover-audio loops.
* **Performance Optimization:** Animations leverage hardware-accelerated CSS properties (`transform` and `opacity`) rather than layout-triggering properties, maintaining a smooth 60fps.

  
### Pokemon Battle Menu Screen
For my battle menu screen design, 
<img src="screenshots/menu screen large.png" width="1000"> 


I referenced:
<img src="screenshots/pokemon battle reference img.png" width="1000"> 
Source: https://essentialsdocs.fandom.com/wiki/Battles

### A Wild Pokemon Has Appeared
For my wild encounter start screen design,
<img src="screenshots/start screen large.png" width="1000"> 


I referenced:
<img src="screenshots/a wild pokemon reference.png" width="1000"> 
Source: https://share.google/nRP5V15qSpUO9pIf4 (Youtube video: https://www.youtube.com/watch?v=8Ejk0q42hQQ)


## Assets
All art hand-drawn by Amy Ouyang, including:
- derpy tiger has a letter for you card
- birthday card
- huntrix player logo
- saja boys / tiger player logo
- derpy tiger pokemon sprite
- huntrix cloud sprite
- background
- & more

## Technical Features
- **Responsive Retro UI:** Built with CSS Flexbox/Grid and the `Press Start 2P` font.
- **Animations:** Sprite slide-ins and heart particle effects.
- **State Management:** Logic-driven battle text and HP updates via `renderer.js` and `script.js`.

## Quickstart Guide
To run this project locally, follow these steps:

### Option 1: Python Local Server
1. Clone the repository: `git clone https://github.com/amicorn/kpop-demon-hunters-pokemon.git`
2. Open your terminal in the project folder.
3. Run: `python3 -m http.server 8000`
4. Visit: `http://localhost:8000`

### Option 2: VS Code Live Server
1. Open the project folder in VS Code.
2. Right-click `index.html`.
3. Select **"Open with Live Server"**.
