const glob = require("glob");
const path = require("path");
const {address} = require("../config/config");
const fs = require("fs");
const {RF, WF} = require("../lib/upload");
const {uuid} = require("../lib/tool");
const config = require("../config/config");


const getList = async ctx => {
    const filePath = `${config.publicPath}/db/list.json`
    const data = RF(filePath)
    console.log('data',data);
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

const saveArticle = async ctx => {
    const { hash, title, content, type, tid } = ctx.request.body
    if(hash && title && content) {
        let id = tid || uuid(8, 16)
        const filePath = `${config.publicPath}/db/articles/${id}.json`
        // 模版库文件
        let listPath = `${config.publicPath}/db/list.json`
        let list = RF(listPath)
        list = tid ? list.map(item => {
            if(item.id === id || item.id === id) {
                return { id, hash, title, type }
            }
            return item
        }) : [...list, { id, hash, title, type }]

        const res = WF(filePath, { id, hash, title, content, type })
        WF(listPath, list)
        // 客户端显示消息
        ctx.set('x-show-msg', 'zxzk_msg_200')
        ctx.status = res ? 200 : 500
        ctx.body = res ? {
            status: 200,
            data: {id},
            message: '保存成功'
        } : {
            status: 500,
            data: null,
            message: '服务器错误'
        }
    }else {
        ctx.status = 400
        ctx.body = {
            status: 400,
            data: null,
            message: '参数不能为空'
        }
    }

}

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
    saveArticle,
    // delArticle
}