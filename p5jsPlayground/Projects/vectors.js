function Vector2(x, y){
	this.x = x;
	this.y = y;
	this.size = 10;

	this.show = function(){
		stroke(255,0,0);
		line(this.x - this.size, this.y, this.x + this.size, this.y);
		line(this.x, this.y - this.size, this.x, this.y + this.size);
		stroke(0,0,0);
		textSize(10);
		//text(this.x + ", " + this.y, this.x + 5, this.y + 15);
	}
}

function cLine(x, y){
	this.x = x;
	this.y = y;
	this.length = 30;
}

cLine.prototype.lookAt = function(x, y) {
	var dis = new Vector2(x - this.x, y - this.y);
	var pit = Math.sqrt(Math.pow( dis.x, 2) + Math.pow( dis.y, 2 ));
	var ratio = this.length / pit;
	var coord = new Vector2( this.x + dis.x * ratio, this.y + dis.y * ratio);
	//coord.show();
	line(this.x, this.y, coord.x, coord.y);
	return 0;							
}

function setup() {
  	createCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
	background(255);
	var rows = 20;
	var dis = new Vector2(window.innerWidth/rows, window.innerHeight/rows);
	stroke(0, 0, 0);

	for(var i=0; i<rows*rows; i++)
	{
		var line = new cLine(i%rows * dis.x + dis.x/2, Math.floor(i/rows) * dis.y + dis.y/2);
		line.lookAt(mouseX, mouseY);
	}
}