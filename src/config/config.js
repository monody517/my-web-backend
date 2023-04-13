import { resolve } from 'path';

const address = {
    port: '8082',
    host: '192.168.10.77'
}

const jwtSecretKey = 'omg 666 ^_^'

const publicPath =resolve(__dirname,'../../public')

module.exports = {address,jwtSecretKey,publicPath}
