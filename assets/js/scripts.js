var canvas, ctx, x, y, walkers = [];
var step = 10, 
  linew = 1,
  quantity = 30, 
  btnPlayPause,
  shouldDraw = true,
  colors = [
    "rgba(255, 0, 0, .1)",
    "rgba(255,127 ,0 , .1)",
    "rgba(255,255 ,0 , .1)",
    "rgba(0,255 ,0, .1)",
    "rgba(0,0,255 , .1)",
    "rgba(75,0,130,.1)",
    "rgba(143,0,255 , .1)"
  ];

var Walker = function(x, y, color) {
  this.x = x;
  this.y = y;
  this.color = color;
}

Walker.prototype.update = function(x, y) {
  this.x = x;
  this.y = y;
}

function rand(max) {
  return Math.floor((max) * Math.random());
}

function init() {
  canvas = document.getElementById('mycanvas');				
  canvas.height = window.innerHeight - 5;
  canvas.width = window.innerWidth;

  x = Math.floor(canvas.width /2 );
  y = Math.floor(canvas.height / 2);

  ctx = canvas.getContext("2d");
  ctx.lineWidth = linew;

  for (var i = 0; i < quantity; i++) {
    walkers.push(new Walker(x, y, colors[rand(7)]));
  }
}

function drawEach(walker) {
  var x = walker.x, y = walker.y;
  var num = Math.random();

  if ( num < 0.25) {
    if(walker.x < canvas.width) x += step;
  } else if (num < 0.5) {
    if(walker.x  > 0) x -= step;
  } else if (num < 0.75) {
    if(walker.y < canvas.height) y += step;
  } else {
    if(walker.y > 0) y -= step;
  }

  ctx.strokeStyle = walker.color;

  ctx.beginPath();
  ctx.moveTo(walker.x, walker.y);
  ctx.lineTo(x, y);
  ctx.stroke();

  walker.update(x, y);					
}

function draw() {
  if (shouldDraw) {
    walkers.forEach(drawEach);
    requestAnimationFrame(draw);
  }
}

function handler(e) {
  e.preventDefault();

  if (shouldDraw) {
    shouldDraw = false;
    btnPlayPause.innerHTML = 'Play';
  } else {
    shouldDraw = true;
    btnPlayPause.innerHTML = 'Pause';
    requestAnimationFrame(draw);
  }
}

window.onload = function() {
  init();
  requestAnimationFrame(draw);
  btnPlayPause = document.getElementById('btnPlayPause');
  btnPlayPause.addEventListener('click', handler);

  setTimeout(function() {
    // stop after 1min
    shouldDraw = false;
    console.log('We stop walkers because they are tired :(');
  }, 60000);
}