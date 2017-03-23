function Ball(){
	this.sprite;
	this.speed;
}

Ball.prototype.make = function(x, y, height, width, speed, direction){
	this.sprite = createSprite(x, y, height, width);
	this.speed = speed;
	this.sprite.maxspeed = this.speed;
	this.sprite.setSpeed(this.speed, direction);
}

Ball.prototype.move = function(){
	this.sprite.bounce(wallTop.sprite);
	this.sprite.bounce(wallBottom.sprite);

	if(this.sprite.bounce(paddleA.sprite)){
		var ang = (this.sprite.position.y - paddleA.sprite.position.y) / 3;
		this.sprite.setSpeed(this.speed, this.sprite.getDirection() + ang);
	}

	if(this.sprite.bounce(paddleB.sprite)){
		var ang = (this.sprite.position.y - paddleB.sprite.position.y) / 3;
		this.sprite.setSpeed(this.speed, this.sprite.getDirection() - ang);
	}

	if(this.sprite.position.x > width+10){
		scoreA++;
		startGame();
	}

	if(this.sprite.position.x < -10){
		scoreB++;
		startGame();
	}
}

Ball.prototype.setPosition = function(x, y){
	this.sprite.position.x = x;
	this.sprite.position.y = y;
}

Ball.prototype.setColor = function(color){
	this.sprite.shapeColor = color;
}

//
//	PADDLE CLASS
//

function Paddle(){
	this.sprite;
	this.speed;
}

Paddle.prototype.make = function(x, y, height, width, speed){
	this.sprite = createSprite(x, y, height, width);
	this.speed = speed;
	this.sprite.immovable = true;
}

Paddle.prototype.setColor = function(color){
	this.sprite.shapeColor = color;
}

//
//	WALL CLASS
//

function Wall(){
	this.sprite;
}

Wall.prototype.make = function(x, y, width, height){
	this.sprite = createSprite(x, y, width, height);
	this.sprite.immovable = true;
}