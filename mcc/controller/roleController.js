const roleModel = require('../model/roleModel.js')
// 查询单个角色详情
function getOne(roleId, callback) {
    roleModel.getOne(roleId, data => {
        obj = {
            roleData: data,
        }
        callback(obj)
    })
}
// 获取所有角色
function getAll(callback) {
    roleModel.getAll(data => {
        obj = {
            roleData: data,
        }
        callback(obj)
    })
}
// 添加角色
function Add(role, callback) {
    console.log('contraol');
    var arr = [role.role_id, role.role_name, role.pms_char, role.status]
    roleModel.Add(arr, data => {
        if (data) {
            callback({
                status: true,
                message: '插入角色数据成功'
            })
        } else {
            callback({
                status: false,
                message: '插入角色数据失败'
            })
        }
    })
}
// 删除单个角色
function dltOne(role_id, callback) {
    roleModel.dltOne(role_id, data => {
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
    roleModel.dltMore(idArr, data => {
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
function updateOne(role, callback) {
    roleModel.updateOne(role, data => {
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
