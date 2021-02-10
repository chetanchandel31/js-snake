document.addEventListener('DOMContentLoaded', () => {
    const gridEl = document.querySelector('.grid');
    const width = 10;

    for (let i = 0; i < width * width; i++) {
        let gridChild = document.createElement('div');
        gridEl.appendChild(gridChild);
    }

    const boxes = document.querySelectorAll('.grid div');
    let currentSnake = [2, 1, 0];
    // let currentIndex = 0;
    // let appleIndex = spawnApple();
    let speed = 0.9;
    let interval = 0;
    let intervalTime = 1000;
    let direction = 1;

    function startGame() {
        // reset everything and move snake
        boxes.forEach(box => box.classList.remove('snake', 'apple'))
        currentSnake = [2, 1, 0];
        currentSnake.forEach(i => boxes[i].classList.add('snake'));
        intervalTime = 1000;
        direction = 1;
        spawnApple();
        clearInterval(interval);
        interval = setInterval(moveSnake, intervalTime)

    }

    function moveSnake() {
        //handle apple and loss

        let tail = currentSnake.pop();
        currentSnake.unshift(currentSnake[0] + direction);
        boxes[tail].classList.remove('snake');
        boxes[currentSnake[0]].classList.add('snake');
    }

    function changeDirection (e) {
        if (e.keyCode === 37 && direction !== 1) direction = -1; //left
        if (e.keyCode === 38 && direction !== width) direction = -width;//up
        if (e.keyCode === 39 && direction !== -1) direction = 1; //right
        if (e.keyCode === 40 && direction !== -width) direction = width; //down
    }

    function spawnApple() {
        let appleIndex;

        do {
            let randomBoxIndex = Math.floor(Math.random() * boxes.length);
            appleIndex = randomBoxIndex;
        } while (boxes[appleIndex].classList.contains('snake'))

        boxes[appleIndex].classList.add('apple');
    }

    document.addEventListener('keyup', changeDirection)
    document.querySelector('.start').addEventListener('click', startGame);

})