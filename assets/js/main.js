import Ball from "./Ball.js";
import Paddle from "./Paddle.js";

const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("player-paddle"));
const computerPaddle = new Paddle(document.getElementById("computer-paddle"));
const playerScoreElem = document.getElementById("player-score");
const computerScoreElem = document.getElementById("computer-score");

let lastTime;

/*============== GAME LOOP ==============*/
function update(time) {
  if (lastTime != null) {
    const delta = time - lastTime;

    ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
    computerPaddle.update(delta, ball.y);

    // Change background color
    const hue = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--hue")
    );
    document.documentElement.style.setProperty("--hue", hue + delta * 0.01);

    // If game over method is called, run game over handler
    if (isLose()) handleLose();
  }

  lastTime = time;

  window.requestAnimationFrame(update);
}
window.requestAnimationFrame(update);

/*============== PLAYER PADDLE MOVEMENT ==============*/
document.addEventListener("mousemove", (e) => {
  playerPaddle.position = (e.y / window.innerHeight) * 100;
});

/*============== GAME OVER HANDLER ==============*/
function handleLose() {
  const rect = ball.rect();
  // If ball touches right side of window, player scores
  if (rect.right >= window.innerWidth) {
    playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1;
  }
  // Else computer scores
  else {
    computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1;
  }
  ball.reset();
  computerPaddle.reset();
}

/*============== GAME OVER METHOD ==============*/
function isLose() {
  const rect = ball.rect();
  return rect.right >= window.innerWidth || rect.left <= 0;
}
