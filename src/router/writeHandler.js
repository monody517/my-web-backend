const Router = require('koa-router')
const writeHandler = require('../router-handler/writeHandler')
const router = new Router()

// router.post('/api/files/upload', writeHandler.registerUser)
// router.post('/api/files/del', writeHandler.login)
router.get('/api/article/list', writeHandler.getList)
// router.get('/api/article/get', writeHandler.getArticle)
// router.post('/api/article/save', writeHandler.saveArticle)
// router.delete('/api/article/del', writeHandler.delArticle)

module.exports = router