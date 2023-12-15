const sql = require('../db/reset/index')
var db = require("../db/connect/db");
var compute = require("../public/javascripts/compute")

const info_notice = 'info_notice'
const vip_url = 'vip_url'
function getContent(callback) {
    var sqlStr = `select * from ${info_notice}  order by id desc `
    sql.sqlQuery(sqlStr, data => {
        callback(data)
    })
}
function getVipUrl(callback) {
    var sqlStr = `select * from ${vip_url}  order by id desc `
    sql.sqlQuery(sqlStr, data => {
        callback(data)
    })
}
function setVipUrl(data, callback) {
    var sqlStr = ""
    if (data.id) {
        console.log("设置url")
        sqlStr = `update ${vip_url} set url=? , updateTime=? where id=?`
        var arr = [data.url, compute.nowTime(), data.id]
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
    } else {
        sqlStr = `INSERT INTO ${vip_url} (url,createTime) values('${data.url}','${compute.nowTime()}')`
        sql.sqlQuery(sqlStr, data => {
            callback(data)
        })
    }

}
function contentUpdate(data, callback) {
    var sqlStr = `update ${info_notice} set content=? , updateTime=? where id=?`
    var arr = [data.content, compute.nowTime(), data.id]
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
function createContent(callback) {
    var sqlStr = `INSERT INTO ${info_notice} (content) values("")`
    sql.sqlQuery(sqlStr, data => {
        callback(data)
    })
}


module.exports = { getVipUrl, setVipUrl, getContent, contentUpdate, createContent }
