const mangaModel = require('../model/mangaModel.js')
// 查询单个角色详情
function getOne(mangaId, callback) {
    mangaModel.getOne(mangaId, data => {
        obj = {
            mangaData: data,
        }
        callback(obj)
    })
}
// 获取所有角色
function getAll(callback) {
    mangaModel.getAll(data => {
        obj = {
            mangaData: data,
        }
        callback(obj)
    })
}
// 添加漫画
function Add(req, res, next) {
    console.log('上传图片')
    console.log(req.body.addForm)
    console.log(req.file)
    // 保存图片存储路径
    const manga_cover_route = req.file ?
        `/images/mangas/${req.file.filename}` :
        `/images/mangas/default.png`
    var addForm = JSON.parse(req.body.addForm)
    console.log(addForm.manga_id)
    var mangaArr = [
        addForm.manga_id,
        addForm.manga_name,
        addForm.status,
        addForm.pms_char,
        addForm.manga_writer,
        addForm.manga_editer,
        addForm.category,
        addForm.label,
        addForm.serial_status,
        addForm.manga_introduce,
        manga_cover_route,
        req.file.filename
    ]
    console.log(mangaArr)
    mangaModel.Add(mangaArr, data => {
        if (data) {
            res.send({
                status: true,
                message: '添加漫画信息成功'
            })
        } else {
            res.send({
                status: false,
                message: '添加漫画信息失败'
            })
        }
    })
}
// 删除单个角色
function dltOne(manga_id, callback) {
    mangaModel.dltOne(manga_id, data => {
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
// 更新角色
function updateOne(manga, callback) {
    mangaModel.updateOne(manga, data => {
        if (data) {
            callback({
                status: true,
                message: '修改角色成功'
            })
        } else {
            callback({
                status: false,
                message: '修改角色失败'
            })
        }
    })
}
module.exports = { getOne, getAll, Add, dltOne, dltMore, updateOne }
