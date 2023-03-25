const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [1080, 1080],
  animate: true,
};

/* 
const animate = () => {
  console.log("this is what 'animate: true' does internally - a loop");
  requestAnimationFrame(animate); // browser triggers when it's ready to paint another frame
};

animate();
*/

const sketch = ({ context, width, height }) => {
  const agents = [];

  for (let i = 0; i < 40; i++) {
    const y = random.range(0, width);
    const x = random.range(0, height);

    agents.push(new Agent(x, y));
  }

  /*  The return function is called everytime the browser is ready 
  to repaint the screen, which should happen at 60 frames per second. */
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    agents.forEach((agent) => {
      agent.update();
      agent.draw(context);
      agent.bounce(width, height);
    });
  };
};

canvasSketch(sketch, settings);

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Agent {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(random.range(-1, 1), random.range(-1, 1));
    this.radius = random.range(4, 12);
  }

  // bounce back when reach the boundaries of the canvas
  // to prevent agents from dissappearing from the canvas overtime
  bounce(width, height) {
    if (this.pos.x <= 0 || this.pos.x >= width) {
      this.vel.x *= -1; // invert the velocity
    }
    if (this.pos.y <= 0 || this.pos.y >= height) {
      this.vel.y *= -1;
    }
  }

  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  draw(context) {
    context.save();
    context.translate(this.pos.x, this.pos.y);

    context.lineWidth = 4;

    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.fill();
    context.stroke();

    context.restore();
  }
}
