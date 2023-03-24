const canvasSketch = require("canvas-sketch");
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [1080, 1080],
};

// USE premade functions from canvas-sketch-util (utilities) instead of making our own functions:
// const degToRad = (degrees) => {
//   return (degrees / 180) * Math.PI; // this converts degrees to radian measurement.
// };

// const randomRange = (min, max) => {
//   return Math.random() * (max - min) + min;
// };

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "#fff";
    context.fillRect(0, 0, width, height);

    context.fillStyle = "black";
    // context.strokeStyle = "white";
    // context.fillStyle = "hsl(" + random.range(0, 100) + ", 100%," + "50%)";

    const cx = width * 0.5;
    const cy = height * 0.5;
    let x, y;

    const w = width * 0.01;
    const h = height * 0.1;

    const num = 99;
    const radius = width * 0.3;

    for (let i = 0; i < num; i++) {
      context.fillStyle =
        "hsl(" + random.range(60, 90) + ", 70%," + random.range(65, 90) + "%)";
      context.strokeStyle =
        "hsl(" + random.range(60, 90) + ", 70%," + random.range(65, 90) + "%)";

      const slice = math.degToRad(360 / num);
      const angle = slice * i;

      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);

      context.save(); // Always start with save: Saves the state of the current context.
      context.translate(x, y);
      context.rotate(-angle);
      context.scale(random.range(0.1, 10), random.range(0.2, 0.5));

      context.beginPath();
      context.rect(-w * 0.5, random.range(0, -h * 5), w, h);
      context.fill();
      context.restore(); // Always end with restore: Returns previously saved path state and attributes.

      context.save();
      context.translate(cx, cy);
      context.rotate(-angle);

      context.lineWidth = random.range(5, 20);

      context.beginPath();
      context.arc(
        0,
        0,
        radius * random.range(0.7, 1.3),
        slice * random.range(1, -8),
        slice * random.range(0, 5)
      );
      context.stroke();
      context.restore();
    }
  };
};

canvasSketch(sketch, settings);
