var express = require('express');
var router = express.Router();
const baseController = require('../controller/baseController')

// 默认传回所有数据
router.get('/', function (req, res, next) {

});
router.get('/baseData', function (req, res, next) {
    baseController.getBaseData(data => {
        res.send(data)
    })
});

module.exports = router