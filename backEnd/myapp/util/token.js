//用于生成和解析token
var jwt = require('jsonwebtoken');
var signkey = 'mes_qdhd_mobile_xhykjyxgs';
exports.setToken = function (username, password) {
    return jwt.sign({
        name: username,
        password: password
    }, signkey);

}
exports.verToken = function (token) {
    return new Promise((resolve, reject) => {
        var info = jwt.verify(token.split(' ')[1], signkey);
        resolve(info);
    })
}