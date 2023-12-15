const { query } = require('express');
var express = require('express');
var path = require("path")
var router = express.Router();
const fs = require('fs')


router.get('/:name', function (req, res, next) {
    console.log('访问txt', req.params)
    // var { imgId } = req.query
    // 拿到路径然后去访问
    // 拿到名字去指定的文件访问

    var filePath = path.resolve(__dirname, `../public/assets/txts/${req.params.name}`)

    fs.readFile(
        filePath,
        (err, data) => {
            console.log(data, 'txt')
            res.send(data)
        }
    )
})
module.exports = router;
