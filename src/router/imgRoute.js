const koaRouter = require('koa-router');
const router = new koaRouter();
const user = require('./userRoute')

const uploadHandler = require('../router-handler/imgHandler')

const routes = [
    {
        method: 'get',
        path: '/api/list',
        handler: uploadHandler.getList
  },
  {
    method: 'post',
    path: '/api/delect',
    handler: uploadHandler.delectImg
  }
]

router.post('/api/upload',uploadHandler.uploadSingleCatchError,uploadHandler.upload)

routes.forEach(item => {
  const { method, path, error, handler } = item;
  //  router 第一个参数是 path， 后面跟上路由级中间件 handler（上面编写的路由处理函数）
  router[method](path, handler);
});

router.use(user.routes())

module.exports = router;