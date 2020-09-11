const fs = require('fs');

const readHistory = (file='./data/historical.json') => {
    try {
        const jsonString = fs.readFileSync('./data/historical.json', 'utf8');
        const data = JSON.parse(jsonString);
        console.log('History successfully loaded')
        return data;
    } catch(err) {
        console.error('Error reading from history:', err)
    }
};

module.exports = readHistory;