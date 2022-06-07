var dbConfig = require('../util/dbconfig');

getMessage = (req, res) => {
    const { id } = req.query;
    var sql = `select * from t_leavemessage where id = ?`;
    var sqlArr = [id];
    var callBack = (err, result) => {
        if (err) {
            console.log('err')
        } else {
            res.send({
                'code': 200,
                'msg': 'success',
                'data': result
            })

        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack);
}


addMessage = (req, res) => {
    const  id  = req.body.id;
    const  address  = req.body.address;
    const  message = req.body.message;
    var sql = `insert into t_leavemessage(id,address,message) values(?,?,?)`;
    var sqlArr = [id,address,message];
    var callBack = (err, result) => {
        if (err) {
            console.log('err')
        } else {
            res.send({
                'code': 200,
                'msg': 'success',
            })
        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack);
}

module.exports = { getMessage,addMessage }