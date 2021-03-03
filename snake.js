var scoreDisplayElem = document.querySelector('.scoreboard');
var hiscoreDisplayElem = document.querySelector('.hi');
var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var paused = false;
var grid = 20;
var count = 0;

canvas.style.background = '#333'

function resetSnake() {
    var snake = {
        x: 160,
        y: 160,
        dx: grid, // moves one grid length per frame
        dy: 0,
        cells: [], // keep track of all grids occupied by snake
        maxCells: 4, // length of snake, grows when eating apple
    };
    return snake;
}
var snake = resetSnake();
var score = 0;
var hiscore = 0;
var apple = {x: 320, y: 320};

const getRandomInt = (mn, mx) => Math.floor(Math.random() * (mx - mn)) + mn;

function gameLoop() {
    
    requestAnimationFrame(gameLoop);
    if (++count < 4) return;
    if (paused) throwError(); // throw an error to force a pause
    count = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);

    snake.x += snake.dx; // move snake by its velocity
    snake.y += snake.dy;
    
    // horizontal wrap
    if (snake.x < 0) snake.x = canvas.width - grid;
    else if (snake.x >= canvas.width) snake.x = 0;

    // vertical wrap
    if (snake.y < 0) snake.y = canvas.height - grid;
    else if (snake.y >= canvas.width) snake.y = 0;

    //keep track of snake's cells. Head is at front of array.
    snake.cells.unshift({x: snake.x, y: snake.y});

    // remove cells as snake moves away
    if (snake.cells.length > snake.maxCells) snake.cells.pop();

    for (let x = 0; x < 48; x++) {
        for (let y = 0; y < 30; y++) {
            startX = x * 20;
            startY = y * 20;
            if ((x + y) % 2 != 0) {
                context.fillStyle='lightblue';
                context.fillRect(startX,startY,20,20);
            }
        }
    
    }

    // draw apple
    context.fillStyle = 'red';
    context.fillRect(apple.x, apple.y, grid-1, grid-1);

    // draw snake
    context.fillStyle = 'green';
    snake.cells.forEach(function(cell, index) {
        context.fillRect(cell.x, cell.y, grid-1, grid-1) // size of cell -1 for grid effect.
        if (cell.x === apple.x && cell.y == apple.y) {
            snake.maxCells++;
            scoreDisplayElem.innerHTML = ++score;
            apple.x = getRandomInt(0, 25) * grid;
            apple.y = getRandomInt(0, 25) * grid;
            if (score > hiscore) {
                hiscore = score;
                hiscoreDisplayElem.innerHTML = '' + hiscore;
            }
        }
        // check collision with all cells
        for (var i = index + 1; i < snake.cells.length; i++) {
            // if snake touches itself, reset game
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                scoreDisplayElem.innerHTML = ' 0';
                score = 0;
                snake = resetSnake();
                apple.x = getRandomInt(0, 25) * grid;
                apple.y = getRandomInt(0, 25) * grid;
            }
        }
    });
}

// listen to keyboard events to move the snake
document.addEventListener('keydown', function(e) {
    // prevent snake from reversing into itself
    if (e.which === 37 && snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
    }
    else if (e.which === 38 && snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
    }
    else if (e.which === 39 && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    }
    else if (e.which === 40 && snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
    }
    else if (e.which == 32) {
        paused = !paused;
        document.querySelector('.pause').innerHTML = paused ? 'Play' : 'Pause';
    }
});

function left() {
    if (snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
    }
};
function right() {
    if (snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    }
};
function up() {
    if (snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
    }
};
function down() {
    if (snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
    }  
};
function pause() {
    paused = !paused;
    document.querySelector('.pause').innerHTML = paused ? 'Play' : 'Pause';
}


requestAnimationFrame(gameLoop);

var Timer;
var TotalSeconds,TotalMins, secs;
var elapsedtime ;

function CreateTimer(TimerID, Time) {
        Timer = document.getElementById(TimerID);
        TotalSeconds = Time;
        elapsedtime = 0
        time = Time
        secs = TotalSeconds%60;
        TotalMins = Math.floor(TotalSeconds/60)
        UpdateTimer()
        window.setTimeout("Tick()", 1000);
}

function Tick() {
if(TotalSeconds-elapsedtime>0)
{
    elapsedtime += 1;
    secs = (elapsedtime%60)-60;
    TotalMins = Math.floor(elapsedtime/60)
    UpdateTimer()
    window.setTimeout("Tick()", 1000);
}
else
alert("time up")
}

function UpdateTimer() {
        Timer.innerHTML = TotalMins + ":" + secs;
}
