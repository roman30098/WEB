var wW, wH;

var walker = function(x, y) {
	this.x = x;
	this.y = y;
}

walker.prototype.display = function() {
	strokeWeight(0);
	fill(Math.floor(Math.random()*128),0,Math.floor(Math.random()*255));
	rect(this.x*4, this.y*4, 4, 4)
}

walker.prototype.step = function() {
	var choiceX = Math.floor(Math.random()*3);
	var choiceY = Math.floor(Math.random()*3);

	this.x += choiceX - 1;
	this.y += choiceY - 1;
}

var a = new walker(window.innerWidth/8, window.innerHeight/8);

function setup() {
  // uncomment this line to make the canvas the full size of the window
  createCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
	a.step();
	a.display();
  // draw stuff here
}