const createMap = require('./createMap.js');
const randomizeMap = require('./randomizeMap.js');
const generation = require('./generation.js');

let map = randomizeMap(10, 10);
const color = [255, 0, 0];

createMap(map, color);

for (let i = 0; i < 10; i++) {
    map = generation(map)
    createMap(map, color, `map${i}.png`)
}