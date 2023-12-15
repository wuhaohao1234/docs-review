const typeModel = require('../model/typeModel.js')
var db = require("../db/connect/db");



// 更新单个文件夹
function updateDirOne(data, callback) {
    typeModel.updateDirOne(data, data => {
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
//
function typeList(params, callback) {
    console.log(params.all)
    if (params.all == "true") {
        typeModel.typeAll(params, data => {
            callback({
                list: data,
                total: data.length
            })
        })
    } else {
        typeModel.typeList(params, data => {
            typeModel.info_type_mation(params.type_id, data2 => {
                callback({
                    list: data,
                    total: data2[0]["count(*)"]
                })
            })
            // callback(data)
        })
    }
}
function totalTypeList(params, callback) {
    typeModel.totalTypeList(params, data => {
        callback({
            list: data,
        })
    })

}

function bc_typeList(params, callback) {
    typeModel.bc_typeList(params, data => {
        typeModel.bc_type_mation(data2 => {
            callback({
                list: data,
                total: data2[0]["count(*)"]
            })
        })
        // callback(data)
    })
}
function imgTypeAdd(type, callback) {
    var arr = [type.name, type.type_id]
    typeModel.typeAdd(arr, data => {
        if (data) {
            callback({
                status: true,
                message: '新增类型成功'
            })
        } else {
            callback({
                status: false,
                message: '新增类型失败'
            })
        }
    })
}
function txtTypeAdd(type, callback) {
    console.log('contraol');
    var arr = [type.typename, type.password, type.nickname]
    typeModel.txtTypeAdd(arr, data => {
        if (data) {
            callback({
                status: true,
                message: '新增用户数据成功'
            })
        } else {
            callback({
                status: false,
                message: '新增用户数据失败'
            })
        }
    })
}
function videoTypeAdd(type, callback) {
    console.log('contraol');
    var arr = [type.typename, type.password, type.nickname]
    typeModel.videoTypeAdd(arr, data => {
        if (data) {
            callback({
                status: true,
                message: '新增用户数据成功'
            })
        } else {
            callback({
                status: false,
                message: '新增用户数据失败'
            })
        }
    })
}
function dltTypeOne(id, callback) {
    typeModel.dltTypeOne(id, data => {
        if (data) {
            callback({
                status: true,
                message: '删除类型成功'
            })
        } else {
            callback({
                status: false,
                message: '删除类型失败'
            })
        }
    })
}
function dltMaOne(id, callback) {
    typeModel.dltMaOne(id, data => {
        if (data) {
            callback({
                status: true,
                message: '删除用户数据成功'
            })
        } else {
            callback({
                status: false,
                message: '删除用户数据失败'
            })
        }
    })
}
// 更新用户
function updateType(type, callback) {
    // console.log('type', type)
    typeModel.updateType(type, data => {
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
module.exports = { updateDirOne, totalTypeList, typeList, bc_typeList, imgTypeAdd, txtTypeAdd, videoTypeAdd, dltTypeOne, dltMaOne, updateType }
