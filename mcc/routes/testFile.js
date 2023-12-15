var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log("访问文件")
    var filePath = '../public/assets/txts/index.txt'
    fs.readFile(
        filePath,
        (err, data) => {
            console.log(data, 'photo')
            res.send(data)
        }
    )
});

module.exports = router;
