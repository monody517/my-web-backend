const allSqlAction = require('../db/mysql')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {jwtSecretKey} = require('../config/config')

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
                userAvr: res[0].elm_imgUrl,
                token: 'Bearer ' + tokenStr,
            }
        }
    })

    return ctx.body = result
}

const uploadAvatar = async ctx => {
    let { phone, imgUrl } = ctx.request.body
    const sql = `UPDATE elm_user SET elm_imgUrl='${imgUrl}' WHERE elm_userPhone='${phone}'`

    const result = await allSqlAction.allSqlAction(sql).then(res => {
        if (res.affectedRows === 1) {
            return {
                status: 200,
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

module.exports = {
    registerUser,
    login,
    uploadAvatar
}
