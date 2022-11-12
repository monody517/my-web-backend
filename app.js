const Koa = require('koa');
const router = require('./src/router');
const cors = require('koa2-cors')
const staticFiles = require('koa-static')
const koaBody = require('koa-bodyparser')
const path = require('path')
const { address } = require('./src/config/config')
const MD = require('./src/middlewares/index')
 
const app = new Koa();

app.use(router.allowedMethods());
//设置跨域
app.use(cors({
    origin: function (ctx){
        return '*'
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'x-requested-with'],
    allowMethods: ['GET', 'POST', 'DELETE']
}))
app.use(koaBody())  // 解析post请求体data
app.use(router.routes()) // 路由转发
app.use(staticFiles(path.resolve(__dirname, "./public")))  // 使用public
  
app.listen(address.port, address.host, () => {
    console.log(`API server listening on ${address.host}:${address.port}`);
    });