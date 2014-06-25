////////////////////
//CANVAS ANIMATION//
////////////////////

/*
TODO
- gradients based on mouse positoin
- make a new viz with NexusUI elements

*/

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

window.addEventListener('resize', resizeCanvas, false );

var cursorXY = {x:0, y:0};

window.onload = function() {
	setup();
	resizeCanvas();
	requestAnimationFrame(draw);
	socket.emit('from client', "hello server" );
};

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
	var tx = event.touches[0].pageX;
	var ty = event.touches[0].pageY;
	// drawCursor(tx, ty);
	cursorXY.x = tx;
	cursorXY.y = ty;
	
	// Stop iOS from bouncing on drag
	event.preventDefault();
}

function mouseMove(event) {
	var mx = event.clientX;
	var my = event.clientY;
	// drawCursor(mx, my);
	cursorXY.x = mx;
	cursorXY.y = my;
}



// var gradient

function draw(){
	//Draw background
	ctx.fillStyle = "rgba(10, 10, 10, 1)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	// //Draw line
	// ctx.beginPath();
	// ctx.moveTo(canvas.width/2,0);
	// ctx.lineTo(canvas.width/2,canvas.height);
	// ctx.strokeStyle = "rgba(255, 255, 255, 1)";
	// ctx.stroke();

	// Draw gradient

var bars = [];

for (var i = 0; i < 18; i++) {
	bars.push(new bar(i));	
}

function bar(yStart) {
	this.yStart = yStart;
	var my_gradient = ctx.createLinearGradient(0,0,0,canvas.height);
	my_gradient.addColorStop(cursorXY.y/canvas.height,"black");
	my_gradient.addColorStop(cursorXY.y/canvas.height,"white");
	ctx.fillStyle = my_gradient;

	ctx.fillRect((canvas.width/18)*yStart,0,(canvas.width/18)-5,canvas.height);
	

}


	drawCursor(cursorXY.x, cursorXY.y);

	// Recursively call draw
	requestAnimationFrame(draw);
}



function drawCursor(x, y) {
	// console.log({moveX: x, moveY: y});
	socket.emit('from client', {moveX: x, moveY: y});
	ctx.beginPath();
	ctx.fillStyle = "rgba(255, 0, 0, 1)";
	ctx.arc(x, y, 20, 0, 2*Math.PI);
	ctx.fill();

}


Math.clip = function(number, min, max) {
  return Math.max(min, Math.min(number, max));
};

// console.log(Math.clip(150, 0, 100));


// // This function sends the data for a circle to the server
// // so that the server can broadcast it to every other user
// function emitCircle( x, y ) {

//   // Each Socket.IO connection has a unique session id
//   // var sessionId = socket.sessionid;
  
//   // An object to describe the circle's draw data
//   var data = { x: x, y: y };

//   // send a 'drawCircle' event with data and sessionId to the server
//   socket.emit( 'drawCircle', data )

//   // Lets have a look at the data we're sending
//   //console.log( data )

// }

// // Listen for 'drawCircle' events
// // created by other users
// socket.on( 'drawCircle', function( data ) {

//   console.log( 'drawCircle event recieved:', data );

//   // Draw the circle using the data sent
//   // from another user
//   drawCursor( data.x, data.y );
  
// })


