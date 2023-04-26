const Router = require('koa-router')
const uploadFileRoute = require('../router-handler/uploadFileHandler')
const koaBody = require("koa-body");
const path = require("path");
const config = require("../config/config");
const fs = require("fs");
const router = new Router()

const outputPath = `${config.publicPath}/bigFile`

router.post(
    '/api/files/upload',
    koaBody({
        multipart: true,
        formidable: {
            uploadDir: outputPath,
            onFileBegin: (name,file)=> {
                const [fileName,hash,index] = name.split('-')
                const dir = path.join(`${config.publicPath}/bigFile`,fileName)
                const chunkItem = {
                    fileName,
                    hash,
                    index
                }
                if(!fs.existsSync(`${config.publicPath}/bigFile`)){
                    fs.mkdirSync(`${config.publicPath}/bigFile`)
                }
                if(!fs.existsSync(dir)){
                    fs.mkdirSync(dir)
                }
                file.path = `${dir}/${hash}-${index}`
            },
        },
    }),
    uploadFileRoute.uploadFile)
router.post('/api/files/merge', uploadFileRoute.mergeChunk)
router.post('/api/files/verify', uploadFileRoute.verifyFile)

module.exports = router