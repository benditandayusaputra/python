const startButton = document.getElementById('start')
const restartButton = document.getElementById('restart')
const inputName = document.getElementById('name')
const error = document.getElementById('error')
const inst = document.querySelector('.container-instruction')
const ins =  document.querySelector('.instruction')
const userName = document.getElementById('nameUser')
const h5 = document.getElementsByTagName('h5')[0]
const start = document.getElementById('start')
const scoreDisplayElem = document.querySelector('.scoreboard');
const hiscoreDisplayElem = document.querySelector('.hi');
const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
var seconds = 0
var minutes = 0
var hours = 0
var t
var paused = false;
var grid = 20;
var statusGameOver = false;
var statusGame = false

function startGame() {
   if ( inputName.value == "") {
       error.innerHTML = 'Nama Harus Di Isi Terlebih Dahulu'
   } else {
       localStorage.setItem('name', inputName.value)
       userName.innerHTML = localStorage.getItem('name')
       ins.style.top = '150%'
       inst.style.visibility = 'hidden'
       timer()
       statusGame = true
       requestAnimationFrame(gameLoop)
   }
}
inputName.addEventListener('input', function (e) {
   if ( statusGame === false ) {
       if ( this.value != '' ) {
            startButton.removeAttribute('disabled')
       } else {
            startButton.setAttribute('disabled', 'disabled')
       }
   }
})
startButton.addEventListener('click', function (e) {
   startGame()
})

function add() {
   seconds++;
   if (seconds >= 60) {
       seconds = 0;
       minutes++;
       if (minutes >= 60) {
           minutes = 0;
           hours++;
       }
    }
   h5.textContent = (hours ? (hours > 9 ? hours : '0' + hours) : '00') + ':' + (minutes ? (minutes > 9 ? minutes : '0' + minutes) : '00') + ':' + (seconds > 9 ? seconds : '0' + seconds);
   timer();
}
function timer() {
   t = setTimeout(add, 1000);
}
function clearTime() {
   clearTimeout(t)
   h5.textContent = '00:00:00';
   seconds = 0; minutes = 0; hours = 0;
}

var count = 0;
canvas.style.background = '#0c3a6b'
function resetSnake() {
    var snake = {
       x: 300,
       y: 300,
       dx: grid,
       dy: 0,
       cells: [],
       maxCells: 4,
    };
    return snake;
}
var snake = resetSnake();
var score = 0;
var hiscore = 0;
var apple = {x: 320, y: 320};
const getRandomInt = (mn, mx) => Math.floor(Math.random() * (mx - mn)) + mn;

function gameLoop() {
    if ( statusGameOver === false ) {
       requestAnimationFrame(gameLoop);
       if (++count < 4) return;
       if (paused) throwError();
       count = 0;
       context.clearRect(0, 0, canvas.width, canvas.height);
       snake.x += snake.dx;
       snake.y += snake.dy;
       if (snake.x < 0) snake.x = canvas.width - grid;
       else if (snake.x >= canvas.width) snake.x = 0;
       if (snake.y < 0) snake.y = canvas.height - grid;
       else if (snake.y >= canvas.width) snake.y = 0;
       snake.cells.unshift({x: snake.x, y: snake.y});
       if (snake.cells.length > snake.maxCells) snake.cells.pop();
       for (let x = 0; x < 48; x++) {
           for (let y = 0; y < 30; y++) {
               startX = x * 20;
               startY = y * 20;
               if ((x + y) % 2 != 0) {
                   context.fillStyle='#5d96d4';
                   context.fillRect(startX,startY,20,20);
               }
           }
       }
       context.fillStyle = '#DDD';
       context.fillRect(apple.x, apple.y, grid-1, grid-1);
       context.fillStyle = 'rgb(218, 130, 15)';
       snake.cells.forEach(function(cell, index) {
           context.fillRect(cell.x, cell.y, grid-1, grid-1)
           if (cell.x === apple.x && cell.y == apple.y) {
               snake.maxCells++;
               scoreDisplayElem.innerHTML = ++score;
               apple.x = getRandomInt(0, 25) * grid;
               apple.y = getRandomInt(0, 25) * grid;
           }
           for (var i = index + 1; i < snake.cells.length; i++) {
               if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                   gameOver();
                   clearTime();
                   scoreDisplayElem.innerHTML = '0';
                   score = 0;
                   snake = resetSnake();
                   apple.x = getRandomInt(0, 25) * grid;
                   apple.y = getRandomInt(0, 25) * grid;
                   return
                }
            }
       });
   }
}

function gameOver() {
   statusGameOver = true
   context.fillStyle = '#000'
   context.fillRect(0, 0, canvas.width, canvas.height)
   context.fillStyle ='#fff';
   context.font = '52px Arial';
   context.fillText('Game Over', 300, 250);
   context.fillStyle ='#fff';
   context.font = '48px Arial';
   context.fillText('Score : ' + score, 300, 300);
   context.fillStyle ='#fff';
   context.font = '48px Arial';
   context.fillText('Waktu : ' + h5.textContent, 300, 350);
   return
}

document.addEventListener('keydown', function(e) {
   if ( statusGameOver === false ) {
       if ( e.which === 37 && snake.dx === 0 ) {
           snake.dx = -grid;
           snake.dy = 0;
       } else if ( e.which === 38 && snake.dy === 0 ) {
           snake.dy = -grid;
           snake.dx = 0;
       } else if ( e.which === 39 && snake.dx === 0 ) {
           snake.dx = grid;
           snake.dy = 0;
       } else if ( e.which === 40 && snake.dy === 0 ) {
           snake.dy = grid;
           snake.dx = 0;
       }
   }
})

restartButton.addEventListener('click', function (e) {
    if (statusGameOver == true) {
        timer()
        statusGame = true
        statusGameOver = false
        requestAnimationFrame(gameLoop)
    } else {
        snake = resetSnake()
        score = 0
        clearTime()
        timer()
    }
})