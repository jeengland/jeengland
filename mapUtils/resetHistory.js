const writeHistory = require('./writeHistory')

const resetHistory = () => {
    data = []
    writeHistory(data)
}

module.exports = resetHistory