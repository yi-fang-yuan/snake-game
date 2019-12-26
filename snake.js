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
    score(){
           this.point += 1;

    }
    displayScore(){
        fill(500,240,300);
        text("Highest Score :" +  this.point, 200, 200)
    }

}
class Snake {
    constructor() {
        this.body = [createVector(3, 3)];
        this.direction = createVector(1, 0)
        this.newHead;
    }
    handleKeys(key) {
        if (key === "ArrowUp" ) {
            this.direction = createVector(0, -1);
        } else if (key === "ArrowRight" ) {
            this.direction = createVector(1, 0);
        } else if (key === "ArrowDown" ) {
            this.direction = createVector(0, 1);
        }
        else if (key === "ArrowLeft" ) {
            this.direction = createVector(-1, 0);
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
            return true;
        }
    }
    getFood() {
        if (this.handleFood(food)) {
            return true;
        }
    }

    bordercollision() {
        if (this.body[0].x == posX - 1 || this.body[0].y == posY - 1 || this.body[0].x == -1 || this.body[0].y == -1) {
            return true;
        }

    }
    collision() {
        for (let i = 1; i < this.body.length - 1; i++) {
            if (this.body[0].x == this.body[i].x && this.body[0].y == this.body[i].y) {
                return true;
            }
        }
    }
    checkDir() 
    {
        if (this.body.length > 1) {
        if (this.body[0].x == this.body[1].x && this.body[0].y == this.body[1].y) {


            // if (this.handleKeys(key) === "ArrowUp") {
            //     this.direction = createVector(0, 1);
            // }
            // else if (this.handleKeys(key) === "ArrowDown") {
            //     this.direction = createVector(0,-1);
            // }
            // else if (this.handleKeys(key) === "ArrowRight") {
            //     this.direction = createVector(-1, 0);
            // }
            // else if (this.handleKeys(key) === "ArrowLeft") {
            //     this.direction = createaVector(1,0);
            // }
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
    createCanvas(window.innerWidth, window.innerHeight);
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
        if (snake.getFood()) {
            food.generatePos();
            game.score();
        }
        if (snake.collision()) {
            noLoop();
            game.displayScore();
           
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