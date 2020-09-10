const writeHistory = require('./writeHistory')

const resetHistory = () => {
    data = []
    writeHistory(data)
}

resetHistory()

module.exports = resetHistory