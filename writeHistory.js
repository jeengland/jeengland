const fs = require('fs');

const writeHistory = (data, file='./data/historical.json') => {
    try {
        const jsonString = JSON.stringify({ data }, null, 2);
        fs.writeFileSync(file, jsonString);
        console.log('History successfully saved')
    }
    catch (err) {
        console.error('Error saving history:', err)
    }
}

module.exports = writeHistory