const createMap = require('./createMap.js');
const randomizeMap = require('./randomizeMap.js');
const generation = require('./generation.js');
const readHistory = require('./readHistory.js');
const writeHistory = require('./writeHistory.js');

// Pull data from historical.json
const { data } = readHistory();

// Generate a random map if there is are no maps in data
if (data.length == 0) {
    // The structure an entry in the historical data is { map, mapDate }
    // where map is an array of values and mapDate is the date it was created
    let map = randomizeMap(10, 10);
    let mapDate = new Date().toString();
    data.unshift({ map, mapDate });
};

// Create a shallow copy of the latest map
let map = [...data[data.length - 1].map];
// `color` is the color of the live cells in the generated images
const color = [255, 0, 0];
// `max` is the maximum allowed entries in historical.json
const max = 10;

// Generate the next stage of the game of life using the latest map
map = generation(map);
mapDate = new Date().toString();

// Add the map to the historical data
data.unshift({ map, mapDate })

// Create the map image
createMap(map, color);

// Ensure that history doesn't have any more entries than it should
while (data.length > max) {
    data.pop();
};

// Store the new data in historical.json
writeHistory(data);