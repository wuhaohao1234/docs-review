var express = require('express');
var router = express.Router();
const fs = require('fs')
const path = require('path')
// ffmpeg测试
var ffmpeg = require('fluent-ffmpeg');

/* GET home page. */
// 整体传输
router.get('/', function (req, res, next) {
    let videoPath = path.resolve(__dirname, '../public/video/mbcc.mp4')

    fs.readFile(videoPath, (err, data) => {
        if (err) throw err;
        res.send(data);
    })
});
// stream传输
// 我们可以借助 fs 的 Stream 来实现视频流式读取和流式传输
router.get('/', function (req, res, next) {

    let videoPath = path.resolve(__dirname, '../public/video/mbcc.mp4')

    let readStream = fs.createReadStream(videoPath)

    readStream.pipe(res);
});
// 切片传输
// ffmpeg
router.get('/handled/:dirName/:videoName', function (req, res, next) {
    console.log(req.params)
    let videoPath = path.resolve(__dirname, `../public/video/handled/${req.params.dirName}/${req.params.videoName}`)
    fs.readFile(videoPath, (err, data) => {
        if (err) throw err;
        res.send(data);
    })
});


module.exports = router;
