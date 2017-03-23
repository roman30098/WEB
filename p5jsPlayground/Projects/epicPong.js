var paddleA, paddleB, wallTop, wallBottom;
var paddleSpeed = 4;
var scoreA = 0;
var scoreB = 0;

var ball = new Array(0);
var ballCount = 0;

function setup(){
	frameRate(60);
	createCanvas(640, 480);

	paddleB = new Paddle();
	paddleB.make(width-30, 240, 10, 80);
	paddleB.setColor("#FFF");

	paddleA = new Paddle();
	paddleA.make(30, 240, 10, 80);
	paddleA.setColor("#FFF");

	wallTop = new Wall();
	wallTop.make(width/2, -25, width, 50);

	wallBottom = new Wall();
	wallBottom.make(width/2, height+25, width, 50);

	newBall(width/2, height/2, 180);

	textFont("Arial", 200);

	startGame();
}

function draw(){
	background(32);

	for(var i = 0; i < ballCount; i++)
		if(ball !== 0)
			ball[i].move();

	handleInputs();
	drawScore();
	drawSprites();
}

function drawScore(){
	fill(64);
	textAlign(RIGHT);
	text(scoreA, width/2 -30, height/2+60);
	textAlign(LEFT);
	text(scoreB, width/2 +30, height/2+60);
	return 0;
}

function handleInputs(){
	if(keyDown("W"))
		paddleA.sprite.position.y -= paddleSpeed;
	if(keyDown("S"))
		paddleA.sprite.position.y += paddleSpeed;
	if(keyDown(UP_ARROW))
		paddleB.sprite.position.y -= paddleSpeed;
	if(keyDown(DOWN_ARROW))
		paddleB.sprite.position.y += paddleSpeed;

	paddleA.sprite.position.y = constrain(paddleA.sprite.position.y, 40, height-40);
	paddleB.sprite.position.y = constrain(paddleB.sprite.position.y, 40, height-40);
	return 0;
}

function startGame(){

	//paddleA.position.y = paddleB.position.y = height/2;
}

function newBall(x, y, direction){
	ball[ballCount] = new Ball();
	ball[ballCount].make(x, y, 10, 10, 10, direction);
	ballCount++;
	console.log(ballCount);
}

function killBall(id){
	ball[id] = 0;
}