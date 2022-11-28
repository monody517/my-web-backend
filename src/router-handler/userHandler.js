const allSqlAction = require('../db/mysql')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {jwtSecretKey} = require('../config/config')
const path = require('path')
const glob = require('glob') // 读取文件

const registerUser = async ctx => {
    let { phone, password } = ctx.request.body
    console.log(ctx.request.body);

    let sql2 = `select * from elm_user where elm_userPhone=${phone}`
    let result = await allSqlAction.allSqlAction(sql2).then(async (res) => {
        if (res.length > 0) {
            return {
                status: 500,
                massage: '手机号被占用，请更换其他用户名',
            }
        }
        password = bcrypt.hashSync(password, 10)
        let sql1 = `insert into elm_user (elm_userPhone,elm_userPassword) values ('${phone}','${password}')`
         return await allSqlAction.allSqlAction(sql1).then(res => {
            if (res.affectedRows === 1) {
                return {
                    status: 200,
                    massage: '注册成功',
                }
            } else {
                return {
                    status: 500,
                    massage: '注册失败',
                }
            }
         })
    })

    return ctx.body = result
}

const login = async ctx => {
    let { phone, password } = ctx.request.body
    const sql = 'select * from elm_user where elm_userPhone=?'

    const result = await allSqlAction.allSqlAction(sql, phone).then(res => {
        console.log(res);
        if (res.length !== 1) {
            return {
                status: 500,
                massage: '用户不存在',
            }
        }
        const compareResult = bcrypt.compareSync(password,res[0].elm_userPassword)
        if(!compareResult){
            return {
                status: 500,
                massage: '密码错误',
            }
        }

        const user = {...res[0],password:'',user_imgUrl: ''}
        const tokenStr = jwt.sign(user,jwtSecretKey,{
            expiresIn: '10h'
        })

        return {
            status: 200,
            massage: '登录成功',
            // token: 'Bearer ' + tokenStr,
            // user: user
            data: {
                userPhone: res[0].elm_userPhone,
                userAvar: res[0].elm_imgUrl,
                token: 'Bearer ' + tokenStr,
            }
        }
    })

    return ctx.body = result
}

const uploadAvatar = async ctx => {
    let { phone, imgUrl } = ctx.request.body

    const files = glob.sync(path.resolve(__dirname, "../../public/*"))
    const imgList = files.map(item => {
        return `${item.split('/')[6]}`
    })
   const exitImgList = imgList.filter(item=>{
        if(item.indexOf(imgUrl.split('.')[0])>-1){
            return item
        }
    })
    const avarUrl = `http://192.168.10.77:8082/${exitImgList[0]}`

    const sql = `UPDATE elm_user SET elm_imgUrl='${avarUrl}' WHERE elm_userPhone='${phone}'`

    const result = await allSqlAction.allSqlAction(sql).then(res => {
        if (res.affectedRows === 1) {
            return {
                status: 200,
                data: avarUrl,
                massage: '更新成功',
            }
        } else {
            return {
                status: 500,
                massage: '更新失败',
            }
        }
    })

    return ctx.body = result
}

const getUserAvar = async ctx => {
    console.log(ctx.request);
    const sql = 'select * from elm_user where elm_userPhone=?'

    const phone = ctx.request.url.split('?')[1].split('=')[1]

    console.log(phone);

    const result = await allSqlAction.allSqlAction(sql, phone).then(res => {
        if (res.length !== 1) {
            return {
                status: 500,
                massage: '用户不存在',
            }
        }else {
            return {
                status: 200,
                // token: 'Bearer ' + tokenStr,
                // user: user
                data: {
                    userPhone: res[0].elm_userPhone,
                    userAvar: res[0].elm_imgUrl,
                }
            }
        }
    })
    return ctx.body = result
}

module.exports = {
    registerUser,
    login,
    uploadAvatar,
    getUserAvar
}
