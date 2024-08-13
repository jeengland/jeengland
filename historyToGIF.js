const GIFEncoder = require("gif-encoder-2");
const fs = require("fs");
const path = require("path");

const createMap = require("./createMap");

const rainbowColors = [
  [255, 0, 0],
  [255, 255, 0],
  [0, 255, 0],
  [0, 255, 255],
  [0, 0, 255],
  [255, 0, 255],
];

function getColor(index, numFramesPerColor) {
  const colorIndex =
    Math.floor(index / numFramesPerColor) % rainbowColors.length;
  // Use floor to ensure we switch colors every `numFramesPerColor` frames
  const colorStart = rainbowColors[colorIndex];
  const colorEnd = rainbowColors[(colorIndex + 1) % rainbowColors.length];
  const progress = (index % numFramesPerColor) / numFramesPerColor; // Calculate progress within the current color

  const r = colorStart[0] + (colorEnd[0] - colorStart[0]) * progress;
  const g = colorStart[1] + (colorEnd[1] - colorStart[1]) * progress;
  const b = colorStart[2] + (colorEnd[2] - colorStart[2]) * progress;

  return [Math.round(r), Math.round(g), Math.round(b)];
}

const historyToGIF = (data, numFramesPerColor = 7) => {
  const maps = data.map((map, index) => {
    const color = getColor(index, numFramesPerColor);
    const mapData = createMap(map.map, color, null);

    return mapData;
  });

  const encoder = new GIFEncoder(1000, 1000);
  encoder.setDelay(100);
  encoder.start();

  maps.forEach((map) => {
    encoder.addFrame(map);
    encoder.addFrame(map);
  });

  encoder.finish();

  const buffer = encoder.out.getData();

  fs.writeFile(path.join(__dirname, "assets", "map.gif"), buffer, (error) => {
    console.error(error);
  });
};

module.exports = historyToGIF;
