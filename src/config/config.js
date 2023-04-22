const path = require('path')

const address = {
    port: '8082',
    host: '10.125.134.191'
}

const jwtSecretKey = 'omg 666 ^_^'

const publicPath =path.resolve(__dirname,'../../public')

module.exports = {
    address,
    jwtSecretKey,
    publicPath,
    API_VERSION_PATH: '/api',
}
