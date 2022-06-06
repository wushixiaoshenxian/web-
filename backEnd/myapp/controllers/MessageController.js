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

module.exports = { getMessage }