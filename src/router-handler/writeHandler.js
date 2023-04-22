const glob = require("glob");
const path = require("path");
const {address} = require("../config/config");
const fs = require("fs");
const {RF, WF,delFile} = require("../lib/upload");
const {uuid} = require("../lib/tool");
const config = require("../config/config");


const getList = async ctx => {
    const filePath = `${config.publicPath}/db/list.json`
    const data = RF(filePath)
    ctx.status = 200
    ctx.body = {
        status: 200,
        data
    }
}

const getArticle = async ctx => {
    const { id } = ctx.query

    if(id) {
        const filePath = `${config.publicPath}/db/articles/${id}.json`
        const data = RF(filePath)
        ctx.status = 200
        ctx.body = {
            status: 200,
            data
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

const delArticle = async ctx => {
    const { id } = ctx.query
    if(id) {
        const filePath = `${config.publicPath}/db/articles/${id}.json`
        const listPath = `${config.publicPath}/db/list.json`
        try {
            await delFile(filePath)
            // 删除h5列表中的h5
            let list = RF(listPath)
            list = list.filter(item => item.id !== id)
            WF(listPath, list)

            ctx.status = 200
            ctx.set('x-show-msg', 'zxzk_msg_200')
            ctx.body = {
                status: 200,
                data: null,
                message: '删除成功'
            }
        }catch(err) {
            console.log(err)
            ctx.body = {
                status: 500,
                data: null,
                message: '服务器读写错误或文件不存在'
            }
        }
    }else {
        ctx.body = {
            status: 400,
            data: null,
            message: '参数不能为空'
        }
    }
}

module.exports = {
    getList,
    getArticle,
    saveArticle,
    delArticle
}