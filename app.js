const Koa = require('koa');
const router = require('./src/router');
const cors = require('koa2-cors')
const staticFiles = require('koa-static')
const path = require('path')
 
const app = new Koa();

const port = '8082'
const host = '192.168.10.77'

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

app.use(router.routes())
app.use(router.allowedMethods());
app.use(staticFiles(path.resolve(__dirname, "./public")))
  
app.listen(port, host, () => {
    console.log(`API server listening on ${host}:${port}`);
    });