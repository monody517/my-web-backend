const glob = require('glob')

let staticPath = __dirname

const upload = async ctx => {
    ctx.body = '路由改造'
}

const getList = async ctx => {

    const files = glob.sync(`${staticPath}/uploads/*`)
    const result = files.map(item => {
            return item
        })
        
        ctx.body = {
            state: 200,
            result
        }
}

module.exports = {
    upload,
    getList
  }