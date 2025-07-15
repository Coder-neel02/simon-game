// ===================
// Initialization
// ===================
let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;
let highScore = 0;

let h2 = document.querySelector("h2");
let scoreBoard = document.querySelector("#score");
let highScoreBoard = document.querySelector("#highscore");
let restartBtn = document.querySelector("#restart");

// ===================
// Sound Effects
// ===================
function playSound(color) {
    let audio = new Audio(`sounds/${color}.mp3`);
    audio.play();
}

// ===================
// Button Flash
// ===================
function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 250);
}

// ===================
// Button Click Handler
// ===================
function btnPress() {
    let btn = this;
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    btnFlash(btn);
    playSound(userColor);
    checkAns(userSeq.length - 1);
}

// ===================
// Level Up
// ===================
function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    scoreBoard.innerText = level;

    let randColor = btns[Math.floor(Math.random() * 4)];
    gameSeq.push(randColor);

    let randBtn = document.querySelector(`.${randColor}`);
    btnFlash(randBtn);
    playSound(randColor);
}

// ===================
// Check Answer
// ===================
function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        // Game Over
        document.body.classList.add("game-over");
        playSound("wrong");
        setTimeout(() => document.body.classList.remove("game-over"), 200);

        h2.innerHTML = `Game Over! Your score was <b>${level}</b>. Press any key or click restart.`;
        restartBtn.innerText = " Restart ";

        if (level > highScore) {
                highScore = level;
                highScoreBoard.innerText = highScore;
                localStorage.setItem("highScore", highScore); // ✅ Global save
    }

        showGameOver();
        reset();
    }
}

// ===================
// Reset Game
// ===================
function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    scoreBoard.innerText = 0;
    //localStorage.removeItem("highScore");
    h2.innerText = "Press 'start over' to start the game";
    restartBtn.innerText = "Start Over";
}

// ===================
// Game Over Animation
// ===================
function showGameOver() {
    document.getElementById("final-score").innerText = level;
    document.getElementById("game-over-popup").classList.remove("hidden");
}
document.getElementById("play-again").addEventListener("click", () => {
    document.getElementById("game-over-popup").classList.add("hidden");
    reset();
    started = true;
    levelUp();
});


// ===================
// Event Listeners
// ===================

// Start on keypress
document.addEventListener("keypress", () => {
    if (!started) {
        started = true;
        levelUp();
    }
});

// Start on restart click
restartBtn.addEventListener("click", () => {
    reset();
    started = true;
    levelUp();
});

// Button clicks
let allBtns = document.querySelectorAll(".btn");
allBtns.forEach(btn => btn.addEventListener("click", btnPress));

// ===================
// Load & Save High Score
// ===================
const storedHigh = localStorage.getItem("highScore");
if (storedHigh) {
    highScore = parseInt(storedHigh);
    highScoreBoard.innerText = highScore;
}


// ===================
// One-Time Popup
// ===================
window.addEventListener("load", () => {
    if (!localStorage.getItem("popupShown")) {
        document.getElementById("popup-overlay").style.display = "flex";
        localStorage.setItem("popupShown", "true");
    }

    // Load theme on window load
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
    }
});

document.getElementById("close-popup").addEventListener("click", () => {
    document.getElementById("popup-overlay").style.display = "none";
});

// ===================
// Theme Toggle
// ===================
const themeToggle = document.getElementById("toggle-theme");
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    const theme = document.body.classList.contains("light-mode") ? "light" : "dark";
    localStorage.setItem("theme", theme);
});

document.getElementById("play-again").addEventListener("click", () => {
    document.getElementById("game-over-msg").classList.add("hidden");
    reset();
    started = true;
    levelUp();
});


