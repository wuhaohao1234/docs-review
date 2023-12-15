const sql = require('../db/reset/index')
var db = require("../db/connect/db");

function getDepartments(callback) {
    var sqlStr = `select * from departments`
    sql.sqlQuery(sqlStr, data => {
        callback(data)
    })
}
function getRoles(callback) {
    var sqlStr = `select * from roles`
    sql.sqlQuery(sqlStr, data => {
        callback(data)
    })
}


module.exports = { getDepartments, getRoles }
