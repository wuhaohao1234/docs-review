var express = require('express');
var router = express.Router();
const vipController = require('../controller/vipController');
const { route } = require('./currency');

/* GET users listing. */
router.get('/', function (req, res, next) {
    if (!req.session.user) {
        res.render("index")
    }
});
router.get('/createCode', function (req, res, next) {
    //
    vipController.createVipCode(data => {
        res.send(data)
    })
});
router.post('/add', function (req, res, next) {
    vipController.vipCodeAdd(req.body, data => {
        res.send(data)
    })
});
router.get('/list', function (req, res, next) {
    //
    vipController.vipCodeList(req.query, data => {
        res.send(data)
    })
});
router.post('/dlt', function (req, res, next) {
    //
    vipController.vipCodeDlt(req.query, data => {
        res.send(data)
    })
});
// vip兑换
router.post('/infoVipExchange', function (req, res, next) {
    console.log(req.body)
    vipController.vipExchange(req.body, data => {
        res.send(data)
    })
});
module.exports = router;
