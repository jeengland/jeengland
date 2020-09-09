const Mustache = require('mustache');
const fs = require('fs');
const MUSTACHE_MAIN_DIR = './main.mustache';

live = '![live](https://i.ibb.co/VJ5mML7/live.png)'
dead = '![dead](https://i.ibb.co/x3MGSVW/dead.png)'

map = [
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [1, 1, 0, 1, 1],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
]

// Data to update
let DATA = {
    name: 'Jacob Cavazos-England',
    date: new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZone: 'America/New_York'
      }),
};

let i = 0

for (let i = 0; i < map.length; i++) {
    let cells = ''
    row = map[i]
    for (let j = 0; j < row.length; j++) {
        state = row[j]
        if (state == 1) {
            cells += live
        } else {
            cells += dead
        }
    }
    cells += '  '
    console.log(cells)
    DATA[`row${i}`] = cells
}

function generateREADME() {
    fs.readFile(MUSTACHE_MAIN_DIR, (err, data) => {
        if (err) throw err;
        const output = Mustache.render(data.toString(), DATA);
        fs.writeFileSync('README.md', output);
    });
};

generateREADME();