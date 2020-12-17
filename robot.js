module.exports = class Robot {
	constructor() {
		//No init variables needed, robot starts up in the air.
		this.x = null;
		this.y =  null;
		this.f = null;
		//The robot stores a mapping for how move, right and left work depending on the heading.
		this.vmap = {
			"N": [0, 1],
			"S": [0, -1],
			"E": [1, 0],
			"W": [-1, 0]
		};
		this.rmap = {
			"N": "E",
			"E": "S",
			"S": "W",
			"W": "N"
		};
		this.lmap = {
			"N": "W",
			"W": "S",
			"S": "E",
			"E": "N"
		};
	}
	//Checks if the robot has an x, y and f value.
	ready() {
		if (this.x != null && this.y != null && this.f != null) {
			return true;
		} else {
			return false;
		}
	}
	//Checks if both position and heading are valid from a preapproved list.
	valid(x, y, f) {
		let positions = [0, 1, 2, 3, 4];
		let headings = ["N", "S", "E", "W"];
		if (positions.includes(x) && positions.includes(y)) {
			if(headings.includes(f)) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
	//Changes the robot's x, y and f values, given they're valid.
	place(x, y, f) {
		let is_valid = this.valid(x, y, f);
		if (is_valid) {
			console.log("VALID POSITION AND HEADING");
			this.x = x;
			this.y = y;
			this.f = f;
			console.log("ROBOT HAS BEEN PLACED AT:", this.x, this.y, "HEADING:", this.f);
		} else {
			console.log("UNABLE TO PLACE ROBOT THERE");
		}
	}
	/*Moves the robot one unit in the direction according to the internal mapping vector. Also
	takes steps to ensure each move is valid*/
	move() {
		let is_ready = this.ready();
		if (!is_ready) {
			console.log("PLEASE PLACE THE ROBOT BEFORE CONTINUING");
			return;
		}
		let pos = [this.x, this.y];
		let vec = this.vmap[this.f];
		
		let x = pos[0] + vec[0];
		let y = pos[1] + vec[1];
		
		let is_valid = this.valid(x, y, this.f);
		
		if (is_valid) {
			this.x = x;
			this.y = y;
			console.log("VALID MOVE TO:", x, y);
		} else {
			console.log("INVALID MOVE");
		}
	}
	//Adjusts the robot's heading based on the internal right rotation mapping.
	right() {
		let is_ready = this.ready();
		if (!is_ready) {
			console.log("PLEASE PLACE THE ROBOT BEFORE CONTINUING");
			return;
		}
		this.f = this.rmap[this.f];
	}
	//Adjusts the robot's heading based on the internal left rotation mapping.
	left() {
		let is_ready = this.ready();
		if (!is_ready) {
			console.log("PLEASE PLACE THE ROBOT BEFORE CONTINUING");
			return;
		}
		this.f = this.lmap[this.f];
	}
	//Prints out and returns internal x, y, and f values.
	report() {
		console.log("OUTPUT: ", this.x, this.y, this.f);
		return [this.x, this.y, this.f];
	}
	
}