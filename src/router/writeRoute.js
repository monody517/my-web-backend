const Router = require('koa-router')
const writeRoute = require('../router-handler/writeHandler')
const router = new Router()

// router.post('/api/files/upload', writeRoute.registerUser)
// router.post('/api/files/del', writeRoute.login)
router.get('/api/article/list', writeRoute.getList)
router.get('/api/article/get', writeRoute.getArticle)
router.post('/api/article/save', writeRoute.saveArticle)
router.delete('/api/article/del', writeRoute.delArticle)

module.exports = router