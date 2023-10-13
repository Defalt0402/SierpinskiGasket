var WIDTH = 800;
var HEIGHT = 800;
var STARTED = false;
var topCanvas;
var pointX;
var pointY;
var corner;
var triX1 = 30;
var triX2 = WIDTH-30;
var triX3 = (triX1 + triX2)/2
var triY1 = (HEIGHT/10)*1.5;
var triY2 = (HEIGHT/10)*1.5;
var triY3 = (triX2-triX1)*Math.sin(1.0472);

function setup() { 
  STARTED = false;
  bottomCanvas = createCanvas(WIDTH,HEIGHT);
  topCanvas = createGraphics(WIDTH, HEIGHT);
  bottomCanvas.parent("canvasContainer");
  topCanvas.parent("canvasContainer");
  topCanvas.clear();
  background(120,200,200);
  
}

function draw() {
  strokeWeight(1);
  stroke(60, 140, 140);
  fill(255);
  triangle(triX1, triY1, triX2, triY2, triX3, triY3);
  
  
  image(topCanvas, 0, 0);
  if (STARTED){
    for (let i = 0; i < 33; i++){
      nextPoint();
    }
  }
}

function mousePressed(){
  if (!STARTED) {
    topCanvas.clear();
    topCanvas.fill(0);
    pointX = mouseX;
    pointY = mouseY;
    topCanvas.ellipse(mouseX, mouseY, 4, 4);
    STARTED = true;
  }
}


function nextPoint() {
  corner = Math.floor(Math.random() * 6); 
  if (corner == 1 || corner == 2){
    pointX = (pointX + triX1)/2;
    pointY = (pointY + triY1)/2;
  } else if (corner == 3 || corner == 4){
    pointX = (pointX + triX2)/2;
    pointY = (pointY + triY2)/2;
  } else {
    pointX = (pointX + triX3)/2;
    pointY = (pointY + triY3)/2;
  }
  var length = triX2-triX1;
  var r = map((((pointX-triX1) + (pointY-triY1))/2), length, 0, 0, 255);
  var g = map((((triX2-pointX) + (pointY-triY2))/2), length, 0, 0, 255);
  if (pointX < triX3){
    var b = map((((triX3-pointX) + (triY3-pointY))/2), length, 0, 0, 255);
  } else {
    var b = map((((pointX-triX3) + (triY3-pointY))/2), length, 0, 0, 255);
  }
  
  topCanvas.noStroke();
  topCanvas.fill(r,g,b);
  topCanvas.ellipse(pointX, pointY, 1, 1);
}

function start() {
  var x = Math.floor(Math.random() * (triX2-triX1)) + triX1;
  var y = Math.floor(Math.random() * (triY3-triY1)) + triY1;
  pointX = mouseX;
  pointY = mouseY;
  topCanvas.ellipse(mouseX, mouseY, 4, 4);
  STARTED = true;
}
