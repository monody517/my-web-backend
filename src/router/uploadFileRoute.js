const Router = require('koa-router')
const uploadFileRoute = require('../router-handler/uploadFileHandler')
const router = new Router()

router.post('/api/files/upload', uploadFileRoute.uploadFile)
router.post('/api/files/merge', uploadFileRoute.mergeChunk)

module.exports = router