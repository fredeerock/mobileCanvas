////////////////////
//CANVAS ANIMATION//
////////////////////

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var mx;
var my;

window.addEventListener('resize', setup, false );
canvas.addEventListener('mousemove', getMousePos, false);
window.addEventListener('touchmove', getMousePos, false);


window.onload = function() {
	setup();
	requestAnimationFrame(draw);
}

function getMousePos(event) {
	mx = event.clientX;
	my = event.clientY;
	drawMouse();
	socket.emit('from client', { clientMouseX: mx, clientMouseY: my });
}

function drawMouse() {
	ctx.beginPath();
	ctx.fillStyle = "rgba(255, 255, 255, 1)";
	ctx.arc(mx, my, 50, 0, 2*Math.PI);
	ctx.fill();
}

function setup(){
	canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
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

	requestAnimationFrame(draw);
}



