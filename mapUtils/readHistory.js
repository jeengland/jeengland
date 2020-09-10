const fs = require('fs');

const readHistory = (file='./data/historical.json') => {
    try {
        const jsonString = fs.readFileSync('./data/historical.json')
        return JSON.parse(jsonString)
    } catch(err) {
        console.error('Error reading from history:', err)
    }
};

console.log(readHistory())

module.exports = readHistory;