var express = require('express');
var router = express.Router();
const typeController = require('../controller/typeController');
const {
    route
} = require('./currency');

/* GET types listing. */
// 获取指定pageNum和pageSize和类型的types
router.get('/list', function (req, res, next) {
    typeController.typeList(req.query, data => {
        res.send(data)
    })
})
// 修改单个文件夹信息
router.post('/reviseDir', function (req, res, next) {
    console.log("123", req.params)
    console.log(req.body)
    typeController.updateDirOne(req.body, data => {
        res.send(data)
    })
})
// 获取指定pageNum和pageSize和类型的types
router.get('/infoTypeListA', function (req, res, next) {
    console.log(req.query)
    typeController.typeList(req.query, data => {
        res.send(data)
    })
})
router.get('/totalList', function (req, res, next) {
    typeController.totalTypeList(req.query, data => {
        res.send(data)
    })
})

router.post('/imgAdd', function (req, res, next) {
    var type = req.query
    typeController.imgTypeAdd(type, data => {
        res.send(data)
    })
})
router.post('/txtAdd', function (req, res, next) {
    var type = req.query
    typeController.txtTypeAdd(type, data => {
        res.send(data)
    })
})
router.post('/videoAdd', function (req, res, next) {
    var type = req.query
    typeController.videoTypeAdd(type, data => {
        res.send(data)
    })
})
router.post('/dlt', function (req, res, next) {
    var {
        id
    } = req.query
    typeController.dltTypeOne(id, data => {
        res.send(data)
    })
})
router.post('/txtDlt', function (req, res, next) {
    var {
        id
    } = req.query
    typeController.dltTypeOne(id, data => {
        res.send(data)
    })
})
router.post('/videoDlt', function (req, res, next) {
    var {
        id
    } = req.query
    typeController.dltTypeOne(id, data => {
        res.send(data)
    })
})

router.post('/update', function (req, res, next) {
    var {
        type
    } = req.query
    typeController.updateType(type, data => {
        res.send(data)
    })
})

module.exports = router;
