const Mustache = require('mustache');
const fs = require('fs');

const mapLogic = require('./mapLogic.js');
const randomizeMap = require('./randomizeMap.js');
const resetHistory = require('./resetHistory.js');

const MUSTACHE_MAIN_DIR = './main.mustache';

const color = [255, 0, 0]

resetHistory()
randomizeMap()

mapLogic(color)

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

function generateREADME() {
    fs.readFile(MUSTACHE_MAIN_DIR, (err, data) => {
        if (err) throw err;
        const output = Mustache.render(data.toString(), DATA);
        fs.writeFileSync('README.md', output);
    });
};

generateREADME();