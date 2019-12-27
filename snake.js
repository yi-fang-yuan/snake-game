
let posX;
let posY;
let gridWidth = 20;
let foodPos;
let food;
let snake;
let game;
class Game {
    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.point = 0;
    }
    score() {
        this.point += 1;

    }
    displayScore() {
        fill(500, 240, 300);
        textAlign(CENTER)
        textSize(100)
        textStyle(ITALIC)
        text("Highest Score : " + this.point, width/2, height/2)
    }

}
class Snake {
    constructor() {
        this.body = [createVector(3, 3)];
        this.direction = createVector(1, 0)
        this.newHead;
    }
    handleKeys(key) {
        let newDirection = createVector(0,0);
        if (key === "ArrowUp" ) {
            newDirection = createVector(0, -1);
        }  if (key === "ArrowRight") {
            newDirection = createVector(1, 0);
        }  if (key === "ArrowDown") {
            newDirection = createVector(0, 1);
        }
         if (key === "ArrowLeft") {
            newDirection = createVector(-1, 0);
        }
        if (this.direction.x + newDirection.x == 0 && this.direction.y + newDirection.y == 0) {
            this.direction = this.direction;
        }
        else {
            this.direction = newDirection; 
        }
    }

    display() {
        for (let part of this.body) {
            let scaleGraph = p5.Vector.mult(part, gridWidth);
            fill(250);
            square(scaleGraph.x, scaleGraph.y, gridWidth);

        }
    }
    update() {
        this.newHead = p5.Vector.add(this.body[0], this.direction);
        this.body.unshift(this.newHead);
        this.body.pop();
    }
    handleFood(food) {
        if (this.body[0].x == food.x && this.body[0].y == food.y) {
            this.body.push(this.newHead);
            while (this.checkOnBody(food.x, food.y)) {
                food.generatePos();
            }
            return true;

        }
    }
    getFood() {
        if (this.handleFood(food)) {
            return true;
        }
    }

    bordercollision() {
        if (this.body[0].x == posX || this.body[0].y === posY || this.body[0].x == -1 || this.body[0].y == -1) {
            return true;
        }

    }
    collision() {
        if (this.checkOnBody(this.body[0].x , this.body[0].y , 4)) {
            return true;
        }
        else {
            return false; 
        }
    }
    checkOnBody(x, y, startIndex = 0) {
        for (let i = startIndex; i < this.body.length; i++) {
            if (x == this.body[i].x && y == this.body[i].y) {
                return true;
            }
            else {
                return false;
            }
        }
    }
}

class Food {
    constructor() {
        this.x;
        this.y;
    }
    generatePos() {
        this.x = Math.floor(Math.random() * posX);
        this.y = Math.floor(Math.random() * posY);
    }
    display() {
        fill(250);
        square(this.x * gridWidth, this.y * gridWidth, gridWidth);
    }
}


function setup() {
    createCanvas(window.innerWidth, 1000);
    posX = width / gridWidth;
    posY = height / gridWidth;
    food = new Food();
    food.generatePos();
    snake = new Snake();
    game = new Game();
}
function draw() {
    if (frameCount % 5 == 0) {
        background(0);
        food.display();
        snake.display();
        snake.handleFood(food);
        snake.update();
        if (snake.collision()) {
            noLoop();
            game.displayScore();
        }
        if (snake.getFood()) {
            game.score();
        }
        if (snake.bordercollision()) {
            noLoop();
            game.displayScore();

        }
    }
}
function keyPressed(e) {
    snake.handleKeys(e.key);
}
