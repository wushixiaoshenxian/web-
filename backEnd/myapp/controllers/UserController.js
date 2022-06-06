var dbConfig = require('../util/dbconfig')
var setToken = require('../util/token')

login = (req, res) => {
    let id = req.body.id;
    let password = req.body.password
    var sql = `select * from t_login where id = ? `;
    var sqlArr = [id];
    var callBack = (err, result) => {
        if (err) {
            console.log('err')
        }
        else {
            if (result.length !== 1) {
                res.send({
                    'code': 400,
                    'msg': '用户不存在'
                })
            }
            else if (result[0].password !== password) {
                res.send({
                    'code': 401,
                    'msg': '密码错误'
                })
            } else {
                res.send({
                    'code': 200,
                    'msg': '登陆成功',
                    'token': setToken.setToken(id, password)
                })
            }
        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack);
}


checkBeforeRegister = (req, res) => {
    const { id } = req.query;
    var sql = `select * from t_login where id = ? `;
    var sqlArr = [id];
    var callBack = (err, result) => {
        if (err) {
            console.log('err')
        } else {
            console.log(result)
            if (result.length > 0) {
                res.send({
                    'code': 201,
                    'msg': '用户已存在'
                })
            } else {
                res.send({
                    'code': 200,
                    'msg': '可用的id'
                })
            }
        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack);
}

register = (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const information = req.body.information;
    const address = req.body.address;
    const password = req.body.password;
    var sql = `insert into t_information values (?,?,?,?,?);insert into t_login values (?,?,?)`;
    var sqlArr = [id, name, information, address, password, id, password, name];
    console.log(sqlArr)
    var callBack = (err, result) => {
        if (err) {
            res.send({
                'code': 400,
                'msg': '注册失败'
            })
            console.log('注册失败')
        } else {
            res.send({
                'code': 200,
                'msg': '注册成功'
            })

        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack);
}


// sendEmail = (req, res) => {

//     var options = {
//         from: '"official" <1257155162@qq.com>',
//         to: '"用户1" <邮箱地址1>',
//         // cc         : ''  //抄送
//         // bcc      : ''    //密送
//         subject: '更改密码',
//         text: '',
//     };

//     email.mailTransport.sendMail(options, function (err, msg) {
//         if (err) {
//             console.log(err);
//             res.render('index', { title: err });
//         }
//         else {
//             console.log(msg);
//             res.render('index', { title: "已接收：" + msg.accepted });
//         }
//     });
// }

changePassword = (req, res) => {
    let id = req.body.id;
    let password = req.body.password
    var sql = `update t_login set password = ? where id = ? ;update t_information set password = ? where id = ? `;
    var sqlArr = [password, id, password, id];
    var callBack = (err, result) => {
        if (err) {
            res.send({
                'code': 400,
                'msg': '更改失败',
            })
        }
        else {
            res.send({
                'code': 200,
                'msg': '更改成功',
            })
        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack);
}


anothorLogin = (req, res) => {
    const { id } = req.query;
    var sql = `select * from t_anotheruser where id = ? `;
    var sqlArr = [id];
    var callBack = (err, result) => {
        if (err) {
            console.log('err')
        } else {
            console.log(result)

            res.send({
                'code': 200,
                'msg': '可用的id',
                'data': result
            })

        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack);
}
module.exports = { login, checkBeforeRegister, register, changePassword,anothorLogin }