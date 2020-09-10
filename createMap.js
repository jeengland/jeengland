const fs = require('fs');
const { createCanvas } = require('canvas');

const createMap = (map, color, fileName='map.png') => {
    const width = map.length;
    const height = map[0].length;
    map = map.flat()

    const canvas = createCanvas(width, height)
    const context = canvas.getContext('2d')

    context.fillStyle = `#000`
    context.fillRect(0, 0, width, height)

    imageData = context.getImageData(0, 0, height, width)
    let data = imageData.data;

    for (let i = 0; i < imageData.data.length; i += 4) {
        let value = map[i / 4]
        if (value) {
            data[i] = color[0]
            data[i + 1] = color[1]
            data[i + 2] = color[2]
        }
    }

    context.putImageData(imageData, 0, 0)

    const scaled = createCanvas(width * 10, height * 10)
    const scaledContext = scaled.getContext('2d')
    scaledContext.imageSmoothingEnabled = false;

    scaledContext.drawImage(canvas, 0, 0, width, height, 0, 0, width * 10, height * 10)

    const scaledBuffer = scaled.toBuffer('image/png')

    if (fileName !== null) {
        fs.writeFileSync(`./assets/${fileName}`, scaledBuffer)
    }

    return scaledContext
}

module.exports = createMap;