////////////////////
//CANVAS ANIMATION//
////////////////////

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var mx;
var my;

window.addEventListener('resize', resizeCanvas, false );

window.onload = function() {
	setup();
	resizeCanvas();
	requestAnimationFrame(draw);
	socket.emit('from client', "hello server" );
}

function setup(){
	// Touch Events
	canvas.addEventListener("touchstart", touchStart, false);
	canvas.addEventListener("touchend", touchEnd, false);
	canvas.addEventListener("touchcancel", touchCancel, false);
	canvas.addEventListener("touchleave", touchEnd, false);
	canvas.addEventListener("touchmove", touchMove, false);

	// Mouse Events
	canvas.addEventListener('mousemove', mouseMove, false);
}

function resizeCanvas(event) {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

function touchStart(event) {
	console.log( "handleStart" );
}

function touchEnd(event) {
	console.log( "handleEnd" );
}

function touchCancel(event) {
	console.log( "handleCancel" );
}

function touchMove(event) {
	tx = event.touches[0].pageX;
	ty = event.touches[0].pageY;
	
	ctx.beginPath();
	ctx.fillStyle = "rgba(255, 255, 255, 1)";
	ctx.arc(tx, ty, 50, 0, 2*Math.PI);
	ctx.fill();

	console.log({touchMoveX: tx, touchMoveY: ty});
	event.preventDefault();
}

function mouseMove(event) {
	mx = event.clientX;
	my = event.clientY;
	drawCursor();
}

function drawCursor() {
	socket.emit('from client', { clientMouseX: mx, clientMouseY: my });
	ctx.beginPath();
	ctx.fillStyle = "rgba(255, 255, 255, 1)";
	ctx.arc(mx, my, 50, 0, 2*Math.PI);
	ctx.fill();
}

function draw(){
	//Draw background
	ctx.fillStyle = "rgba(10, 10, 10, 0.05)"
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	//Draw line
	ctx.beginPath();
	ctx.moveTo(canvas.width/2,0);
	ctx.lineTo(canvas.width/2,canvas.height);
	ctx.strokeStyle = "rgba(255, 255, 255, 1)";
	ctx.stroke();

	// Recursively call draw
	requestAnimationFrame(draw);
}



