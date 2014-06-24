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
	canvas.addEventListener("touchstart", handleStart, false);
	canvas.addEventListener("touchend", handleEnd, false);
	canvas.addEventListener("touchcancel", handleCancel, false);
	canvas.addEventListener("touchleave", handleEnd, false);
	canvas.addEventListener("touchmove", handleMove, false);

	// Mouse Events
	canvas.addEventListener('mousemove', drawMouse, false);
}

function resizeCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

function handleStart (argument) {
	console.log( "handleStart" );
}

function handleEnd (argument) {
	console.log( "handleEnd" );
}

function handleCancel (argument) {
	console.log( "handleCancel" );
}

function handleMove (argument) {
	console.log( "handleMove" );
	event.preventDefault();
	drawMouse();
}

function drawMouse() {
	mx = event.clientX;
	my = event.clientY;
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



