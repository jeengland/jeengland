const randomizeMap = (width, height) => {
    let map = [];
    for (let i = 0; i < height; i++) {
        let row = [];
        for (let j = 0; j < width; j++) {
            let coinToss = Math.round(Math.random());
            row.push(coinToss);
        };
        map.push(row);
    };
    return map;
};

module.exports = randomizeMap;