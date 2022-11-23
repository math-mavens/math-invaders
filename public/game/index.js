import BulletController from "./BulletController.js";
import EnemyController from "./EnemyController.js";
import Player from "./Player.js";
import HudController from "./HudController.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

const background = new Image();
background.src = "./images/space.png";

const playerBulletController = new BulletController(canvas, 10, "red", true);
const enemyBulletController = new BulletController(canvas, 4, "white", true);
let enemyController = null;
const player = new Player(canvas, 3, playerBulletController);
let hudController = null;

let isGameOver = false;
let didWin = false;
let setIntervalID = null;

function game() {
  // console.log("in game loop...");
  checkGameOver();
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  displayGameOver();

  if (!isGameOver) {
    enemyController.draw(ctx);
    player.draw(ctx);
    playerBulletController.draw(ctx);
    enemyBulletController.draw(ctx);
  } else { // If game over stop the game loop
    clearInterval(setIntervalID);
  }

  hudController.draw(ctx, enemyController.getScore(),
                     playerBulletController.getBulletsFired());
}

function displayGameOver() {
  if (isGameOver) {
    let result = didWin ? "You Win!" : "Try again!";

    // Make a fetch call to attempts/:id #update to save
    //questions solved, total time and score
    const score = enemyController.getScore();
    const totalTime = hudController.getTotalTimePlayed();
    const totalQuestions = attemptData['level']['total_problems'];
    const problemsSolved = totalQuestions - enemyController.getQuestionsLeft();
    const bulletsFired = playerBulletController.getBulletsFired();

    fetch(`/attempts/${attemptId}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        attempt: {"score": score, "total_time": totalTime,
                  "problems_solved": problemsSolved,
                  "bullets_fired": bulletsFired}
      })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        //TODO: Show Score with Reply and Next Level buttons
        const scorePopup = document.getElementById('score-popup');
        scorePopup.classList.toggle('d-none');
        const scoreMessage = document.getElementById('score-message');
        scoreMessage.innerText = result;
      });
  }
}

function checkGameOver() {
  if (isGameOver) {
    return;
  }
  if (enemyBulletController.collideWith(player)) {
    isGameOver = true;
  }
  if (enemyController.collideWith(player)) {
    isGameOver = true;
  }
  if (enemyController.enemyRows.length === 0) {
    didWin = true;
    isGameOver = true;
  }
}

function startGame() {
  const startPopup = document.getElementById("start-popup");

  startPopup.classList.toggle('d-none');
  canvas.classList.toggle('d-none');

  enemyController = new EnemyController(canvas, enemyBulletController,
    playerBulletController, attemptData['level']['name']);
  hudController = new HudController();
  setIntervalID = setInterval(game, 1000 / 45);
}


const url = new URL(window.location.href);
const searchParams = url.searchParams;

const attemptId = searchParams.get('a');
let attemptData = null;

fetch(`/attempts/${attemptId}`)
  .then((response) => response.json())
  .then((data) => {
    attemptData = data;
    console.log(attemptData);
    const startTitle = document.getElementById("start-title");
    const startBtn = document.getElementById("start-btn");

    startBtn.addEventListener('click', startGame);
    startTitle.innerText = `Hi ${attemptData['user']['first_name']}, click start to play!`;
    startBtn.classList.toggle("d-none");
  });

// const startBtn = document.getElementById("start-btn");
// startBtn.addEventListener('click', startGame);
