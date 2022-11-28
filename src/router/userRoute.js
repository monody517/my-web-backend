const Router = require('koa-router')
const userHandler = require('../router-handler/userHandler')
const router = new Router()

router.post('/api/login/register', userHandler.registerUser)
router.post('/api/login/login', userHandler.login)
router.post('/api/upload/avatar', userHandler.uploadAvatar)
router.get('/api/user/avatar', userHandler.getUserAvar)

module.exports = router
