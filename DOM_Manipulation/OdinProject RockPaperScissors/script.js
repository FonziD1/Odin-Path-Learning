const container = document.querySelector(".container");
const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");


// We'll render messages here (you have <div class="winner-container"></div> in HTML)
const statusEl = document.querySelector(".winner-container");

let playerScore = 0;
let computerScore = 0;

const choices = ["rock", "paper", "scissors"];

function randomChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}

// Simple helper
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Decide winner for a round given BOTH choices
function game(playerChoice, computerChoice) {
  let message = "";

  if (
    (computerChoice === "rock" && playerChoice === "scissors") ||
    (computerChoice === "scissors" && playerChoice === "paper") ||
    (computerChoice === "paper" && playerChoice === "rock")
  ) {
    message = `Computer wins round! ${computerChoice} beats ${playerChoice}.`;
    computerScore += 1;
  } else if (computerChoice === playerChoice) {
    message = `Draw! You both picked ${playerChoice}.`;
  } else {
    message = `Player wins round! ${playerChoice} beats ${computerChoice}.`;
    playerScore += 1;
  }

  // Render message + score
  if (statusEl) {
    statusEl.textContent = `${message} | Score — Player: ${playerScore} — Computer: ${computerScore}`;
    
  statusEl.style.textAlign = 'center';
  }

  // First to 3 wins
  if (playerScore === 3 || computerScore === 3) {
    const winner = playerScore === 3 ? "Player" : "Computer";
    if (statusEl) statusEl.textContent = `${winner} wins the game!`;

    // Reset for a new game
    playerScore = 0;
    computerScore = 0;
  }

}

[rock, paper, scissors].forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const playerChoice = e.currentTarget.id; // 'rock' | 'paper' | 'scissors'
    const playerImage = e.currentTarget.querySelector("img").src;
    displayRound(playerChoice, playerImage);
  });
});

function displayRound(playerChoice, playerImage) {
  // remove previous round display
  const oldDiv = document.querySelector(".round-display");
  if (oldDiv) oldDiv.remove();

  const div = document.createElement("div");
  div.classList.add("round-display");
  div.style.background = "antiquewhite";
  div.style.padding = "10px";
  div.style.marginTop = "20px";
  div.style.display = "flex";
  div.style.gap = "16px";
  div.style.justifyContent = "space-around";
  div.style.alignItems = "center";
  div.style.margin = "50px";
  div.style.boxShadow =
    "0 10px 20px rgba(129, 59, 175, 0.7), 0 -10px 20px rgba(0, 0, 0, 0.3)";
  div.style.borderRadius = "10px";
  div.style.textAlign = 'center'

  // player side
  const playerPick = document.createElement("img");
  playerPick.src = playerImage;
  playerPick.width = 100;
  playerPick.alt = capitalize(playerChoice);

  // computer side (pick one and mirror the hardcoded HTML by alt)
  const computerChoice = randomChoice();
  const computerImgEl = document.querySelector(
    `.computer-container img[alt="${capitalize(computerChoice)}"]`
  );
  const computerPick = document.createElement("img");
  computerPick.src = computerImgEl ? computerImgEl.src : "";
  computerPick.width = 100;
  computerPick.alt = capitalize(computerChoice);

  // run one round with the known choices
  game(playerChoice, computerChoice);

  // score text
  const score = document.createElement("p");
  score.textContent = `Player: ${playerScore} --- Computer: ${computerScore}`;
  score.style.fontSize = '26px'

  // append all
  div.appendChild(playerPick);
  div.appendChild(score);
  div.appendChild(computerPick);

  document.body.appendChild(div);
}
statusEl.style.display = "none";
// --- Play button + show/hide logic ---
container.style.display = "none"; // hide game until Play

const playButton = document.createElement("button");
playButton.classList.add("btn");
playButton.textContent = "Play";
playButton.style.display = "block";
playButton.style.margin = "20px auto";
playButton.style.padding = "10px 16px";
playButton.style.borderRadius = "10px";
playButton.style.margin = "50% auto";
playButton.style.color = "#f1f1f1";

playButton.addEventListener("click", () => {
  // show the game and hide the button
  container.style.display = "flex";
  playButton.classList.add("hidden");
  statusEl.style.display = "flex";
  playButton.style.display = "none";
});

document.body.appendChild(playButton);
