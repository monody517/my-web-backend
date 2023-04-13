const Koa = require('koa');
const router = require('./src/router');
const cors = require('koa2-cors')
const staticFiles = require('koa-static')
const koaBody = require('koa-bodyparser')
const path = require('path')
const { address,API_VERSION_PATH } = require('./src/config/config')
const MD = require('./src/middlewares/index')

const app = new Koa();

//设置跨域
app.use(cors({
    origin: function (ctx) {
        const whiteList = [
            'http://10.125.12.156:8085',
        ]; //可跨域白名单
        if (whiteList.includes(ctx.request.header.origin) && ctx.url.indexOf(API_VERSION_PATH) > -1) {
            return ctx.request.header.origin //注意，这里域名末尾不能带/，否则不成功，所以在之前我把/通过substr干掉了，允许来自指定域名请求, 如果设置为*，前端将获取不到错误的响应头
        }
        return ''
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'x-show-msg'],
    maxAge: 5,  //  该字段可选，用来指定本次预检请求的有效期，单位为秒
    credentials: true,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],
}))

app.use(router.allowedMethods());

app.use(koaBody())  // 解析post请求体data
app.use(router.routes()) // 路由转发
app.use(staticFiles(path.resolve(__dirname, "./public")))  // 使用public

app.listen(address.port, address.host, () => {
    console.log(`API server listening on ${address.host}:${address.port}`);
    });
