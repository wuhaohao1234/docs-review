const sql = require('../db/reset/index')
var db = require("../db/connect/db");
var compute = require("../public/javascripts/compute")
const { json } = require('express');
// 各个表名
const bc_users = "users"
const info_users = "info_users"
const info_messages = "info_messages"
// 前台用户信息查询
function info_userQuery(user, callback) {
    console.log(user, '用户信息')
    sql.sqlQuery(`select * from ${info_users} where username="${user.username}" and password="${user.password}"`, data => {
        console.log(data, '查询用户登录3')
        callback(data)
    })
}
// 前台用户留言list
function infoMessageList(user, callback) {
    sql.sqlQuery(`select * from ${info_messages} where userId="${user.userId} order by id desc"`, data => {
        console.log(data, '查询用户留言')
        callback(data)
    })
}

// 前台用户留言
function messageLeave(user, callback) {
    console.log(user, '用户留言')
    var str = `INSERT INTO ${info_messages} (content,userId,username,createTime) values(?,?,?,?)`
    var arr = [
        user.content,
        user.userId,
        user.username,
        compute.nowTime()
    ]
    db.query(str, arr, (err, results) => {
        console.log(results)
        if (err) {
            console.log(err)
            callback(false)

        }
        else if (results.affectedRows === 1) {
            callback(true)
        }
    })
}
// 前台用户登录
function infoUserQuery(user, callback) {
    console.log(user, '用户信息')
    sql.sqlQuery(`select * from ${bc_users} where username="${user.username}" and password="${user.password}"`, data => {
        console.log(data, '查询用户登录33')
        callback(data)
    })
}
// 前台用户信息查询
function infoUserMationQuery(userId, callback) {
    console.log(userId, '用户信息')
    sql.sqlQuery(`select * from ${info_users} where id="${userId}"`, data => {
        callback(data)
    })
}
// 前台用户登录验证 以及信息查询
function infoLandUserQuery(data, callback) {
    sql.sqlQuery(`select * from ${info_users} where id="${data.id}" and username="${data.username}" and password="${data.password}"`, data => {
        console.log(data, '查询用户信息')
        callback(data)
    })
}
// 前台用户vip信息查询
function infoUserIdQuery(userId, callback) {
    console.log(userId, '用户信息')
    sql.sqlQuery(`select is_vip from ${info_users} where id="${userId}"`, data => {
        console.log(data, '查询用户是否为会员信息')
        callback(data[0].is_vip)
    })
}
// 后台用户登录
function userQuery(user, callback) {
    sql.sqlQuery(`select * from ${bc_users} where username="${user.username}" and password="${user.password}"`, data => {
        // sql.sqlQuery(`select * from ${bc_users} where username="mvc" and password="mvc"`, data => {
        console.log(data, '查询用户登录2')
        callback(data)
    })
}
// 得到指定pageNum和pageSize的前台messagelist
function messageList(params, callback) {
    sql.sqlQuery(`select * from  ${info_messages} order by id desc limit ${(params.pageNum - 1) * params.pageSize},${params.pageSize}`, data => {
        callback(data)
    })
}
// 得到前台messagelist的total
function messageListTotal(params, callback) {
    sql.sqlQuery(`select count(*) from  ${info_messages} `, data => {
        callback(data)
    })
}
// 得到指定pageNum和pageSize的前台用户
function userList(params, callback) {
    sql.sqlQuery(`select * from  ${bc_users} limit ${(params.pageNum - 1) * params.pageSize},${params.pageSize}`, data => {
        callback(data)
    })
}
// 得到指定pageNum和pageSize的后台用户
function bc_userList(params, callback) {
    sql.sqlQuery(`select * from  ${bc_users} limit ${(params.pageNum - 1) * params.pageSize},${params.pageSize}`, data => {
        callback(data)
    })
}
// 获取前台用户message总数量
function info_message_mation(callback) {
    sql.sqlQuery(`select count(*) from ${info_messages}`, data => {
        callback(data)
    })
}
// 修改用户
function userRevise(data, callback) {
    let str = "UPDATE users SET username = ?, password = ?,role=? WHERE id = ?"
    db.query(str, [data.username, data.password, data.role, data.id], (err, results) => {
        console.log(results)
        if (err) {
            console.log(err)
            callback(false)

        }
        else if (results.affectedRows === 1) {
            callback(true)
        }
    })
}

// 获取前台用户总数量
function info_user_mation(callback) {
    sql.sqlQuery(`select count(*) from ${bc_users}`, data => {
        callback(data)
    })
}
// 获取后台用户总数量
function bc_user_mation(callback) {
    sql.sqlQuery(`select count(*) from ${bc_users}`, data => {
        callback(data)
    })
}
// 得到所有部门
function departmentGetAll(callback) {
    sql.sqlQuery(`select * from departments`, data => {
        callback(data)
    })
}
// 查询info用户name书否存在
function userNameQuery(userName, callback) {
    db.query(`select * from ${bc_users} where username="${userName}"`, (err, results) => {
        if (results.length == 0) {
            callback(true)
        } else {
            callback(false)
        }
    })
}
// 用户注册
function userRegist(arr, callback) {
    var str = `INSERT INTO ${bc_users} (username,password,role) values(?,?,?)`
    db.query(str, [arr[0], arr[1], arr[2]], (err, results) => {
        console.log(results)
        if (err) {
            console.log(err)
            callback(false)

        }
        else if (results.affectedRows === 1) {
            callback(true)
        }
    })
}
// 添加用户
function userAdd(arr, callback) {
    var str = `INSERT INTO ${bc_users} (username,password,role) values(?,?,?)`
    db.query(str, [arr[0], arr[1], arr[2], compute.nowTime()], (err, results) => {
        console.log(results)
        if (err) {
            callback(false)
        }
        else if (results.affectedRows === 1) {
            callback(true)
        }
    })
}
// 添加管理员
function maUserAdd(arr, callback) {
    var str = `INSERT INTO ${bc_users} (username,password,nickname,createTime) values(?,?,?,?)`
    db.query(str, [arr[0], arr[1], arr[2], compute.nowTime()], (err, results) => {
        console.log(results)
        if (err) {
            callback(false)
        }
        else if (results.affectedRows === 1) {
            callback(true)
        }
    })
}
// 删除单个用户
function dltUserOne(id, callback) {
    sqlStr = `delete from ${bc_users} where id='${id + ''}'`
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
// 删除单条信息
function messageDlt(id, callback) {
    sqlStr = `delete from ${info_messages} where id='${id + ''}'`
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
    sqlStr = `delete from ${bc_users} where id='${id + ''}'`
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

// 更新单个用户信息
function infoUserUpdate(data, callback) {
    console.log(data)
    sqlStr = `update ${info_users} set is_vip=?,vip_time=?  where id=?`
    var arr = [
        data.is_vip,
        data.vip_time,
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


module.exports = { userRevise, messageDlt, info_message_mation, infoMessageList, messageList, messageLeave, infoLandUserQuery, infoUserUpdate, infoUserMationQuery, infoUserIdQuery, info_userQuery, userQuery, userNameQuery, userRegist, maUserAdd, userList, bc_userList, bc_user_mation, infoUserQuery, info_user_mation, departmentGetAll, userAdd, dltUserOne, dltMaOne }