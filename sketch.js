let audio; 

//arrays for three categories of colours depending on mood 
let colours = {
  gentle: [200, 200, 200], 
  happy: [255, 105, 180],
  bright: [255, 69, 0],  
};

let canvas;
let currentColors = colours.gentle; // Begin sketch with gentle colours
let steps = 360;
let r = 100; //base radius for the shapes
let noiseScale = 0.002;
let noiseAmount = 300;
let shapeType = 'circle'; //begin sketch with circle shape

function preload() {
  audio = loadSound('audio.mp3');
}

function setup() {
  canvas = createCanvas(600, 400);
  canvas.position(0, 150); //position the canvas below the buttons so it is an outcome of the input
  noFill();
  stroke(255, 50);
  background(200);

  // Tempo buttons
  let slowAudioButton = createButton('Slow Tempo');
  slowAudioButton.position(20, 20);
  slowAudioButton.size(150);
  slowAudioButton.mousePressed(() => setAudioRate(0.5));

  let normalAudioButton = createButton('Normal Tempo');
  normalAudioButton.position(220, 20);
  normalAudioButton.size(150);
  normalAudioButton.mousePressed(() => setAudioRate(1));

  let fastAudioButton = createButton('Fast Tempo');
  fastAudioButton.position(420, 20);
  fastAudioButton.size(150);
  fastAudioButton.mousePressed(() => setAudioRate(2));

  //Movement buttons
  let calmButton = createButton('Calm');
  calmButton.position(75, 60);
  calmButton.mousePressed(() => setMovement(0.001, 100)); 

  let excitedButton = createButton('Excited');
  excitedButton.position(275, 60);
  excitedButton.mousePressed(() => setMovement(0.003, 300));

  let erraticButton = createButton('Erratic');
  erraticButton.position(475, 60);
  erraticButton.mousePressed(() => setMovement(0.05, 200));

  // create buttons which change the colours of the visuals 
  let gentleColorsButton = createButton('Gentle');
  gentleColorsButton.position(75, 100);
  gentleColorsButton.mousePressed(() => setColors('gentle'));

  let happyColorsButton = createButton('Happy');
  happyColorsButton.position(275, 100);
  happyColorsButton.mousePressed(() => setColors('happy'));

  let brightColorsButton = createButton('Bright');
  brightColorsButton.position(475, 100);
  brightColorsButton.mousePressed(() => setColors('bright'));

// Buttons which change the shape of the visuals 
  let circleButton = createButton('Circle');
  circleButton.position(75, 140);
  circleButton.mousePressed(() => setShape('circle'));

  let gridButton = createButton('Grid');
  gridButton.position(275, 140);
  gridButton.mousePressed(() => setShape('grid'));

  let spiralButton = createButton('Spiral');
  spiralButton.position(475, 140);
  spiralButton.mousePressed(() => setShape('spiral'));
}

function draw() {
  background(0, 10); // background with an echo effect 
  stroke(currentColors[0], currentColors[1], currentColors[2], 80); //stroke colour is based on the colours in the array

//use if and else statements to determine which shape to to draw 
  if (shapeType === 'circle') {
    distortedCircle();
  } else if (shapeType === 'grid') {
    distortedGrid();
  } else if (shapeType === 'spiral') {
    distortedSpiral();
  }
}

//ensuring that i use noise within all my distorted shapes so that the visual is fluid and connects with the audio
function distortedCircle() {
  beginShape();
  for (let i = 0; i <= steps; i++) {
    let x = width / 2 + r * cos((TWO_PI * i) / steps);
    let y = height / 2 + r * sin((TWO_PI * i) / steps);
    x += map(
      noise(noiseScale * x, noiseScale * y, frameCount / 100), 0, 1, -noiseAmount, noiseAmount);
    y += map(
      noise(noiseScale * x, noiseScale * y, 1), 0, 1, -noiseAmount, noiseAmount);
    vertex(x, y);
  }
  endShape(CLOSE);
}

function distortedGrid() {
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      let x = 70 + i * 70;
      let y = 70 + j * 70;

      let xOffset = map(
        noise(noiseScale * x, noiseScale * y, frameCount * 0.01), 0, 1, -noiseAmount, noiseAmount);
      let yOffset = map(
        noise(noiseScale * x, noiseScale * y, frameCount * 0.02), 0, 1, -noiseAmount, noiseAmount);
      rect(x + xOffset, y + yOffset, 50, 50);
    }
  }
}

function distortedSpiral() {
  beginShape();
  for (let i = 0; i < steps; i++) {
    let angle = i * 0.1;
    let radius = r + i * 0.5;

    let x = width / 2 + radius * cos(angle);
    let y = height / 2 + radius * sin(angle);

    x += map(noise(noiseScale * x, frameCount / 100), 0, 1, -noiseAmount, noiseAmount);
    y += map(noise(noiseScale * y, frameCount / 100), 0, 1, -noiseAmount, noiseAmount);

    vertex(x, y);
  }
  endShape();
}
//checks that the audio is playing
function setAudioRate(rate) {
  audio.rate(rate);
  if (!audio.isPlaying()) {
    audio.play();
  }
}

// changes the noise scale and noise amount for each movement button
function setMovement(scale, amount) {
  noiseScale = scale;
  noiseAmount = amount;
}

// changes the colours based on the colour button pressed
function setColors(mood) {
  currentColors = colours[mood];
}

// changes the shape based on which shape button is pressed
function setShape(type) {
  shapeType = type;
}
