var windowW = window.innerWidth - 4;
var windowH = window.innerHeight - 4;
var offset = new Vector2(windowW / 2, windowH / 2);
var old = new Vector2(-1000, -1000);
var strokeColor = new Array(50,50,50);

function Vector2(x, y){
	this.x = x;
	this.y = y;
	this.size = 10;

	this.getX = function(){
		return this.x + offset.x;
	}

	this.getY = function(){
		return (this.y - offset.y) * -1;
	}

	this.show = function(){
		line(this.getX() - this.size, this.getY(), this.getX() + this.size, this.getY());
		line(this.getX(), this.getY() - this.size, this.getX(), this.getY() + this.size);
		stroke(0);
		fill(255);
		textSize(10);
		text(this.x + ", " + this.y, (this.getX() + 5), (this.getY() + 15));
	}

	setInterval("colors()", 100);
}

function setup() {
  	// uncomment this line to make the canvas the full size of the window
  	createCanvas(windowW, windowH);
}

function paint(vect){
	colors();
	line(vect.getX(), vect.getY(), old.getX(), old.getY());
	vect.x *= -1;
	old.x  *= -1;
	line(vect.getX(), vect.getY(), old.getX(), old.getY());
	vect.y *= -1;
	old.y  *= -1;
	line(vect.getX(), vect.getY(), old.getX(), old.getY());
	vect.x *= -1;
	old.x  *= -1;
	line(vect.getX(), vect.getY(), old.getX(), old.getY());
	vect.y *= -1;
	old.x = vect.x;
	old.y = vect.y;
}

function draw() {
	//background(32);
	var a = new Vector2(mouseX - offset.x, (mouseY - offset.y) * -1);
	if(old.x == old.y == -1000){
		old.x = a.getX();
		old.y = a.getY();
		background(32);
	}
	paint(a);
  // draw stuff here
}

function colors(){
	strokeColor[0] = constrain(80, strokeColor[0] + rand(-5,5), 255);
	strokeColor[1] = constrain(80, strokeColor[1] + rand(-5,5), 255);
	strokeColor[2] = constrain(80, strokeColor[2] + rand(-5,5), 255);
	//console.log( strokeColor[0] + " " + strokeColor[1] + " " + strokeColor[2]);
	stroke(strokeColor[0],strokeColor[1],strokeColor[2]);
}

function constrain(min, val, max){
	if(val < min)
		return min;
	if(val > max)
		return max;
	return val;
}

function rand(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}