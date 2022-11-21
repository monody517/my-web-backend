const glob = require('glob') // 读取文件
const multer = require('@koa/multer')
const path = require('path')
const fs = require('fs')
const {address} = require('../config/config')

// 为了捕获multer的错误
const uploadSingleCatchError = async (ctx, next) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null,path.resolve(__dirname, "../../public"))
        },
        filename: function (req, file, cb) {
            console.log('file',file)
            let [name, type] = file.originalname.split('.');
            cb(null,`${name}_${Date.now().toString(16)}.${type}`)
        }
    })

    //文件上传限制
    const limits = {
        fields: 10,//非文件字段的数量
        fileSize: 1024 * 1024 * 2,//文件大小 单位 b
        files: 2//文件数量
    }

    const upload = multer({ storage, limits })
    let err = await upload.single('file')(ctx, next).then(res => res)
                .catch(err => err);
    if(err) {
        ctx.status = 500
        ctx.body = {
            status: 500,
            msg: err.message
        }
    }
}

const upload = async ctx => {
    let { name, paths, size } = ctx.file;

    ctx.body =
        {
        status: 200,
        name,
        paths,
        size,
        url: `http://192.168.10.77:8082/${ctx.request.file.filename}`
    }
}

const getList = async ctx => {

    const files = glob.sync(path.resolve(__dirname, "../../public/*"))
    const result = files.map(item => {
            return `http://192.168.10.77:8082/${item.split('/')[6]}`
        })

        ctx.body = {
            status: 200,
            data: result
        }
}

const delectImg = async ctx => {
    if (ctx.request.url.split(`http://${address.host}:${address.port}`)[1].indexOf('shan_chu') !== -1) {
        ctx.body = {
            status: 500,
            message: '删除失败，此为系统默认图片'
        }
        return
    } else if (ctx.request.url.split(`http://${address.host}:${address.port}`)[1].indexOf('camera') !== -1) {
        ctx.body = {
            status: 500,
            message: '删除失败，此为系统默认图片'
        }
        return
    }
    const delPath = path.join(__dirname, "../../public", ctx.request.url.split(`http://${address.host}:${address.port}`)[1])
    console.log(delPath)
    if (fs.existsSync(delPath)) {
        fs.unlinkSync(delPath)
    } else {
        ctx.body = {
            status: 500,
            message: '删除失败，图片不存在'
        }
        return
    }

    ctx.body = {
        status: 200,
        message: '删除成功'
    }
}

module.exports = {
    uploadSingleCatchError,
    upload,
    getList,
    delectImg
  }
