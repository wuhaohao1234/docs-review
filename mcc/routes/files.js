var express = require('express');
var router = express.Router();
const multer = require('multer');
var path = require('path');
const fs = require('fs');
const filesController = require('../controller/filesController')
const formidable = require("formidable");
const ffmpeg = require("fluent-ffmpeg");

// 自定义上传目录 文件名
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("body")
        console.log(req.body)
        console.log(file)
        // cb(null, '../public/resources')   //  上传的文件目录（文件上传以后放在哪里）
        // let str = `./public/resources/raw/${req.body.type_id}`
        let str = '';

        if(req.body.type_id==1){
            str = '/Users/abu0418/Desktop/work/docs-review/词源识别/bert_bilstm_crf_wangyh/data/1';
        }else if(req.body.type_id==2){
            str = '/Users/abu0418/Desktop/work/docs-review/W2NER-new/output';
        }else if(req.body.type_id==3){
            str = '/Users/abu0418/Desktop/work/docs-review/文本分类/bert_bilstm_crf_wangyh/data/1';
        }else if(req.body.type_id==4){
            str = '/Users/abu0418/Desktop/work/docs-review/段落切分/bert_bilstm_crf_wangyh/data/1';
        }


        cb(null, str)   //  上传的文件目录（文件上传以后放在哪里）
    },
    filename: function (req, file, cb) { 
        console.log(file, '文件')
        // console.log(file.originalname) 
        let fileName = Buffer.from(file.originalname, "latin1").toString(
            "utf8"
        );//文件原名
        console.log(fileName)
        let exts = file.originalname.split('.') //拿到源文件的后缀名
        // console.log("改名中1")
        let ext = exts[exts.length - 1]
        // console.log("改名中2")
        let tmpname = (new Date()).getTime() + parseInt(Math.random() * 9999) //为了避免重复，用时间戳表示
        // console.log("改名完成")
        file.baseName = `${fileName.split('.')[0]}`//原名
        file.totalName = `${tmpname}.${ext}`
        file.ext = ext
        cb(null, `${tmpname}.${ext}`);
        // cb(null, `${fileName}`);//不改名
        console.log("\nmcdsfdfsafasfasasdasdsad \n")
        // 文件切片
        // console.log(ext)
    },
    onError: function (err, next) {
        console.log(err); // 输出错误信息
        next(err); // 将错误对象传递给中间件链中的下一个错误处理中间件
    }
})

const upload = multer({ storage: storage })
// 配置 multer 中间件，用于文件上传
// const upload = multer({ dest: '../public/images' });





router.post('/download', function (req, res) {
    console.log(123, req.body)
    let filePath = ''; // 该文件的路径
    if(req.body.type_id==1){
        filePath = '/Users/abu0418/Desktop/work/docs-review/词源识别/bert_bilstm_crf_wangyh/data/out';
    }else if(req.body.type_id==2){
        filePath = '/Users/abu0418/Desktop/work/docs-review/W2NER-new/output';
    }else if(req.body.type_id==3){
        filePath = '/Users/abu0418/Desktop/work/docs-review/文本分类/bert_bilstm_crf_wangyh/data/1';
    }else if(req.body.type_id==4){
        filePath = '/Users/abu0418/Desktop/work/docs-review/段落切分/bert_bilstm_crf_wangyh/data/1';
    }
    console.log(filePath)
    let baseName = `${ req.body.tmpname.split('.')[0]}`//原名
    let ext = `${ req.body.tmpname.split('.')[1]}`
    console.log(baseName+`${req.body.isRaw == 1 ? "" : "treated"}.${ext}`)
    let tarname =baseName+`${req.body.isRaw == 1 ? "" : "treated"}.${ext}`
    try {
        console.log(filePath + "/" + tarname);
        console.log('-----------------------');
        res.download(filePath+"/"+tarname, baseName+`${req.body.isRaw == 1 ? "" : "treated"}.${ext}`, (err) => {
            console.log('cuowu', err)
            if(err){
                res.send({status:false,message:"文件未处理完成"})
            }
            
        });
    } catch (err) {
        res.send({ status: false })
        console.error('下载文件出错：', err);
        res.status(500).send('下载文件出错！');
    }
});

router.post('/view', function (req, res) {
    console.log(123, req.body)
    let filePath = ''; // 该文件的路径
    if(req.body.type_id==1){
        filePath = '/Users/abu0418/Desktop/work/docs-review/词源识别/bert_bilstm_crf_wangyh/data/out';
    }else if(req.body.type_id==2){
        filePath = '/Users/abu0418/Desktop/work/docs-review/W2NER-new/output';
    }else if(req.body.type_id==3){
        filePath = '/Users/abu0418/Desktop/work/docs-review/文本分类/bert_bilstm_crf_wangyh/data/1';
    }else if(req.body.type_id==4){
        filePath = '/Users/abu0418/Desktop/work/docs-review/段落切分/bert_bilstm_crf_wangyh/data/1';
    }
    console.log(filePath)
    let baseName = `${ req.body.tmpname.split('.')[0]}`//原名
    let ext = `${ req.body.tmpname.split('.')[1]}`
    console.log(baseName+`${req.body.isRaw == 1 ? "" : "treated"}.${ext}`)
    let tarname =baseName+`${req.body.isRaw == 1 ? "" : "treated"}.${ext}`
    try {
        console.log(filePath + "/" + tarname);
        console.log('-----------------------');
        res.send({
            status:true,
            filePath:filePath+"/"+tarname
        })
        // res.download(filePath+"/"+tarname, baseName+`${req.body.isRaw == 1 ? "" : "treated"}.${ext}`, (err) => {
        //     console.log('cuowu', err)
        //     if(err){
        //         res.send({status:false,message:"文件未处理完成"})
        //     }
            
        // });
    } catch (err) {
        res.send({ status: false })
        console.error('下载文件出错：', err);
        res.status(500).send('下载文件出错！');
    }
});


// 前台获取指定pageNum和pageSize的指定类型文件
router.get('/infoSearchFile', function (req, res, next) {
    console.log(req.query)
    filesController.infoSearchFile(req.query, data => {
        res.send(data)
    })
})

// 前台编辑公告添加图片
router.post('/notic_img', upload.single("file"), filesController.addNoticeImg)

// 获取指定pageNum和pageSize的指定类型文件
router.get('/list', function (req, res, next) {
    console.log(req.query, 'filesList')
    filesController.getList(req.query, data => {
        res.send(data)
    })
})
// 获取单个video信息
router.get('/infoOne', function (req, res, next) {
    console.log('req.params.id')
    console.log(req.query)
    filesController.getOne(req.query, data => {
        res.send(data)
    })
})

// 获取指定pageNum和pageSize的指定类型文件
router.get('/infolist', function (req, res, next) {
    console.log(req.query)
    filesController.getList(req.query, data => {
        res.send(data)
    })
})
// 文件上传
router.post('/upload', upload.array("file", 30), filesController.Add)
// 文件删除
router.post('/dlt', function (req, res, next) {
    console.log(123)
    var { id } = req.body
    console.log(id)
    filesController.dltOne(id, data => {
        res.send(data)
    })
})

router.post('/getOne', function (req, res, next) {
    var { mangaId } = req.query
    console.log(mangaId)
    filesController.mangaId(mangaId, data => {
        res.send(data)
    })
})
// 修改单个文件信息
router.post('/revise', function (req, res, next) {
    console.log("123", req.params)
    console.log(req.body)
    filesController.updateOne(req.body, data => {
        res.send(data)
    })
})

// 修改单个文件信息
router.post('/infoTxtDetail', function (req, res, next) {
    console.log("idtxt", req.body)
    filesController.infoTxtDetail(req.body, data => {
        res.send(data)
    })
})

// router.post('/dltMore', function (req, res, next) {
//     var { id_arr } = req.query
//     console.log(id_arr)
//     mangaController.dltMore(id_arr, data => {
//         res.send(data)
//     })
// })
// router.post('/update', function (req, res, next) {
//     var { manga } = req.query
//     // console.log(user, req.query)
//     mangaController.updateOne(manga, data => {
//         res.send(data)
//     })
// })

module.exports = router;
