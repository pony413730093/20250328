let seaweed = [];

function setup() {
  // Create the iframe
  let iframe = createElement('iframe');
  iframe.attribute('src', 'https://www.et.tku.edu.tw/');
  iframe.style('border', 'none');
  iframe.size(windowWidth * 0.8, windowHeight * 0.8);
  iframe.position(windowWidth * 0.1, windowHeight * 0.1); // Centered with 10% margin
  iframe.style('position', 'absolute');
  iframe.style('z-index', '-1'); // Place iframe behind the canvas

  // Create the canvas and set its background to transparent
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('position', 'absolute');
  canvas.style('top', '0');
  canvas.style('left', '0');
  canvas.style('pointer-events', 'none'); // Allow interaction with iframe
  clear(); // Make the canvas background transparent

  for (let i = 0; i < 50; i++) {
    let x = (i + 0.5) * (width / 50); // evenly spaced
    let h = random(100, 200);
    let color = [random(30, 50), random(100, 150), random(30, 50)];
    let thickness = random(20, 25); // thickness of the seaweed
    let frequency = random(0.02, 0.04); // sway frequency
    seaweed.push({ x: x, h: h, color: color, thickness: thickness, frequency: frequency });
  }
}

function draw() {
  clear(); // Clear the canvas to maintain transparency
  blendMode(MULTIPLY); // Apply blend mode for transparency effect
  drawSeaweed();
  blendMode(BLEND); // Reset blend mode to default
}

function drawSeaweed() {
  for (let s of seaweed) {
    let sway = sin(frameCount * s.frequency) * 10; // sway effect
    stroke(s.color[0], s.color[1], s.color[2], 150); // Add transparency
    strokeWeight(s.thickness);
    noFill();
    beginShape();
    for (let y = 0; y <= s.h; y += 10) {
      let offsetX = sin((frameCount + y) * s.frequency) * 10; // bending effect
      vertex(s.x + sway + offsetX, height - y);
    }
    endShape();
  }
}
