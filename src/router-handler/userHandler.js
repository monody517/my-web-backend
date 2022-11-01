const allSqlAction = require('../db/mysql')

const registerUser = async ctx => {
    let { phone, password } = ctx.request.body
    let sql1 = `insert into elm_user (elm_userPhone,elm_userPassword) values ('${phone}','${password}')`
    let sql2 = `select * from elm_user where elm_userPhone=${phone}`
    let result = await allSqlAction.allSqlAction(sql2).then((res) => {
        if (res.length > 0) {
            return {
                status: 500,
                massage: '用户名被占用，请更换其他用户名',
            }
        } else {
            allSqlAction.allSqlAction(sql1).then(res => {
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
        }
    })

    console.log('result',result);

    return ctx.body = result
}

module.exports = {
    registerUser
}