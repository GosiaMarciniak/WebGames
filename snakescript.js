const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const tileSize = 20;
const tileCount = canvas.width / tileSize;

let snake = [];
snake.push({ x: 10, y: 10 });

let food = {
  x: Math.floor(Math.random() * tileCount),
  y: Math.floor(Math.random() * tileCount),
};

let dx = 0;
let dy = 0;

function drawSnakePart(x, y) {
  ctx.fillStyle = "#000";
  ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
}

function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);
}

function changeDirection(event) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;

  const keyPressed = event.keyCode;

  if (keyPressed === LEFT_KEY && dx !== 1) {
    dx = -1;
    dy = 0;
  }

  if (keyPressed === RIGHT_KEY && dx !== -1) {
    dx = 1;
    dy = 0;
  }

  if (keyPressed === UP_KEY && dy !== 1) {
    dx = 0;
    dy = -1;
  }

  if (keyPressed === DOWN_KEY && dy !== -1) {
    dx = 0;
    dy = 1;
  }
}

function updateGame() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food = {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount),
    };
  } else {
    snake.pop();
  }
}

function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  snake.forEach((snakePart) => {
    drawSnakePart(snakePart.x, snakePart.y);
  });

  drawFood();
}

function checkCollision() {
  const head = snake[0];

  if (
    head.x < 0 ||
    head.x >= tileCount ||
    head.y < 0 ||
    head.y >= tileCount ||
    snake.some(
      (snakePart, index) => index !== 0 && snakePart.x === head.x && snakePart.y === head.y
    )
  ) {
    clearInterval(gameInterval);
    alert("Game Over!");
  }
}

function gameLoop() {
  updateGame();
  drawGame();
  checkCollision();
}

document.addEventListener("keydown", changeDirection);

const gameInterval = setInterval(gameLoop, 200);
