const GIFEncoder = require('gif-encoder-2')
const fs = require('fs')
const path = require('path')

const createMap = require('./createMap')

const historyToGIF = (data) => {
    const color = [255, 0, 0];
    const maps = data.map((map) => {
        return createMap(map.map, color, null);
    });
    
    const encoder = new GIFEncoder(1000, 1000)
    encoder.setDelay(100)
    encoder.start()

    maps.forEach((map) => {
        encoder.addFrame(map)
    })

    encoder.finish()

    const buffer = encoder.out.getData()

    fs.writeFile(path.join(__dirname, 'assets', 'map.gif'), buffer, error => {
        console.error(error)
    })
}

module.exports = historyToGIF