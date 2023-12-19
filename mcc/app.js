var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var filesRouter = require("./routes/files")
var historyRouter = require("./routes/history")



var session = require('express-session')
var mysql = require('mysql')
var MySQLStore = require('express-mysql-session')(session);



// end
// 配置mysql
var options = {
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: 'abu0418',
  database: 'pynode'
};
// 设置sessin存储mysql数据库
var sessionConnection = mysql.createConnection(options);
var sessionStore = new MySQLStore({
  expiration: 1000 * 60 * 60 * 24 * 30,
  createDatabaseTable: true,	//是否创建表
  schema: {
    tableName: 'session_tab',	//表名
    columnNames: {		//列选项
      session_id: 'session_id',
      expires: 'expires',
      data: 'data'
    }
  }
}, sessionConnection);
var app = express();
// 允许跨域
// 设置允许跨域访问该服务
// 解决跨域问题
// 设置允许跨域访问该服务
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT,GET,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "X-Requestd-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next()
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// 如果跨域使用cors解决的，需要在配置选项中进行如下操作
const cors = require('cors');
const JWT = require('./util/JWT');
app.use(cors({ credentials: true, origin: true }))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// 注册session中间件
app.use(session({
  name: 'userlandsession',//session名字
  secret: 'faoijfaoijdfoa',//系统根据自项生成session密钥
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 30,//设置过期时间
    secure: false,//设置http和https协议都能获取到
  },
  resave: true,//设置每次访问后重新刷新cookie计时时间
  saveUninitialized: false,//设置为true 则访问网站就会生成cookie，但此kookie无用，只有登录后生效
  store: sessionStore,//设置session存储到数据库
}))
// 路由访问中间件
app.use((req, res, next) => {
  console.log(req.body)
  next()
})
app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/filesm', filesRouter)
app.use('/history', historyRouter)





// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

const userModel = require('./model/userModel')
var compute = require("./public/javascripts/compute")
function vipReset(data) {
  userModel.infoUserMationQuery(data.id, res => {
    if (res.length != 0) {
      if (res[0].vip_time < compute.nowTime()) {
        res[0].is_vip = 0
        userModel.infoUserUpdate(res[0], result => {
          console.log(result)
        })
      }
    }
  })
}
