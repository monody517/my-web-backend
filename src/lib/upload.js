const fs = require('fs')

// 读取文件, 如果路径不存在则创建对应的路径
function RF(path) {
    if (fs.existsSync(path)) {
        const data = fs.readFileSync(path)
        return data.toString() ? JSON.parse(data) : null
    }
    // 如果不存在, 则创建空文件
    const pathArr = path.split('/')
    const filename = pathArr.pop()
    // 创建目录
    fs.mkdirSync(pathArr.join('/'), { recursive: true })
    fs.writeFileSync(path, '')
    return null
}

module.exports = {
    RF
}