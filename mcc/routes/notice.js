var express = require('express');
var router = express.Router();
const noticeController = require('../controller/noticeController');

/* GET users listing. */
router.get('/', function (req, res, next) {
    if (!req.session.user) {
        res.render("index")
    }
});
router.get('/get', function (req, res, next) {
    noticeController.getContent(data => {
        res.send(data)
    })
});
router.post('/revise', function (req, res, next) {
    noticeController.contentUpdate(req.body, data => {
        res.send(data)
    })
});
router.get("/freeGet", function (req, res, next) {
    console.log("前台公告")
    noticeController.getContent(data => {
        res.send(data)
    })
})
router.post("/setVipUrl", function (req, res, next) {
    console.log("前台vip兑换网址", req.body)
    noticeController.setVipUrl(req.body, data => {
        res.send(data)
    })
})
router.get("/getVipUrl", function (req, res, next) {
    console.log("前台获取vip兑换网址")
    noticeController.getVipUrl(data => {
        res.send(data)
    })
})
module.exports = router;
