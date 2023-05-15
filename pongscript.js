
const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");

const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 80;
const BALL_RADIUS = 5;

let paddle1Y = canvas.height / 2 - PADDLE_HEIGHT / 2;
let paddle2Y = canvas.height / 2 - PADDLE_HEIGHT / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = -2;
let ballSpeedY = -2;
let player2speed= 1.75;

let score1 = 0;
let score2 = 0;

function draw() {
  context.fillStyle = "#000";
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = "#fff";
  context.fillRect(0, paddle1Y, PADDLE_WIDTH, PADDLE_HEIGHT);

  context.fillRect(canvas.width - PADDLE_WIDTH, paddle2Y, PADDLE_WIDTH, PADDLE_HEIGHT);

  context.beginPath();
  context.arc(ballX, ballY, BALL_RADIUS, 0, Math.PI * 2, false);
  context.fillStyle = "#fff";
  context.fill();

  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballY - BALL_RADIUS < 0 || ballY + BALL_RADIUS > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }

  if (
    ballX - BALL_RADIUS < PADDLE_WIDTH &&
    ballY > paddle1Y &&
    ballY < paddle1Y + PADDLE_HEIGHT
  ) {
    ballSpeedX = -ballSpeedX;
  }

  if (
    ballX + BALL_RADIUS > canvas.width - PADDLE_WIDTH &&
    ballY > paddle2Y &&
    ballY < paddle2Y + PADDLE_HEIGHT
  ) {
    ballSpeedX = -ballSpeedX;
  }

  const paddle2CenterY = paddle2Y + PADDLE_HEIGHT / 2;
  if (paddle2CenterY < ballY) {
    paddle2Y += player2speed; 
  } else {
    paddle2Y -= player2speed; 
  }

  if (paddle1Y < 0) {
    paddle1Y = 0;
  }
  if (paddle1Y + PADDLE_HEIGHT > canvas.height) {
    paddle1Y =
    canvas.height - PADDLE_HEIGHT;
    }
    
    if (paddle2Y < 0) {
        paddle2Y = 0;
    }
    if (paddle2Y + PADDLE_HEIGHT > canvas.height) {
        paddle2Y = canvas.height - PADDLE_HEIGHT;
    }
    
    if (ballX - BALL_RADIUS < 0) {
        score2++;
        resetBall();
    } else if (ballX + BALL_RADIUS > canvas.width) {
        score1++;
        resetBall();
    }
    
    context.fillStyle = "#fff";
    context.font = "20px Arial";
    context.fillText("Gracz 1: " + score1, 20, 40);
    context.fillText("Gracz 2: " + score2, canvas.width - 120, 40);

}
    
function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
    ballSpeedY = -ballSpeedY;
}
    
function movePaddle(event) {
const rect = canvas.getBoundingClientRect();
const mouseY = event.clientY - rect.top;
    
paddle1Y = mouseY - PADDLE_HEIGHT / 2;
    
if (paddle1Y < 0) {
    paddle1Y = 0;
    }
    if (paddle1Y + PADDLE_HEIGHT > canvas.height) {
    paddle1Y = canvas.height - PADDLE_HEIGHT;
    }
}
    
canvas.addEventListener("mousemove", movePaddle);
    
function gameLoop() {
draw();
requestAnimationFrame(gameLoop);
}
    
gameLoop();
