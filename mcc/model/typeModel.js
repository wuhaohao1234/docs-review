const sql = require('../db/reset/index')
var db = require("../db/connect/db");
const { json } = require('express');
// 各个表名
const bc_users = "bc_users"
const info_users = "info_users"
const info_ichiType = "info_ichitype"
const info_type = "info_type"
var compute = require("../public/javascripts/compute")




// 更新单个文件夹
function updateDirOne(data, callback) {
    console.log(data)
    sqlStr = `update ${info_ichiType} set name=?,is_top=? where id=?`
    var arr = [
        data.name,
        data.is_top,
        data.id
    ]
    console.log(sqlStr)
    db.query(sqlStr, arr, (err, results) => {

        if (err) {
            console.log(err.message)
            callback(false)
        } else if (results.affectedRows === 1) {
            console.log(results)
            callback(true)
        } else {
            console.log(err.message, '错误')
            callback(false)
        }
    })
}
function typeAll(params, callback) {
    sql.sqlQuery(`select * from  ${info_ichiType}  where type_id=${params.type_id}  order by id desc  `, data => {
        callback(data)
    })
}
// 得到指定pageNum和pageSize的前台类型
function typeList(params, callback) {
    console.log(params.pageNum, params.pageSize)
    console.log("查询文件夹列表", `select * from  ${info_ichiType} where type_id=${params.type_id} limit ${(params.pageNum - 1) * params.pageSize},${params.pageSize}`)
    sql.sqlQuery(`select * from  ${info_ichiType} where type_id=${params.type_id}  order by id desc  limit ${(params.pageNum - 1) * params.pageSize},${params.pageSize}`, data => {
        callback(data)
    })
}

function totalTypeList(params, callback) {
    sql.sqlQuery(`select * from  ${info_type}  order by id desc  `, data => {
        callback(data)
    })
}
// 得到指定pageNum和pageSize的后台用户
function bc_typeList(params, callback) {
    sql.sqlQuery(`select * from  ${bc_types}  order by id desc  limit ${(params.pageNum - 1) * params.pageSize},${params.pageSize}`, data => {
        callback(data)
    })
}
function info_type_mation(id, callback) {
    sql.sqlQuery(`select count(*) from ${info_ichiType} where type_id=${id}`, data => {
        callback(data)
    })
}
function bc_type_mation(callback) {
    sql.sqlQuery(`select count(*) from ${bc_types}`, data => {
        callback(data)
    })
}
// 得到所有部门
function departmentGetAll(callback) {
    sql.sqlQuery(`select * from departments`, data => {
        callback(data)
    })
}
// 查询用户name书否存在
function typeNameQuery(typeName, callback) {
    db.query(`select * from types where typeName="${typeName}"`, (err, results) => {
        if (results.length == 0) {
            callback(true)
        } else {
            callback(false)
        }
    })
}
// 用户注册
function typeRegist(arr, callback) {
    var str = 'INSERT INTO USERS (typeName,password) values(?,?)'
    db.query(str, arr, (err, results) => {
        if (err) {
            console.log(err)
            callback(false)

        }
        else if (results.affectedRows === 1) {
            callback(true)
        }
    })
}
// 添加类型
function typeAdd(arr, callback) {
    var str = `INSERT INTO ${info_ichiType} (name,type_id,createTime) values(?,?,?)`
    db.query(str, [arr[0], arr[1], compute.nowTime()], (err, results) => {
        console.log(results)
        if (err) {
            callback(false)
        }
        else if (results.affectedRows === 1) {
            callback(true)
        }
    })
}
// 删除单个Type
function dltTypeOne(id, callback) {
    sqlStr = `delete from ${info_ichiType} where id='${id + ''}'`
    db.query(sqlStr, (err, results) => {
        if (err) {
            console.log(err.message)
            callback(false)
        }
        else if (results.affectedRows === 1) {
            console.log(results)
            callback(true)
        }
    })
}
function dltMaOne(id, callback) {
    sqlStr = `delete from ${bc_types} where id='${id + ''}'`
    db.query(sqlStr, (err, results) => {
        if (err) {
            console.log(err.message)
            callback(false)
        }
        else if (results.affectedRows === 1) {
            console.log(results)
            callback(true)
        }
    })
}
// 更新单个用户
function updateUser(type, callback) {
    sqlStr = `update types set typeName=?, nickName=?,department=?,phoneNumber=?,address=?,sex=?,role=?,remark=? where typeName=?`
    // sqlStr = `update types set typeName=? where typeName=?`
    type = JSON.parse(type);

    console.log('model type', type.nickName)
    var arr = [type.typeName, type.nickName, type.department, type.phoneNumber, type.address, type.sex, type.role, type.remark, type.typeName]

    // arr[8] = 'admin'
    db.query(sqlStr, arr, (err, results) => {
        if (err) {
            console.log(err.message)
            callback(false)
        }
        else if (results.affectedRows === 1) {
            console.log(results)
            callback(true)
        } else {
            callback(false)
        }
    })
}

module.exports = { typeAll, totalTypeList, typeAdd, dltTypeOne, typeList, typeNameQuery, typeRegist, typeList, bc_typeList, bc_type_mation, info_type_mation, updateDirOne, departmentGetAll, typeAdd, dltMaOne, updateUser }