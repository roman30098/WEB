var nodes = 20;
var nodeEpsilon = 150;
var connectionsUpdateDelay = 10;

//---- Do not change ----
var nodeLayer;
var connectionsLayer;
var nodeTab = [];
var connectionsTab = [];
var freeNodes = 0;
var nodesConnections = 0;
var connectionsUpdateTimer = 0;

var pitagorasSkips = 0;
var pitagorasFail = 0;
var pitagorasOk = 0;
//-----------------------

var Node = function(x, y){
	this.coord = new p5.Vector(x, y);
	this.size = nodeEpsilon;
	this.circleSize = 20;
    this.speed = new p5.Vector(0, 0);
    this.color = {r: random(200), g: random(200), b: random(200)};
    this.connection = false;
}

Node.prototype.draw = function(){
	//nodeLayer.stroke(this.color.r+5, this.color.g+5, this.color.b+5);
	//ellipse(this.coord.x, this.coord.y, this.size, this.size);
	nodeLayer.fill("rgba(150, 80, 150, 0.8)");//this.color.r, this.color.g, this.color.b);
	nodeLayer.ellipse(this.coord.x, this.coord.y, this.circleSize, this.circleSize);

	

	if(this.connection == true){
		connectionsLayer.noFill();
		connectionsLayer.stroke("rgba(150, 80, 150, 0.3)");
		connectionsLayer.ellipse(this.coord.x, this.coord.y, this.circleSize+10, this.circleSize+10);
	}

	connectionsLayer.noStroke();
	connectionsLayer.fill("rgba(150, 80, 150, 0.1)");
	connectionsLayer.ellipse(this.coord.x, this.coord.y, this.size, this.size);
	connectionsLayer.noFill();
};

Node.prototype.move = function(){
	var acc = 1;
    var maxSpeed = 0.5;
    var mapOffset = -10;
	var randomX = random(acc)-acc/2;
	var randomY = random(acc)-acc/2;
    this.speed.x += randomX/10;
    this.speed.y += randomY/10;
    
    //Speed Stuff
    if(this.speed.x > maxSpeed)
        this.speed.x = maxSpeed;
    if(this.speed.x < -maxSpeed)
        this.speed.x = -maxSpeed;
    if(this.speed.y > maxSpeed)
        this.speed.y = maxSpeed;
    if(this.speed.y < -maxSpeed)
        this.speed.y = -maxSpeed;
	this.coord.x += this.speed.x;
	this.coord.y += this.speed.y;

	//Edges bounce
	if(this.coord.x > width + mapOffset){
		this.coord.x = width + mapOffset;
        this.speed.x *= -1;
    }		
	if(this.coord.x < -mapOffset){
		this.coord.x = -mapOffset;
        this.speed.x *= -1;
    }
	if(this.coord.y > height + mapOffset){
		this.coord.y = height + mapOffset;
        this.speed.y *= -1;
    }			
	if(this.coord.y < -mapOffset){
		this.coord.y = -mapOffset;
        this.speed.y *= -1;
    }
}

function setup() {
  	createCanvas(innerWidth, innerHeight);
  	frameRate(20);
  	stroke(0);
  	strokeWeight(0);
  	textSize(15);
  	fill(0);
  	createNodes();
    nodeLayer = createGraphics(innerWidth, innerHeight);
    nodeLayer.noStroke();
    connectionsLayer = createGraphics(innerWidth, innerHeight);
    connectionsLayer.strokeWeight(3);
}

function createNodes(){
	for(var i=0; i<nodes; i++)
		nodeTab.push(new Node(random(innerWidth), random(innerHeight)));
}

function updateConnections(){
	connectionsTab = [];
	pitagorasSkips = 0;
	pitagorasOk = 0;
	pitagorasFail = 0;
	freeNodes = 0;
	nodesConnections = 0;

	for(var i=0; i<nodes; i++)
		nodeTab[i].connection = false;

	for(var i=0; i<nodes; i++){
		var connections = 0;

		for(var j=i+1; j<nodes; j++){
			//connectionsLayer.stroke(i*2+20, j*2+20, i*j+20);
			if(Math.abs(nodeTab[i].coord.x - nodeTab[j].coord.x) < nodeTab[i].size && Math.abs(nodeTab[i].coord.y - nodeTab[j].coord.y) < nodeTab[i].size){
				if(pitagoras(nodeTab[i].coord.x, nodeTab[i].coord.y, nodeTab[j].coord.x, nodeTab[j].coord.y) < nodeTab[i].size){
					connectionsTab.push({f: i, s: j});
					connections++;
					pitagorasOk++;
					nodeTab[i].connection = true;
					nodeTab[j].connection = true;
				} else {
					pitagorasFail++;
				}
			} else {
				pitagorasSkips++;
			}
		}


		if(connections == 0)
			freeNodes++;
		else
			nodesConnections += connections;

		nodeTab[i].circleSize = (connections*3 + 15);
	}	
}

function drawConnections(){
	connectionsLayer.strokeWeight(3);
	connectionsLayer.stroke(250, 120, 150);
	for(var i = 0; i < connectionsTab.length; i++){
		var ax, ay, bx, by;
		
		connectionsLayer.line(nodeTab[connectionsTab[i].f].coord.x, nodeTab[connectionsTab[i].f].coord.y, nodeTab[connectionsTab[i].s].coord.x, nodeTab[connectionsTab[i].s].coord.y);
	}
}

function drawNodes(){
	for(var i = 0; i < nodeTab.length; i++)
		nodeTab[i].draw();
}

function moveNodes(){
	for(var i = 0; i < nodeTab.length; i++)
		nodeTab[i].move();
}

function draw(){
	nodeLayer.background("rgba(255,255,255, 0.3)");
	connectionsLayer.background("rgba(255,255,255, 0.4)");

	moveNodes();
	
	if(connectionsUpdateTimer <= 0){
		updateConnections();
		connectionsUpdateTimer = connectionsUpdateDelay;
	} else {
		connectionsUpdateTimer--;
	}

	drawConnections();
	drawNodes();

	background(255);
	//connectionsLayer.mask(nodeLayer);
	image(connectionsLayer);
	blendMode(MULTIPLY);
	image(nodeLayer);
	//image(nodeLayer, 0, 0, 200, 200);

	text("Pit Ok/Fail/Skip: "+pitagorasOk+" / "+pitagorasFail+" / "+pitagorasSkips, 0, height - 80);
	text("Free Nodes: "+freeNodes, 0, height - 20);
	text("Connections: "+nodesConnections, 0, height - 5);
	text("Nodes: "+nodes, 0, height - 35);
	text("Node Size: "+nodeEpsilon, 0, height - 50);
	text("Cnn Per Node: "+round(nodesConnections/nodes*100)/100, 0, height - 65);
}

function pitagoras(x1, y1, x2, y2){
	return sqrt(pow(x2-x1,2)+pow(y2-y1,2));
}