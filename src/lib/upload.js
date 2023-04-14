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

/**
 * 写入文件,如果路径不存在则创建
 * path 文件路径
 * data 要写入的数据
 * mode 写入模式 0 覆盖 1 追加
 */
function WF(path, data, mode) {
    if (fs.existsSync(path)) {
        const source = fs.readFileSync(path)
        let sourceData = source.toString() ? JSON.parse(source) : ''
        if (sourceData && mode) {
            if (Array.isArray(sourceData)) {
                sourceData.push(data)
            } else {
                sourceData = Object.assign(sourceData, data)
            }
        } else {
            sourceData = data
        }
        try {
            fs.writeFileSync(path, JSON.stringify(sourceData))
            return true
        } catch (err) {
            return false
        }
    } else {
        const pathArr = path.split('/')
        const filename = pathArr.pop()
        // 创建目录
        fs.mkdirSync(pathArr.join('/'), { recursive: true })
        try {
            fs.writeFileSync(path, JSON.stringify(data))
            return true
        } catch (err) {
            return false
        }
    }
}

module.exports = {
    RF,WF
}