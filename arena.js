let d, r, g, b, a;

function setup() {
  frameRate(60);
  createCanvas(102, 102);
  resetSand(); // Configura el reloj de arena inicial
}

function resetSand() {
  background(255);
  strokeWeight(4);
  stroke(150, 43, 210);
  line(2, 2, 100, 2);
  line(2, 2, 47, 47);
  line(47, 47, 2, 100);
  line(2, 100, 100, 100);
  line(100, 100, 55, 47);
  line(55, 47, 100, 2);

  r = 219;
  g = 169;
  b = 20;
  a = 255;
  loadPixels();
  d = pixelDensity();
  for (let i = 20; i < d * (height / 2 - 7); i++) {
    for (let j = i + 7; j < d * width - i - 7; j++) {
      let p = 4 * i * width * d + 4 * j;
      pixels[p] = r;
      pixels[p + 1] = g;
      pixels[p + 2] = b;
      pixels[p + 3] = a;
    }
  }
  updatePixels();
}

function draw() {
  loadPixels();
  for (let i = 4 * d * (height - 1); i >= 0; i--) {
    let row = 4 * d * i * width;
    if (random([true, false])) {
      for (let j = 0; j < 4 * d * width; j += 4) {
        if (pixels[row + j] == r) {
          fall(row + j);
        }
      }
    } else {
      for (let j = 4 * d * width - 4; j >= 0; j -= 4) {
        if (pixels[row + j] == r) {
          fall(row + j);
        }
      }
    }
  }
  updatePixels();
}

function fall(px) {
  let below = px + 4 * d * width;
  if (pixels[below] == 255) {
    pixels[below] = r;
    pixels[below + 1] = g;
    pixels[below + 2] = b;
    pixels[px] = 255;
    pixels[px + 1] = 255;
    pixels[px + 2] = 255;
    return 1;
  }
  let diagonal = random([1, -1]);
  if (pixels[below + 4 * diagonal] == 255) {
    pixels[below + 4 * diagonal] = r;
    pixels[below + 4 * diagonal + 1] = g;
    pixels[below + 4 * diagonal + 2] = b;
    pixels[px] = 255;
    pixels[px + 1] = 255;
    pixels[px + 2] = 255;
    return 1;
  }
  if (pixels[below - 4 * diagonal] == 255) {
    pixels[below - 4 * diagonal] = r;
    pixels[below - 4 * diagonal + 1] = g;
    pixels[below - 4 * diagonal + 2] = b;
    pixels[px] = 255;
    pixels[px + 1] = 255;
    pixels[px + 2] = 255;
    return 1;
  }
  return 0;
}
