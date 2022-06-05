var createError = require('http-errors');
var express = require('express');
const bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const expressJWT = require('express-jwt')
var vertoken = require('./util/token')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// 跨域
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    res.header("Access-Control-Allow-Headers", "content-type,Authorization");
    next();
});

//token 
app.use(function (req, res, next) {
    var token = req.headers['authorization'];
    if (token == undefined) {
        return next();
    } else {
        vertoken.verToken(token).then((data) => {
            req.data = data;
            return next();
        }).catch((error) => {
            return next();
        })
    }
});
//验证token是否过期并规定哪些路由不用验证
app.use(expressJWT({
    secret: 'mes_qdhd_mobile_xhykjyxgs'
}).unless({
    path: ['/users/login','/users/checkBeforeRegister','/users/register','/users/changePassword']//除了这个地址，其他的URL都需要验证
}));
//当token失效返回提示信息
app.use(function (err, req, res, next) {
    if (err.status == 401) {
        return res.status(401).send('token失效');
    }
});

var http = require('http');
var server = http.createServer(app)
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// 静态资源
app.use(express.static(path.join(__dirname, 'public')));
//post请求
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

server.listen('3000')
