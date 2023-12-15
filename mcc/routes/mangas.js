var express = require('express');
var router = express.Router();
const multer = require('multer');
// 自定义上传目录 文件名
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/mangas')   //  上传的文件目录（文件上传以后放在哪里）
    },
    filename: function (req, file, cb) {
        console.log(file.originalname)
        let exts = file.originalname.split('.') //拿到源文件的后缀名
        let ext = exts[exts.length - 1]
        let tmpname = (new Date()).getTime() + parseInt(Math.random() * 9999) //为了避免重复，用时间戳表示
        cb(null, `${tmpname}.${ext}`);
    }
})

const upload = multer({ storage: storage })

const fs = require('fs');
const mangaController = require('../controller/mangaController')
const formidable = require("formidable");


/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send({
        message: 'ok'
    })
});
// 获取所有的users
router.get('/all', function (req, res, next) {
    mangaController.getAll(data => {
        res.send(data)
    })
})
router.post('/getOne', function (req, res, next) {
    var { mangaId } = req.query
    console.log(mangaId)
    mangaController.mangaId(mangaId, data => {
        res.send(data)
    })
})
// router.post('/add', upload.single("manga_cover"), mangaController.Add)
router.post('/add', upload.single("file"), mangaController.Add)

router.post('/dlt', function (req, res, next) {
    var { manga_id } = req.query
    mangaController.dltOne(manga_id, data => {
        res.send(data)
    })
})
router.post('/dltMore', function (req, res, next) {
    var { id_arr } = req.query
    console.log(id_arr)
    mangaController.dltMore(id_arr, data => {
        res.send(data)
    })
})
router.post('/update', function (req, res, next) {
    var { manga } = req.query
    // console.log(user, req.query)
    mangaController.updateOne(manga, data => {
        res.send(data)
    })
})
module.exports = router;
