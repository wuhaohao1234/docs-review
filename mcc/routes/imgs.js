const { query } = require('express');
var express = require('express');
var router = express.Router();
const fs = require('fs')
const imgController = require('../controller/imgController')
var path = require("path")
/* GET users listing. */
router.get('/infoImg', function (req, res, next) {
    res.send('respond with a resource');
});
// 获取所有的users
router.get('/all', function (req, res, next) {
    imgController.getAll(data => {
        res.send(data)
    })
})
router.get('/:name', function (req, res, next) {
    console.log('访问图片', req.params)
    // var { imgId } = req.query
    // 拿到路径然后去访问
    // 拿到名字去指定的文件访问
    var filePath = path.resolve(__dirname, `../public/assets/imgs/${req.params.name}`)
    fs.readFile(
        filePath,
        (err, data) => {
            console.log(data, 'photo')
            res.send(data)
        }
    )
})
// video截图访问
router.get('/thum/:name', function (req, res, next) {
    console.log('访问图片', req.params)
    // var { imgId } = req.query
    // 拿到路径然后去访问
    // 拿到名字去指定的文件访问
    var filePath = path.resolve(__dirname, `../public/video/thumbnail/${req.params.name}`)

    fs.readFile(
        filePath,
        (err, data) => {
            console.log(data, 'photo')
            res.send(data)
        }
    )
})
router.post('/add', function (req, res, next) {
    var img = req.query
    console.log(img)
    imgController.Add(img, data => {
        res.send(data)
    })
})
router.post('/dlt', function (req, res, next) {
    var { img_id } = req.query
    imgController.dltOne(img_id, data => {
        res.send(data)
    })
})
router.post('/dltMore', function (req, res, next) {
    var { id_arr } = req.query
    console.log(id_arr)
    imgController.dltMore(id_arr, data => {
        res.send(data)
    })
})
router.post('/update', function (req, res, next) {
    var { img } = req.query
    // console.log(user, req.query)
    imgController.updateOne(img, data => {
        res.send(data)
    })
})
module.exports = router;
