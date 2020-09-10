const generation = (data) => {
    const maxY = data.length - 1;
    const maxX = data[0].length - 1;
    const newMap = data.map((row, y) => {
        return row.map((cell, x) => {
            const neighbors = [[y, x + 1],
                               [y, x - 1],
                               [y + 1, x + 1],
                               [y + 1, x - 1],
                               [y + 1, x],
                               [y - 1, x + 1],
                               [y - 1, x - 1],
                               [y - 1, x]];
            let liveNeighbors = 0;

            neighbors.forEach((n) => {
                if (n[0] < 0) {
                    n[0] = maxY
                } else if (n[0] > maxY) {
                    n[0] = 0
                };
                if (n[1] < 0) {
                    n[1] = maxX
                } else if (n[1] > maxX) {
                    n[1] = 0
                };
                if (data[n[0]][n[1]]) {
                    liveNeighbors++
                };
            });
            if (cell) {
                if (liveNeighbors == 2) {
                    return true
                } else if (liveNeighbors == 3) {
                    return true
                } else {
                    return false
                };
            } else {
                if (liveNeighbors == 3) {
                    return true
                } else {
                    return false
                };
            };
        });
    });
    return newMap;
};

module.exports = generation;