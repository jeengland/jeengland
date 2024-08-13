const createMap = require("./createMap.js");
const randomizeMap = require("./randomizeMap.js");
const generation = require("./generation.js");
const readHistory = require("./readHistory.js");
const writeHistory = require("./writeHistory.js");
const historyToGIF = require("./historyToGIF.js");

const { createHash } = require("crypto");
const detectLoop = require("./detectLoop.js");

const mapLogic = (color) => {
  // Pull data from historical.json
  let { data } = readHistory();

  // Generate a random map if there is are no maps in data
  if (data.length == 0) {
    // The structure an entry in the historical data is { map, mapDate }
    // where map is an array of values and mapDate is the date it was created
    let newMap = randomizeMap(100, 100);
    let mapDate = new Date().toString();

    data.push(generateMapData(newMap, mapDate));

    for (let i = 0; i < 19; i++) {
      newMap = generation(newMap);
      data.push(generateMapData(newMap, mapDate));
    }
  }

  // Create a shallow copy of the latest map
  let map = [...data[data.length - 1].map];
  // `max` is the maximum allowed entries in historical.json
  const max = 100;

  // Generate the next stage of the game of life using the latest map
  map = generation(map);
  mapDate = new Date().toString();

  // Add the map to the historical data
  data.push(generateMapData(map, mapDate));

  // Detect if a loop is present
  const isLoop = detectLoop(data);

  if (isLoop) {
    console.log("Loop detected, restarting map");

    data = [];

    let newMap = randomizeMap(100, 100);

    data.push(generateMapData(newMap, mapDate));

    for (let i = 0; i < 19; i++) {
      newMap = generation(newMap);
      data.push(generateMapData(newMap, mapDate));
    }
  }

  // Create the map image
  createMap(data[data.length - 1].map, color);

  // Ensure that history doesn't have any more entries than it should
  while (data.length > max) {
    data.shift();
  }

  // Store the new data in historical.json
  writeHistory(data);

  // Generate GIF based off new data
  historyToGIF(data);
};

const generateMapData = (map, mapDate) => {
  const mapString = JSON.stringify(map);
  const key = createHash("sha256").update(mapString).digest("hex");

  return {
    map,
    mapDate,
    key,
  };
};

module.exports = mapLogic;
