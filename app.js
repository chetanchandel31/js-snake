document.addEventListener('DOMContentLoaded', () => {
    const gridEl = document.querySelector('.grid');
    const width = 10;

    for (let i = 0; i < width * width; i++) {
        let gridChild = document.createElement('div');
        gridEl.appendChild(gridChild);
    }

    const scoreEl = document.querySelector('.score');
    const boxes = document.querySelectorAll('.grid div');
    let currentSnake = [2, 1, 0];//each element represents an index of boxes
    let score = 0;
    let speed = 0.9;
    let interval;
    let intervalTime = 1000;
    let direction = 1;
    let allowDirectionChange = false;

    function startGame() {
        // reset everything and move snake
        boxes.forEach(box => box.classList.remove('snake', 'apple'))
        currentSnake = [2, 1, 0];
        currentSnake.forEach(i => boxes[i].classList.add('snake'));
        direction = 1;
        spawnApple();
        updateScore(0);
        intervalTime = 1000;
        clearInterval(interval);
        interval = setInterval(moveSnake, intervalTime);
        
        document.querySelector('.start').textContent = 'Restart';
        document.querySelector('.game').style.display = 'block';
        document.querySelector('.instructions').style.display = 'none';
        document.querySelector('.arrowBtn').style.display = 'flex';
    }

    function moveSnake() {
        //handle snake touches wall or itself
        if (
            (currentSnake[0] - width < 0 && direction === -width) || //top wall
            (currentSnake[0] + width > width * width && direction === width) || //bottom wall
            (currentSnake[0] % width === width - 1 && direction === 1) || //right wall
            (currentSnake[0] % width === 0 && direction === -1) || //left wall
            (boxes[currentSnake[0] + direction].classList.contains('snake') &&
            currentSnake[0] + direction !== currentSnake[currentSnake.length - 1]) //itself
        ) {
            clearInterval(interval);
            return alert('game over')
        }
        //change array and then render NEW snake to avoid bugs
        let tail = currentSnake.pop();
        currentSnake.unshift(currentSnake[0] + direction);
        boxes.forEach(box => box.className = box.className.replace('snake', ''));
        currentSnake.forEach(i => boxes[i].classList.add('snake'));

        //if apple eaten
        if (boxes[currentSnake[0]].classList.contains('apple')) {
            //remove apple and restore tail
            boxes[currentSnake[0]].classList.remove('apple');
            currentSnake.push(tail);
            boxes[tail].classList.add('snake');
            //spawn new apple and update score
            spawnApple();
            updateScore(score+1);
            //update interval
            intervalTime *= speed;
            clearInterval(interval);
            interval = setInterval(moveSnake, intervalTime);
        }

        allowDirectionChange = true;
    }

    function changeDirection(e) {
        if (!allowDirectionChange) return;

        let validMoveMade = true;

        if (e.keyCode === 37 && direction !== 1) {
            direction = -1; //left
        } else if (e.keyCode === 38 && direction !== width) {
            direction = -width; //up
        } else if (e.keyCode === 39 && direction !== -1) {
            direction = 1; //right
        } else if (e.keyCode === 40 && direction !== -width) {
            direction = width; //down
        } else {
            validMoveFound = false;
        }
        //don't allow direction change ONLY IF A VALID MOVE HAS BEEN MADE, moveSnake() will allow direction change after moving snake
        if (validMoveMade) allowDirectionChange = false;
    }

    function replicateKeyBehaviour (code) {
        let e = {};
        e.keyCode = code;
        changeDirection(e);
    }

    function spawnApple() {
        let appleIndex;

        do {
            let randomBoxIndex = Math.floor(Math.random() * boxes.length);
            appleIndex = randomBoxIndex;
        } while (boxes[appleIndex].classList.contains('snake'))

        boxes[appleIndex].classList.add('apple');
    }

    function updateScore(newScore){
        score = newScore;
        scoreEl.textContent = score;
    }

    document.addEventListener('keyup', changeDirection)
    document.querySelector('.start').addEventListener('click', startGame);
    //arrow buttons
    document.querySelector('#left').addEventListener('click', () => replicateKeyBehaviour(37));
    document.querySelector('#up').addEventListener('click', () => replicateKeyBehaviour(38));
    document.querySelector('#right').addEventListener('click', () => replicateKeyBehaviour(39));
    document.querySelector('#down').addEventListener('click', () => replicateKeyBehaviour(40));
})