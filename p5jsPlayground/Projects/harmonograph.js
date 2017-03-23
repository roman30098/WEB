var gear = function(x, y, radius, angle){
	this.position = new p5.Vector(x, y);
	this.radius = radius;
	this.angle = angle;
	this.circlePointPosition = new p5.Vector(0, 0);
	this.calcCirclePointPosition();
}

gear.prototype.draw = function(){
	ellipse(this.position.x, this.position.y, this.radius*2, this.radius*2);
	line(this.position.x, this.position.y, this.position.x + this.circlePointPosition.x, this.position.y + this.circlePointPosition.y);
	ellipse(this.position.x + this.circlePointPosition.x, this.position.y + this.circlePointPosition.y, 500, 500);
	drawPoint(this.position.x + this.circlePointPosition.x, this.position.y + this.circlePointPosition.y);
}

gear.prototype.rotate = function(ang){
	this.angle += ang;
	this.calcCirclePointPosition();
}

gear.prototype.calcCirclePointPosition = function(){
	this.circlePointPosition = polarToCartesian(this.radius, this.angle);
}

var gear1 = new gear(200, 360, 25, 45);
var gear2 = new gear(500, 360, 50, 300);

function setup() {
  	createCanvas(720, 480);
  	stroke(40);
  	noFill();
}

function draw(){
	background(255);
	gear1.draw();
	gear1.rotate(1);
	gear2.draw();
	gear2.rotate(1.1);
	var v1 = new p5.Vector(gear1.position.x + gear1.circlePointPosition.x, gear1.position.y + gear1.circlePointPosition.y);
	var v2 = new p5.Vector(gear2.position.x + gear2.circlePointPosition.x, gear2.position.y + gear2.circlePointPosition.y);
	//calcCirclesIntersets(v1, v2, 500, 500);
}

function polarToCartesian(radius, deg){
	var x = radius * Math.cos(degreesToRadians(deg));
	var y = radius * Math.sin(degreesToRadians(deg));
	return new p5.Vector(x, y);
}

function degreesToRadians(deg){
	return deg * (Math.PI/180);
}

function calcCirclesIntersets(Vc1, Vc2, R, r){
	var d = sqrt(pow(Vc2.x - Vc1.x, 2) + pow(Vc2.y - Vc1.y, 2));
	var x = (pow(d,2) - pow(r,2) + pow(R,2))/(2*d);
	var y = sqrt(pow(R,2) - pow(x, 2));
	console.log(d + " " + x + " " +y);
	drawPoint(y,x);
}

function drawPoint(x, y){
	fill(11, 5, 150);
	ellipse(x, y, 5, 5);
	noFill();
}