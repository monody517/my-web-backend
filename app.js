const Koa = require('koa');
const router = require('./src/router');
const cors = require('koa2-cors')
 
const app = new Koa();

const port = '8082'
const host = '0.0.0.0'

//设置跨域
app.use(cors({
    origin: function (ctx){
        console.log('1111', ctx.url)
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

app
  .use(router.routes())
    .use(router.allowedMethods());
  
app.listen(port, host, () => {
        console.log(`API server listening on ${host}:${port}`);
    });