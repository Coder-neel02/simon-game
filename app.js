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

// Sound effects
function playSound(color) {
    let audio = new Audio(`sounds/${color}.mp3`);
    audio.play();
}

document.addEventListener("keypress", function () {
    if (!started) {
        started = true;
        levelUp();
    }
});

restartBtn.addEventListener("click", function () {
    reset();
    started = true;
    levelUp();
});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    scoreBoard.innerText = level;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);

    btnFlash(randBtn);
    playSound(randColor);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        document.body.classList.add("game-over");
        playSound("wrong");
        showGameOver();

        h2.innerHTML = `Game Over! Your score was <b>${level}</b>. Press any key or click restart.`;

        if (level > highScore) {
                        players[currentEmail].highScore = level;
                        localStorage.setItem("players", JSON.stringify(players));
                        highScoreBoard.innerText = level;
        }



        reset();
    }
}

const storedHigh = localStorage.getItem("highScore");
if (storedHigh) {
    highScore = parseInt(storedHigh);
    highScoreBoard.innerText = highScore;
}

function btnPress() {
    let btn = this;
    btnFlash(btn);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    playSound(userColor);
    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    scoreBoard.innerText = 0;
}


// ------------------------------------------------------------------------------------------------
// Show popup only once
window.addEventListener("load", () => {
    if (!localStorage.getItem("popupShown")) {
        document.getElementById("popup-overlay").style.display = "flex";
        localStorage.setItem("popupShown", "true");
    }
});

// Close popup
document.getElementById("close-popup").addEventListener("click", () => {
    document.getElementById("popup-overlay").style.display = "none";
});
// togel the theme
// Theme Toggle
const themeToggle = document.getElementById("toggle-theme");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    // Save theme to localStorage
    localStorage.setItem("theme", document.body.classList.contains("light-mode") ? "light" : "dark");
});

// Load saved theme
window.addEventListener("load", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
    }
});

function showGameOver() {
  const msg = document.getElementById("game-over-msg");
  msg.classList.remove("hidden");
  setTimeout(() => msg.classList.add("hidden"), 2000);
}


