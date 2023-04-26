const fs = require("fs");
const path = require('path')
const config = require("../config/config");

const outputPath = `${config.publicPath}/bigFile`

const uploadFile = async ctx => {
    ctx.set("Content-Type", "application/json");
    ctx.body = JSON.stringify({
        status: 200,
        message: '上传成功'
    });
}

const mergeChunk = async ctx => {
    const {filename,size} = ctx.request.body
    await mergeFileChunk(path.join(outputPath+'/'+filename,'_'+filename),filename,size)

    // 处理响应
    ctx.set("Content-Type", "application/json");
    ctx.body = JSON.stringify({
        data: {
            status: 200,
            filename,
            size
        },
        message: 'merge chunks successful！'
    });
}

const mergeFileChunk = async (filePath,filename,size) => {
    const chunksPath = path.join(outputPath,filename)
    const chunkPaths = fs.readdirSync(chunksPath);

    if(!chunkPaths) return

    chunkPaths.sort((a, b) => a.split("-")[1] - b.split("-")[1]);

    await Promise.all(
        chunkPaths.map((chunk,index)=>{
            pipeStream(path.resolve(chunksPath,chunk),fs.createWriteStream(filePath,{
                start: index * size,
                end: (index + 1) * size
            }))
        })
    )

}

// 通过管道处理流
const pipeStream = (path, writeStream) => {
    return new Promise(resolve => {
        const readStream = fs.createReadStream(path);
        readStream.pipe(writeStream);
        readStream.on("end", () => {
            fs.unlinkSync(path);
            resolve();
        });
    });
}

module.exports = {
    uploadFile,
    mergeChunk,
}