const Koa = require('koa');
const router = require('./src/router');
const cors = require('koa2-cors')
const staticFiles = require('koa-static')
const koaBody = require('koa-bodyparser')
const path = require('path')
const { address } = require('./src/config/config')
const MD = require('./src/middlewares/index')

const app = new Koa();

//设置跨域
app.use(cors({
    origin: function (ctx){
        const whiteList = ['http://localhost:8080', 'http://localhost:8081']; //可跨域白名单
        let url = ctx.header.referer.substr(0, ctx.header.referer.length - 1);
        if(whiteList.includes(url)){
            return url // 注意，这里域名末尾不能带/，否则不成功，所以在之前我把/通过substr干掉了
        }
        return 'http://localhost:8080' //默认允许本地请求8080端口可跨域
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'x-requested-with'],
    allowMethods: ['GET', 'POST', 'DELETE']
}))

app.use(router.allowedMethods());

app.use(koaBody())  // 解析post请求体data
app.use(router.routes()) // 路由转发
app.use(staticFiles(path.resolve(__dirname, "./public")))  // 使用public

app.listen(address.port, address.host, () => {
    console.log(`API server listening on ${address.host}:${address.port}`);
    });
