const koaRouter = require('koa-router');
const router = new koaRouter();

const uploadHandler = require('../router-handler/uploadHandler')

const routes = [
    {
        method: 'post',
        path: '/api/upload',
        handler: uploadHandler.upload
    },
    {
        method: 'get',
        path: '/api/list',
        handler: uploadHandler.getList
    }
]

routes.forEach(item => {
  const { method, path, handler } = item;
  //  router 第一个参数是 path， 后面跟上路由级中间件 handler（上面编写的路由处理函数）
  router[method](path, handler);
});

module.exports = router;