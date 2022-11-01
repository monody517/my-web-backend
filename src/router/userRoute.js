const Router = require('koa-router')
const userHandler = require('../router-handler/userHandler')
const router = new Router()

router.post('/login/register', userHandler.registerUser)

module.exports = router