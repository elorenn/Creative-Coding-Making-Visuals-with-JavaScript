# Creative Coding: Making Visuals with JavaScript

Online course available at: [Creative Coding: Making Visuals with JavaScript](https://www.domestika.org/en/courses/2729-creative-coding-making-visuals-with-javascript)

```sh
# To launch browser, run in terminal:
canvas-sketch file-name.js --open

#To assign output folder for screenshots:
canvas-sketch file-name.js --output=[folder path]

# Cmd + Shift + S or Ctrl + Shift + S to export an animation, it will begin recording image frames and log progress in the browser console. You can hit this keystroke again to stop recording. First install ffmpeg to stream frames into an MP4 or GIF file:
npm install @ffmpeg-installer/ffmpeg --global

# Save animations to MP4 file
canvas-sketch animation.js --output=tmp --stream

# Save animations to GIF file instead
canvas-sketch animation.js --output=tmp --stream=gif

# Save animations to GIF but scale it down to 512 px wide
canvas-sketch animation.js --output=tmp --stream [ gif --scale=512:-1 ]
```

## Tool Stack

- [canvas-sketch:](https://github.com/mattdesl/canvas-sketch) A framework for making generative artwork in JavaScript and the browser.
- [canvas-sketch-util:](https://github.com/mattdesl/canvas-sketch-util) A library of utility functions for generative art in Canvas, WebGL and JavaScript, designed to be used alongside the canvas-sketch toolset, but generic enough to work for various Node.js/browser use cases.
- [CanvasRenderingContext2D MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D#transformations)
- [HTML Canvas Reference](https://www.w3schools.com/tags/ref_canvas.asp)
- [npm v8.11.0](https://www.npmjs.com/package/npm/v/8.11.0)
- [node v16.16.0](https://nodejs.org/en/blog/release/v16.16.0)

## Sample Sketches

### [Sketch 01](./sketches/sketch-01.js)

<p align="center">
  <img src="./sketches/output/00/01-sketch-square-yellow.png" alt="yellow square superimposed on grid of smaller squares" width="45%">
  <img src="./sketches/output/00/01-sketch-square-black.gif" alt="square made of grid of smaller squares" width="45%">
</p>

### [Sketch 02](./sketches/sketch-02.js)

<p align="center">
  <img src="./sketches/output/00/02-sketch-green-circle.gif" alt="spinning circles of varying greens" width="45%">
  <img src="./sketches/output/00/02-sketch-black-rays.gif" alt="rays around a circle of varying widths and lengths" width="45%">
</p>

### [Sketch 03](./sketches/sketch-03.js)

<p align="center">
  <img src="./sketches/output/00/03-sketch-lines.gif" alt="dots moving attached via colorful lines" width="45%">
  <img src="./sketches/output/00/03-sketch-wrap.gif" alt="dots moving attached via colorful lines" width="45%">
</p>
