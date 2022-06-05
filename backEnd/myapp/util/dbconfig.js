const mysql = require('mysql')
module.exports = {
    // 数据库配置
    config: {
        host: '124.221.205.51',
        port: 3306,
        user: 'manages',
        password: '111111',
        database: 'manages',
        multipleStatements: true
    },
    // 连接数据库，mysql连接池
    sqlConnect: function (sql, sqlArr, callBack) {
        var pool = mysql.createPool(this.config)
        pool.getConnection((err, conn) => {
            if (err) {
                console.log('失败')
            }
            // 回调
            conn.query(sql, sqlArr, callBack)
            //释放连接
            conn.release()
        })
    }
}