const koaBody = require('koa-bodyparser');

const response = require('./response')
const error = require('./error')

const mdResHandler = response()
const errorHandler = error()

module.exports = [
    mdResHandler,errorHandler
]