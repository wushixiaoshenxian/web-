var dbConfig = require('../util/dbconfig');

getFriend = (req, res) => {
    const { id } = req.query;
    var sql = `select * from t_friend where id = ?`;
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

addFriend = (req, res) => {
    const id = req.body.id;
    const friend = req.body.friend;
    var sql = `insert into t_friend(id,friend) values (?,?)`;
    var sqlArr = [id, friend];
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

getEvent = (req, res) => {
    const { id,friend } = req.query;
    var sql = `select * from t_event where id = ? and friend = ?`;
    var sqlArr = [id,friend];
    var callBack = (err, result) => {
        if (err) {
            res.send({
                'code': 400,
                'msg': '错误',
            })
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

addEvent = (req, res) => {
    const id = req.body.id;
    const friend = req.body.friend;
    const event = req.body.event;
    const value = req.body.value;
    var sql = `insert into t_event(id,friend,event,value) values (?,?,?,?)`;
    var sqlArr = [id, friend,event,value];
    var callBack = (err, result) => {
        if (err) {
            res.send({
                'code': 400,
                'msg': '错误',
            })
        } else {
            res.send({
                'code': 200,
                'msg': 'success',
            })

        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack);
}
module.exports = { getFriend, addFriend,getEvent,addEvent }