const fileModel = require('../model/fileModel.js')
const userModel = require("../model/userModel")
var path = require('path');
const fs = require("fs")
const ffmpeg = require("fluent-ffmpeg");
const axios = require("axios")
const baseUrl = "192.168.10.4"//本地地址
// const baseUrl = "1.12.43.54"//线上地址
// 公告图片上传
function addNoticeImg(req, res, next) {
    console.log('上传文件')
    console.log(req.body)
    console.log(req.file)
    // 保存图片存储路径
    var route_path = `http://${baseUrl}:7735/imgs/${req.file.filename}`
    console.log("准备写入数据库")
    fileModel.addNoticeImg({
        url: route_path
    }, data => {
        console.log("插入返回", data)
        if (data.affectedRows > 0) {
            res.send({
                status: true,
                message: "添加文件成功",
                url: route_path
            })
        } else {
            res.send({
                status: false,
                message: "添加文件失败"
            })
        }
    })
}

// 获取单个文件详情
function getOne(data, callback) {
    userModel.infoUserIdQuery(data.userId, is_vip => {
        fileModel.getOne(data.id, result => {
            console.log(result)
            if (result[0].is_free == '0' && is_vip == "0") {
                result[0].url = ""
            }
            obj = {
                status: true,
                data: result[0],
                message: "查询成功"
            }
            callback(obj)
        })
    })
}
// 前台获取所指定页数 size 类型的文件
function infoSearchFile(params, callback) {
    fileModel.infoSearchFile(params, data => {
        fileModel.info_aim_file_mation(params, data2 => {
            console.log(data2)
            callback({
                list: data,
                total: data2[0]["count(*)"]
            })
        })
    })
}
// 获取所指定页数 size 类型的文件
function getList(params, callback) {
    fileModel.getList(params, data => {
        fileModel.info_file_mation(params, data2 => {
            callback({
                list: data,
                total: data2[0]["count(*)"]
            })
        })
    })
}
// 添加文件
function Add(req, res, next) {
    console.log('上传文件')
    console.log(req.body)
    console.log(req.files)
    // 保存图片存储路径
    var route_arr = []
    for (let i = 0; i < req.files.length; i++) {
        // 存储进入数据库
        console.log("进入循环", i)
        route_arr.push({
            tmpname: req.files[i].totalName,
            nativename: req.files[i].baseName,
            userId: req.body.userId,
            operationId: req.body.type_id,
            status: 0,
            fileType: req.files[i].ext,
            username: req.body.username,
        })
        console.log('处理')
        console.log(223)
        let pyUrl = "http://127.0.0.1:5000/process_file"
        if(req.body.type_id==1){
            pyUrl = "http://127.0.0.1:5000/process_file"
        }else if(req.body.type_id==2){
            pyUrl = "http://127.0.0.1:5000/predict"
        }else if(req.body.type_id==3){
            pyUrl = "http://127.0.0.1:5000/process_file"
        }else if(req.body.type_id==4){
            pyUrl = "http://127.0.0.1:5000/process_file"
        }
        // axios({
        //     url:pyUrl,
        //     method: "POST",
        //     data: {
        //         filename:req.files[i].totalName,
        //     },
        // }).then(res=>{
        //     console.log(res)
        // }).catch(err=>{
        //     console.log(err.message)
        // })
      

    }
    console.log("准备写入数据库", route_arr)




    fileModel.Add({
        list: route_arr
    }, data => {
        console.log("插入返回", data)
        if (data.affectedRows > 0) {
            res.send({
                status: true,
                message: "添加文件成功"
            })
        } else {
            res.send({
                status: false,
                message: "添加文件失败"
            })
        }
    })

}
// 删除单个文件
function dltOne(id, callback) {
    fileModel.dltOne(id, data => {
        if (data) {
            callback({
                status: true,
                message: '删除文件数据成功'
            })
        } else {
            callback({
                status: false,
                message: '删除文件数据失败'
            })
        }
    })
}
// 删除多个角色
function dltMore(idArr, callback) {
    console.log(idArr)
    mangaModel.dltMore(idArr, data => {
        if (data) {
            callback({
                status: true,
                message: '删除角色数据成功'
            })
        } else {
            callback({
                status: false,
                message: '删除角色数据失败'
            })
        }
    })
}
// 更新单个文件
function updateOne(data, callback) {
    fileModel.updateOne(data, data => {
        if (data) {
            callback({
                status: true,
                message: '修改成功'
            })
        } else {
            callback({
                status: false,
                message: '修改失败'
            })
        }
    })
}
// 单个txt文件内容
function infoTxtDetail(txt, callback) {
    fileModel.getOne(txt.id, data => {
        if (data.length != 0) {
            var name = data[0].url.split("/")[4]
            console.log(name)
            let videoPath = path.resolve(__dirname, `../public/assets/txts/${name}`)
            fs.readFile(videoPath, (err, result) => {
                console.log(result)
                data[0].content = result.toString()
                callback({
                    status: true,
                    data: data[0],
                    message: '查询成功'
                })
                if (err) throw err;
            })
        } else {
            callback({
                status: false,
                message: '查询失败'
            })
        }
    })
}

module.exports = { addNoticeImg, infoSearchFile, infoTxtDetail, getOne, getList, Add, dltOne, dltMore, updateOne }

function videoSlice(videoName, ext) {
    console.log("创建文件夹", videoName, ext)
    let dirPath = path.join(__dirname, `../public/video/handled/${videoName}`); // 文件夹地址

    fs.mkdir(dirPath, function (err) {
        if (err)
            console.error(err);
        console.log('创建目录成功');
    });
    console.log("开始切片")
    let filePath = path.join(__dirname, `../public/video/baseFile/${videoName}.${ext}`); // 视频地址
    console.log(filePath)
    ffmpeg(filePath)
        .videoCodec('libx264') // 设置视频编解码器
        // .audioCodec('libfaac') // 设置 音频解码器
        .format('hls') // 输出视频格式
        .outputOptions('-hls_list_size 0') //  -hls_list_size n:设置播放列表保存的最多条目，设置为0会保存有所片信息，默认值为5
        .outputOption('-hls_time 2') // -hls_time n: 设置每片的长度，默认值为2。单位为秒
        .output(path.join(__dirname, `../public/video/handled/${videoName}/${videoName}.m3u8`)) // 输出文件
        .on('progress', (progress) => { // 监听切片进度
            console.log('Processing: ' + progress.percent + '% done');
        })
        .on('error', function (err) {
            console.log('An error occurred: ' + err.message);
        })
        .on('end', () => { // 监听结束
            console.log("视频切片完成");
        })
        .run(); // 执行
}


// 获取视频略缩图
function getVideoThumbnail(videoName, ext) {
    console.log("开始获取视频略缩图")
    let filePath = path.join(__dirname, `../public/video/baseFile/${videoName}.${ext}`); // 视频地址
    let outputPath = path.join(__dirname, `../public/video/thumbnail`); // 输出地址
    var proc = ffmpeg(filePath)
        // setup event handlers
        .on('filenames', function (filenames) {
            console.log('screenshots are ' + filenames.join(', '));
        })
        .on('end', function () {
            console.log('screenshots were saved');
        })
        .on('error', function (err) {
            console.log('an error happened: ' + err.message);
        })
        // take 2 screenshots at predefined timemarks and size
        .takeScreenshots({ count: 1, filename: `${videoName}.png`, timemarks: ['6'] }, outputPath);
}
async function vidoeOperation(videoName, ext) {
    await videoSlice(videoName, ext)//视频切片
    await getVideoThumbnail(videoName, ext)//视频截取略缩图
}