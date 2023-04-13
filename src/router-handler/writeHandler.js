const glob = require("glob");
const path = require("path");
const {address} = require("../config/config");
const fs = require("fs");
const {RF} = require("../lib/upload");


const getList = async ctx => {
    const filePath = `${address.publicPath}/db/list.json`
    const data = RF(filePath)
    ctx.status = 200
    ctx.body = {
        status: 200,
        data
    }
}

// const getArticle = async ctx => {
//     let { name, paths, size } = ctx.file;
//
//     ctx.body =
//         {
//             status: 200,
//             name,
//             paths,
//             size,
//             url: `http://192.168.10.77:8082/${ctx.request.file.filename}`
//         }
// }

// const saveArticle = async ctx => {
//
//     const files = glob.sync(path.resolve(__dirname, "../../public/*"))
//     const result = files.map(item => {
//         return `http://192.168.10.77:8082/${item.split('/')[6]}`
//     })
//
//     ctx.body = {
//         status: 200,
//         data: result
//     }
// }

// const delArticle = async ctx => {
//     if (ctx.request.url.split(`http://${address.host}:${address.port}`)[1].indexOf('shan_chu') !== -1) {
//         ctx.body = {
//             status: 500,
//             message: '删除失败，此为系统默认图片'
//         }
//         return
//     } else if (ctx.request.url.split(`http://${address.host}:${address.port}`)[1].indexOf('camera') !== -1) {
//         ctx.body = {
//             status: 500,
//             message: '删除失败，此为系统默认图片'
//         }
//         return
//     }
//     const delPath = path.join(__dirname, "../../public", ctx.request.url.split(`http://${address.host}:${address.port}`)[1])
//     console.log(delPath)
//     if (fs.existsSync(delPath)) {
//         fs.unlinkSync(delPath)
//     } else {
//         ctx.body = {
//             status: 500,
//             message: '删除失败，图片不存在'
//         }
//         return
//     }
//
//     ctx.body = {
//         status: 200,
//         message: '删除成功'
//     }
// }

module.exports = {
    getList,
    // getArticle,
    // saveArticle,
    // delArticle
}