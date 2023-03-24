const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [1080, 1080],
};

const sketch = ({ context, width, height }) => {
  const agents = [];

  for (let i = 0; i < 40; i++) {
    const y = random.range(0, width);
    const x = random.range(0, height);

    agents.push(new Agent(x, y));
  }

  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    agents.forEach((agent) => {
      agent.draw(context);
    });

    // const point = { x: 800, y: 400, radius: 10};
    // context.beginPath();
    // context.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
    // context.fillStyle = "black";
    // context.fill();

    // const agentA = new Agent(800, 400, 10);
    // const agentB = new Agent(300, 700, 10);
    // agentA.draw(context);
    // agentB.draw(context);
  };
};

canvasSketch(sketch, settings);

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Agent {
  constructor(x, y) {
    this.pos = new Point(x, y);
    this.radius = random.range(4, 12);
  }

  draw(context) {
    context.save();
    context.translate(this.pos.x, this.pos.y);

    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.fill();
    context.stroke();

    context.restore();
  }
}