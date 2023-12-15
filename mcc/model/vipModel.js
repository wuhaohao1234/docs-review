const sql = require('../db/reset/index')
var db = require("../db/connect/db");
const { json } = require('express');
var compute = require("../public/javascripts/compute")

// 各个表名
const vip_code = "vip_code"
// 用户登录
function vipCodeAdd(arr, callback) {
    var str = `INSERT INTO ${vip_code} (code,exist_time,stt_time,end_time,createTime) values(?,?,?,?,?)`
    db.query(str, [arr[0], arr[1], arr[2], arr[3], compute.nowTime()], (err, results) => {
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
// vip兑换
function vipExchange(params, callback) {
    sql.sqlQuery(`select * from  ${vip_code} where code='${params.vip_code}' `, data => {
        callback(data)
    })
}

// 得到指定pageNum和pageSize的vip_code
function vipCodeList(params, callback) {
    sql.sqlQuery(`select * from  ${vip_code}  order by id desc  limit ${(params.pageNum - 1) * params.pageSize},${params.pageSize}`, data => {
        callback(data)
    })
}

// vip_code总数
function vip_code_mation(callback) {
    sql.sqlQuery(`select count(*) from ${vip_code}`, data => {
        callback(data)
    })
}
// 删除单个用户
function vipCodeDlt(id, callback) {
    sqlStr = `delete from ${vip_code} where id='${id + ''}'`
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

// 更新单个vip_code
function vipCodeUpdate(data, callback) {
    console.log(data)
    sqlStr = `update ${vip_code} set status=?,exchange_time=?,exchange_user=?,exchange_userId=?  where id=?`
    var arr = [
        data.status,
        data.exchange_time,
        data.exchange_user,
        data.exchange_userId,
        data.id,


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
module.exports = { vipCodeUpdate, vipExchange, vipCodeAdd, vipCodeList, vip_code_mation, vipCodeDlt }
