const canvasSketch = require("canvas-sketch");
const math = require("canvas-sketch-util/math");
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
    context.fillStyle = "black";
    context.fillRect(0, 0, width, height);

    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i];

      for (let j = i + 1; j < agents.length; j++) {
        const other = agents[j];

        const dist = agent.pos.getDistance(other.pos);

        // if dots are too far apart, do not draw line
        if (dist > 200) continue;

        /* when distance is 0, we want the lineWidth to be 12
          when distance is 200, we want the lineWidth to be 1 */
        context.lineWidth = math.mapRange(dist, 0, 200, 12, 1);

        context.beginPath();
        context.strokeStyle = agent.color;
        context.moveTo(agent.pos.x, agent.pos.y);
        context.lineTo(other.pos.x, other.pos.y);
        context.stroke();
      }
    }

    agents.forEach((agent) => {
      agent.update();
      agent.draw(context);
      // agent.bounce(width, height);
      agent.wrap(width, height);
    });
  };
};

canvasSketch(sketch, settings);

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getDistance(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

class Agent {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(random.range(-1, 1), random.range(-1, 1));
    this.radius = random.range(4, 25);
    this.color =
      "rgb(" +
      random.range(50, 255) +
      "," +
      random.range(0, 0) +
      "," +
      random.range(100, 255) +
      ")";
  }

  /* bounce back when reach the boundaries of the canvas
  to prevent agents from dissappearing from the canvas overtime */
  bounce(width, height) {
    if (this.pos.x <= 0 || this.pos.x >= width) {
      this.vel.x *= -1; // invert the velocity
    }
    if (this.pos.y <= 0 || this.pos.y >= height) {
      this.vel.y *= -1;
    }
  }

  /* When the agent reaches one side of the canvas, 
   it should wrap around and appear on the opposite side. */
  wrap(width, height) {
    if (this.pos.x > width) {
      this.pos.x = 0;
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
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
    // context.fillStyle = this.color;
    context.strokeStyle = this.color;
    context.fill();
    context.stroke();

    context.restore();
  }
}
