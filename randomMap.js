const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

const randomMap = (color='#fff') => {
    const width = 100;
    const height = 100;

    const canvas = createCanvas(width, height)
    const context = canvas.getContext('2d')

    context.fillStyle = color
    context.fillRect(0, 0, width, height)

    imageData = context.getImageData(0, 0, height, width)
    let data = imageData.data;

    for (let i = 0; i < imageData.data.length; i += 4) {
        let coinToss = Math.round(Math.random())
        if (coinToss == 1) {
            data[i] = 0
            data[i + 1] = 0
            data[i + 2] = 0
        }
    }

    console.log(data)
    console.log(imageData.data)


    context.putImageData(imageData, 0, 0)

    const final = createCanvas(width * 10, height * 10)
    const finalContext = final.getContext('2d')
    finalContext.imageSmoothingEnabled = false;

    finalContext.drawImage(canvas, 0, 0, width, height, 0, 0, width * 10, height * 10)

    const finalBuffer = final.toBuffer('image/png')
    fs.writeFileSync('./assets/map.png', finalBuffer)
}

module.exports = randomMap