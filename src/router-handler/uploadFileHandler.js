const fs = require("fs");
const config = require("../config/config");
const koaBody = require('koa-body');
const path = require('path')

let chunk = {}

const uploadFile = async ctx => {
    koaBody({
        multipart: true,
        formidable: {
            uploadDir: `${config.publicPath}/bigFile`,
            onFileBegin: (name,file)=> {
                const [fileName,hash,index] = name.split('-')
                const dir = path.join(`${config.publicPath}/bigFile`,fileName)
                const chunkItem = {
                    fileName,
                    hash,
                    index
                }
                    if(!fs.existsSync(dir)){
                        fs.mkdirSync(dir)
                    }
                file.path = `${dir}/${hash}-${index}`
            },
            onError: ()=> {
                ctx.status = 400
                ctx.body = {
                    status: 400,
                    data: null,
                    message: '上传失败'
                }
            }
        }
    })
    ctx.set("Content-Type", "application/json");
    ctx.body = JSON.stringify({
        code: 200,
        message: 'upload successfully！'
    });
}

const mergeChunk = async ctx => {

}

module.exports = {
    uploadFile,
    mergeChunk,
}