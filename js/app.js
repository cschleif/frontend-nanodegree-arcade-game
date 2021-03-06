
// Initialize game variables
var score = 0;
var lives = 3;
var level = 0;


// Class constructor for Enemy
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;

    //Height and width to detect collisions
    this.width = 80;
    this.height = 50;

    //Speed
    this.speed = speed;

    //Enemy image
    this.sprite = 'images/enemy-bug.png';
};

//Update enemy posiiton
Enemy.prototype.update = function(dt) {
    if(this.x < 500){
        this.x += (dt) * this.speed;
    }
    else {
        this.x = -200;
    }
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Player class constructor
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.height = 75;
    this.width = 50;
    this.sprite = 'images/char-boy.png';
};

//Update player position once player reaches water
Player.prototype.update = function(dt) {
    //Ensure game runs at same speed on all computers.
    this.x * (dt);
    this.y * (dt);

    //Reset player when reaches water
    if (this.y < 0){
        this.reset();
        level = level + 1;
        score = score + 10;
        document.getElementById("level").innerHTML = "Level: " + level;
        document.getElementById("score").innerHTML = "Score: " + score;
    }
};

//Draw player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
    if (direction === 'left' && this.x > 0) {
        this.x -= 101;
    }
    if (direction === 'right' && this.x < 400) {
        this.x += 101;
    }
    if (direction === 'up' && this.y > 0) {
        this.y -= 85;
    }
    if (direction === 'down' && this.y < 400) {
        this.y += 85;
    }
};

// Instantiates enemy objects in array
var allEnemies = [
new Enemy(-200, 60, 170),
new Enemy(-200, 140, 265),
new Enemy(-200, 230, 225)
];

//Instantiates player
var player = new Player(202, 400);



//Resets player
Player.prototype.reset = function() {
    this.x = 202;
    this.y = 400;
};

// Player loses life
Player.prototype.lives = function() {
   lives = lives - 1;
    document.getElementById("lives").innerHTML = "Lives left: " + lives;
};

//Collision
function checkCollisions(allEnemies, player) {
    for (var i = 0; i < allEnemies.length; i++) {
        if (allEnemies[i].x < player.x + player.width &&
            allEnemies[i].x + allEnemies[i].width > player.x &&
            allEnemies[i].y < player.y + player.height &&
            allEnemies[i].height + allEnemies[i].y > player.y){
            player.reset(202, 400);
            lives = lives - 1;
         }
            document.getElementById("lives").innerHTML = "Lives: " + lives;
        if (lives < 0) {
                confirm("Game Over!");
        }
        if (lives < 0) {
                return lives = 3;
        }
    }
};


//Listens for key presses
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
