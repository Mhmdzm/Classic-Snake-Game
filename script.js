const gameBoard = document.getElementById("gameBoard");
const ctx = gameBoard.getContext("2d");
const scoretext = document.getElementById("scoretext");
const res = document.getElementById("res");

const gameWidth = gameBoard.width;
const gameHieght = gameBoard.height;
const boardBackground = "white";
const snakeColor = "black";
const snackBorder = "white";
const foodColor = "red";
const unitSize = 25;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
  {
    x: unitSize * 4,
    y: 0,
  },
  {
    x: unitSize * 3,
    y: 0,
  },
  {
    x: unitSize * 2,
    y: 0,
  },
  {
    x: unitSize * 1,
    y: 0,
  },
  {
    x: 0,
    y: 0,
  },
];
window.addEventListener("keydown", changedirection);
res.addEventListener("click", resetGame);

gameStart();

function gameStart() {
  running = true;
  scoretext.textContent = score;
  createFood();
  drawFood();
  nextTick();
}
function nextTick() {
  if (running) {
    setTimeout(() => {
      clearBoard();
      drawFood();
      moveSnake();
      drawSnake();
      checkGameOver();
      nextTick();
    }, 75);
  } else {
    displayGameOver();
  }
}
function clearBoard() {
  ctx.fillStyle = boardBackground;
  ctx.fillRect(0, 0, gameWidth, gameHieght);
}
function createFood() {
  function reandomFood(min, max) {
    const randNum =
      Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
    return randNum;
  }
  foodX = reandomFood(0, gameWidth - unitSize);
  foodY = reandomFood(0, gameHieght - unitSize);
}
function drawFood() {
  ctx.fillStyle = foodColor;
  ctx.fillRect(foodX, foodY, unitSize, unitSize);
}
function moveSnake() {
  const head = { x: snake[0].x + xVelocity, y: snake[0].y + yVelocity };
  snake.unshift(head);
  
  if (snake[0].x == foodX && snake[0].y == foodY) {
    score += 1;
    scoretext.textContent = score;
    createFood();
  } else {
    snake.pop();
  }
}
function drawSnake() {
  ctx.fillStyle = snakeColor;
  ctx.strokeStyle = snackBorder;
  snake.forEach((snake) => {
    ctx.fillRect(snake.x, snake.y, unitSize, unitSize);
    ctx.strokeRect(snake.x, snake.y, unitSize, unitSize);
  });
}
function changedirection(event) {
  const keyPressed = event.keyCode;
  const LEFT = 37;
  const RIGHT = 39;
  const UP = 38;
  const Down = 40;

  const goingUP = yVelocity == -unitSize;
  const goingDown = yVelocity == unitSize;
  const goingRIGHT = xVelocity == unitSize;
  const goingLEFT = xVelocity == -unitSize;

  switch (true) {
    case keyPressed == LEFT && !goingRIGHT:
      xVelocity = -unitSize;
      yVelocity = 0;
      break;
    case keyPressed == UP && !goingDown:
      xVelocity = 0;
      yVelocity = -unitSize;
      break;
    case keyPressed == RIGHT && !goingLEFT:
      xVelocity = unitSize;
      yVelocity = 0;
      break;
    case keyPressed == Down && !goingUP:
      xVelocity = 0;
      yVelocity = unitSize;
      break;
  }
}
function checkGameOver() {
  switch (true) {
    case snake[0].x < 0:
      running = false;
      break;
    case snake[0].x >= gameWidth:
      running = false;
      break;
    case snake[0].y < 0:
      running = false;
      break;
    case snake[0].y >= gameHieght:
      running = false;
      break;
  }
  for(let i = 1; i<snake.length ;i++){
    if(snake[i].x ==snake[0].x && snake[i].y ==snake[0].y){
      running=false;
    }
  }
}
function displayGameOver() {
  ctx.font = "50px MV Boli";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText("Game Over!", gameWidth/2 ,gameHieght/2);
  running=false;
}
function resetGame() {
  score =0;
  xVelocity = unitSize;
  yVelocity = 0;
  snake = [
    {
      x: unitSize * 4,
      y: 0,
    },
    {
      x: unitSize * 3,
      y: 0,
    },
    {
      x: unitSize * 2,
      y: 0,
    },
    {
      x: unitSize * 1,
      y: 0,
    },
    {
      x: 0,
      y: 0,
    },
  ];
  gameStart();
}
