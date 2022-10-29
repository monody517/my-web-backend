const glob = require('glob') // 读取文件
const multer = require('@koa/multer')
const path = require('path')

let staticPath = __dirname


// 为了捕获multer的错误
const uploadSingleCatchError = async (ctx, next) => {
    console.log(ctx)
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
            state: 500,
            msg: err.message
        }
    }
}

const upload = async ctx => {
    let { name, path, size } = ctx.file;

    let { source } = ctx.request.body || 'unknow';

    ctx.body = {
        state: 200,
        name,
        path,
        size,
        url: `http://192.168.10.77:8082/${ctx.request.file.filename}`
    }

}

const getList = async ctx => {

    const files = glob.sync(path.resolve(__dirname, "../../public/*"))
    const result = files.map(item => {
            return item
        })
        
        ctx.body = {
            state: 200,
            result
        }
}

module.exports = {
    uploadSingleCatchError,
    upload,
    getList
  }