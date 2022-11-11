const Router = require('koa-router')
const userHandler = require('../router-handler/userHandler')
const router = new Router()

router.post('/api/login/register', userHandler.registerUser)
router.post('/api/login/login', userHandler.login)

module.exports = router