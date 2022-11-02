const Koa = require('koa');
const router = require('./src/router');
const cors = require('koa2-cors')
const staticFiles = require('koa-static')
const koaBody = require('koa-bodyparser')
const path = require('path')
const { address } = require('./src/config/config')
const compose = require('koa-compose');
const MD = require('./src/middlewares/index')
 
const app = new Koa();

//设置跨域
app.use(cors({
    origin: function (ctx){
        if (ctx.url.indexOf('/api/') > -1) {
            return '*'
        }
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowHeaders: ['GET', 'POST', 'DELETE'],
    allowMethods: ['Content-Type', 'Authorization', 'Accept', 'x-requested-with']
}))

app.use(router.allowedMethods());
app.use(koaBody())  // 解析post请求体data
app.use(router.routes()) // 路由转发
app.use(staticFiles(path.resolve(__dirname, "./public")))  // 使用public
  
app.listen(address.port, address.host, () => {
    console.log(`API server listening on ${address.host}:${address.port}`);
    });