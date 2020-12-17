const assert = require('chai').assert;
const Robot = require('./Robot');

const robot = new Robot();

//READY TEST

var ready = robot.ready();
assert.equal(ready, false, "Should always init as not ready.");

//POSITION TESTS

var is_val = robot.valid(-1, 1, "N");
assert.equal(is_val, false, "Should be invalid.");

var is_val = robot.valid(1, 5, "S");
assert.equal(is_val, false, "Should be invalid.");

var is_val = robot.valid(1, 1, "X");
assert.equal(is_val, false, "Should be invalid.");

var is_val = robot.valid(3, 2, "X");
assert.equal(is_val, false, "Should be valid.");

//MOVEMENT TESTS

function testXYF() {
	assert.isAtLeast(robot.x, 0, "X should never be below zero.");
	assert.isAtLeast(robot.y, 0, "Y should never be below zero.");

	assert.isAtMost(robot.x, 4, "X should never be greater than four.");
	assert.isAtMost(robot.y, 4, "Y should never be greater than four.");

	assert.typeOf(robot.f, 'string', "F should always be a string.");
}

robot.place(0, 0, "N");
for (i=0; i<10; i++) {
	robot.move();
	testXYF();
}
var x = robot.x;
var y = robot.y;
assert.equal(x, 0, "Should have not changed direction in the X direction.");
assert.equal(y, 4, "Should have not gone past the boundary of the table.");

//ROTATION TESTS

robot.right();
robot.right();
var f = robot.f;
assert.equal(f, "S", "Should have turned 180 degrees clockwise to face south.");

robot.left();
robot.left();
robot.left();
var f = robot.f;
assert.equal(f, "W", "Should have turned 270 degrees anti-clockwise to face west.");

//REPORT TEST

var x = robot.x;
var y = robot.y;
var f = robot.f;

var report = robot.report();

assert.deepEqual(report, [0, 4, "W"]) //Report should return an array of [0, 4, "W"].