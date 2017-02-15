function Clock(){
	this.time = null;
	this.hourFDigitGroup = null;
	this.hourSDigitGroup = null;
	this.minuteFDigitGroup = null;
	this.minuteSDigitGroup = null;

	this.groupsAmount = 4;
	this.groups = [];

	this.createClock = function(_groupsAmount){
		this.groups[0] = new CellGroup("G0", 3);
		this.groups[0].createCellGroup();
		this.groups[1] = new CellGroup("G1", 9);
		this.groups[1].createCellGroup();
		this.groups[2] = new CellGroup("G2", 6);
		this.groups[2].createCellGroup();
		this.groups[3] = new CellGroup("G3", 9);
		this.groups[3].createCellGroup();
		this.groups[4] = new CellGroup("G4", 6);
		this.groups[4].createCellGroup();
		this.groups[5] = new CellGroup("G5", 9);
		this.groups[5].createCellGroup();
	};

	this.update = function(){
		this.time = new Date();
		var sec = this.time.getSeconds();
		var min = this.time.getMinutes();
		var hour = this.time.getHours();
		this.showTime(hour, min, sec);
	};

	this.showTime = function(hour, min, sec){
		this.groups[0].setCellsState(Math.floor(hour/10));
		this.groups[1].setCellsState(hour%10);
		this.groups[2].setCellsState(Math.floor(min/10));
		this.groups[3].setCellsState(min%10);
		this.groups[4].setCellsState(Math.floor(sec/10));
		this.groups[5].setCellsState(sec%10);
	}
};

function CellGroup(_name, _cellsAmount){
	this.name = _name;
	this.cellsAmount = _cellsAmount;
	this.cells = [];
	this.activeCells = [];
	this.inactiveCells = [];

	this.createCellGroup = function(){
		$("#clock").append("<div id="+this.name+" class='group' style='width: "+Math.ceil(this.cellsAmount/3) * 110+"px'></div>");
		this.createCells();
	};

	this.createCells = function(){
		for(var i = 0; i < this.cellsAmount; i++){
			this.cells[i] = new Cell(this.name+i, this.name);
			this.cells[i].createCell();
			this.inactiveCells.push(i);
		}
	};

	this.setCellsState = function(desiredActiveCellsAmount){
		var activeCellsAmount = this.activeCells.length;
		if(activeCellsAmount < desiredActiveCellsAmount){
			for(var i = 0; i < desiredActiveCellsAmount - activeCellsAmount; i++){
				var random = Math.floor(Math.random() * this.inactiveCells.length);
				var cellID = this.inactiveCells[random];
				this.inactiveCells.splice(random, 1);
				this.activeCells.push(cellID);
				this.cells[cellID].activate();
			}
		} else if (activeCellsAmount > desiredActiveCellsAmount){
			for(var i = 0; i < activeCellsAmount - desiredActiveCellsAmount; i++){
				var random = Math.floor(Math.random() * this.activeCells.length);
				var cellID = this.activeCells[random];
				this.activeCells.splice(random, 1);
				this.inactiveCells.push(cellID);
				this.cells[cellID].deactivate();
			}
		}
	};
};

function Cell(_name, _parent){
	this.state = 0;
	this.name = _name;
	this.parent = _parent;

	this.createCell = function(){
		$("#"+this.parent).append("<div id="+this.name+" class='cell'></div>");
	};

	this.activate = function(){
		$("#"+this.name).addClass("cellActive");
	};

	this.deactivate = function(){
		$("#"+this.name).removeClass("cellActive");
	};
};

var clock = new Clock();
clock.createClock();

setInterval(function(){
	clock.update();
}, 1000);