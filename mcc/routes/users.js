var express = require('express');
var router = express.Router();
const userController = require('../controller/userController');
const { route } = require('./currency');
var JWT = require('../util/JWT')
/* GET users listing. */
router.get('/', function (req, res, next) {
  if (!req.session.user) {
    res.render("index")
  }
});
// 后台登录
router.post('/land', function (req, res, next) {
  console.log(223)
  const user = req.body
  console.log('land', user)
  userController.validateLogon(user, data => {
    req.session//req.session 是一个对象，这个对象它会根据那个 cookie 那个值匹配。
    // 给sesion对象添加属性，表明房间状态，登录成功
    req.session.user = true
    console.log(req.session)
    res.send(data)
  })
});
// 前台登录
router.get('/infoLand', function (req, res, next) {
  const user = req.query
  console.log('infoland', user)
  userController.infoValidateLogon(user, data => {
    const token = JWT.generate({
      userData: data.data
    }, "24h")
    // token设置在header中
    res.header("Authorization", token)
    res.setHeader("Access-Control-Expose-Headers", "Authorization")
    res.send(data)
  })
});
// 查询用户信息
router.post('/infoLUQ', function (req, res, next) {
  console.log("查询")
  console.log(req.body, 'infoLuQ')
  userController.infoLandUserQuery(req.body, data => {
    res.send(data)
  })
})
router.post('/regist', function (req, res, next) {
  userController.userRegist(req.body, data => {
    res.send(data)
  })
})
router.get('/infoRegist', function (req, res, next) {
  userController.userRegist(req.query, data => {
    res.send(data)
  })
})
router.get('/loginout', function (req, res, next) {
  req.session.destroy(() => {
    res.send({
      message: '成功登出',
      status: true
    })
  })
})

// 修改账户
router.post('/revise', function (req, res, next) {
  console.log(req.body)
  userController.userRevise(req.body, data => {
    res.send(data)
  })
})


// 获取指定pageNum和pageSize的users
router.get('/list', function (req, res, next) {
  console.log(req.query)
  userController.userList(req.query, data => {
    res.send(data)
  })
})
// 获取指定pageNum和pageSize的message
router.get('/messageList', function (req, res, next) {
  userController.messageList(req.query, data => {
    res.send(data)
  })
})
router.get('/malist', function (req, res, next) {
  userController.bc_userList(req.query, data => {
    res.send(data)
  })
})
// info用户留言删除
router.post('/messageDlt', function (req, res, next) {
  console.log(req.body)
  console.log('用户留言删除')
  userController.messageDlt(req.body.id, data => {
    res.send(data)
  })
})
// info用户留言
router.post('/infoMessageLeave', function (req, res, next) {
  console.log(req.body)
  console.log(req.params)
  userController.messageLeave(req.body, data => {
    res.send(data)
  })
})
// info用户留言list
router.get('/infoMessageList', function (req, res, next) {
  userController.infoMessageList(req.query, data => {
    res.send(data)
  })
})
router.post('/add', function (req, res, next) {
  var user = req.body
  userController.userAdd(user, data => {
    console.log(data)
    res.send(data)
  })
})
router.post('/maadd', function (req, res, next) {
  var user = req.query
  console.log(user)
  userController.maUserAdd(user, data => {
    console.log(data)
    res.send(data)
  })
})
router.post('/dlt', function (req, res, next) {
  var { id } = req.query
  console.log(id)
  userController.dltUserOne(id, data => {
    res.send(data)
  })
})
router.post('/madlt', function (req, res, next) {
  var { id } = req.query
  console.log(id)
  userController.dltMaOne(id, data => {
    res.send(data)
  })
})
router.post('/update', function (req, res, next) {
  var { user } = req.query
  // console.log(user, req.query)
  userController.updateUser(user, data => {
    res.send(data)
  })
})
module.exports = router;
