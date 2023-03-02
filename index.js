const startContainer = document.querySelector('.start');
const gameContainer = document.querySelector('.game');
const scoreContainer = document.querySelector('.score');
const scoreId = document.querySelector("#score-id");

let score = 0;
let carPosition = {
    x:0,
    y:0,
    speed : 5
};

let player = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
};



function moveLine() {
    const lines = document.querySelectorAll('.line');
   
    lines.forEach(line => {
        var top = line.offsetTop;
         const gameContainerDetails = gameContainer.getBoundingClientRect();
        if (line.offsetTop > gameContainerDetails.bottom) {
          top = 0;
        }
        // update the top value;
        line.style.top = top + carPosition.speed + 'px';
    });
}
function renderGame(milliseconds) {
    moveLine();
    const car = document.querySelector('.car');
    const gameContainerDetails = gameContainer.getBoundingClientRect();
//    console.log("Game container", gameContainerDetails);
    // we can create a animation loop;
    if (player.ArrowDown && carPosition.y > gameContainerDetails.top-50) {
      carPosition.y -= carPosition.speed;
    }

    if (player.ArrowUp && carPosition.y < gameContainerDetails.bottom - 230) {
      carPosition.y += carPosition.speed;
    }

    if (player.ArrowRight && carPosition.x < gameContainerDetails.right - 500) {
      carPosition.x += carPosition.speed;
    }

    if(player.ArrowLeft && carPosition.x > 0) {
        carPosition.x -=carPosition.speed;
    }

    score++;
    scoreId.textContent = score;
    car.style.top = carPosition.y + 'px';
    car.style.left = carPosition.x + 'px';

    window.requestAnimationFrame(renderGame);
};

function startGame () {
    // Hide the start container
    startContainer.classList.add('hide');
    //startContainer.setAttribute('class','hide');

    // create a car
    const car = document.createElement('div');
    car.setAttribute('class', 'car');
    console.log("initlizing car values",carPosition);

    // add it inside game container
    gameContainer.appendChild(car);

     const carTop = car.offsetTop;
     const carLeft = car.offsetLeft;
     carPosition.y = carTop;
     carPosition.x = carLeft;
    var x = 0;
    // create lines
     for(var i =0; i<4; i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = x + 'px';
        gameContainer.appendChild(line);
        x += 150;
     }
        
     const enemyDiv = document.createElement('div');
     enemyDiv.classList.add("enemy");
     enemyDiv.style.top = Math.floor(Math.random() * 400) + "px";
     enemyDiv.style.left = Math.floor(Math.random() * 350) + "px";

     const enemyDiv2 = document.createElement('div');
     enemyDiv2.classList.add("enemy2");
     enemyDiv2.style.top = Math.floor(Math.random() * 300) + "px";
     enemyDiv2.style.left = Math.floor(Math.random() * 150) + "px";

     gameContainer.appendChild(enemyDiv);
     gameContainer.appendChild(enemyDiv2);
     
     // you have to add enemy car 
     // the position of enemy car should be random 

     window.requestAnimationFrame(renderGame);

    // add them in game container
    

}

function handleKeyUp(e) {
    e.preventDefault();
    player[e.key] = true;
}

function handleKeyDown(event) {
  event.preventDefault();
   player[event.key] = false;
}

document.addEventListener('keyup', handleKeyUp);
document.addEventListener("keydown", handleKeyDown);
startContainer.addEventListener('click', startGame);