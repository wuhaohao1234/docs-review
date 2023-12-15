const sql = require('../db/reset/index')
var db = require("../db/connect/db");
const { json } = require('express');
// 得到单个角色
function getOne(roleId, callback) {
    sql.sqlQuery(`select * from roles where roleId="${roleId}"`, data => {
        callback(data)
    })
}
// 得到所有的角色
function getAll(callback) {
    sql.sqlQuery(`select * from roles`, data => {
        callback(data)
    })
}

// 添加角色
function Add(arr, callback) {
    var str = 'INSERT INTO ROLES (role_id,role_name,pms_char,status) values(?,?,?,?)'
    db.query(str, [...arr], (err, results) => {
        console.log(results)
        if (err) {
            console.log(err.message)
            callback(false)
        }
        else if (results.affectedRows === 1) {
            callback(true)
        }
    })
}
// 删除单个角色
function dltOne(role_id, callback) {
    sqlStr = `delete from roles where role_id='${role_id + ''}'`
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
// 删除多个角色
function dltMore(id_arr, callback) {
    console.log(id_arr)
    sqlStr = `delete from roles where role_id in (`
    for (let i = 0; i < id_arr.length; i++) {
        if (i + 1 < id_arr.length) {
            sqlStr += '?,'
        } else {
            sqlStr += '?)'
        }
    }
    console.log(sqlStr)
    db.query(sqlStr, id_arr, (err, results) => {
        if (err) {
            console.log(err.message)
            callback(false)
        }
        else if (results.affectedRows !== 0) {
            console.log(results)
            callback(true)
        }
        console.log(results)
    })
}
// 更新单个角色
function updateOne(role, callback) {
    sqlStr = `update roles set role_id=?, role_name=?,pms_char=?,status=?where role_id=?`
    role = JSON.parse(role);
    var arr = [role.role_id, role.role_name, role.pms_char, role.status, role.role_id]
    db.query(sqlStr, arr, (err, results) => {
        if (err) {
            console.log(err.message)
            callback(false)
        }
        else if (results.affectedRows === 1) {
            console.log(results)
            callback(true)
        } else {
            console.log(err.message, '错误')
            callback(false)
        }
    })
}
module.exports = { getOne, getAll, dltMore, Add, dltOne, updateOne }
