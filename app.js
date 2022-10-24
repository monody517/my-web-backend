const express = require('express')
const app = express()
const cors = require('cors')

const picRouter = require('./src/picture/uploadPic')

app.use('/api',picRouter)

const server = app.listen(4000, '127.0.0.1', function () {
    const host = server.address().address;
    const port = server.address().port;

    console.log('Server running at http://%s:%s', host, port);
})