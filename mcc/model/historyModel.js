const sql = require('../db/reset/index')
var db = require("../db/connect/db");
var compute = require("../public/javascripts/compute")
const {
	json
} = require('express');
// 各个表名
const info_files = "history"
// 得到文件列表
function getList(params, callback) {
	var str = `select * from  ${info_files} `
	console.log(str, "查询语句")
	sql.sqlQuery(str, data => {
		callback(data)
	})
}

function getOne(params, callback) {
	var str = `select * from  ${info_files} where fileId="${params.fileId}" `
	sql.sqlQuery(str, data => {
		callback(data)
	})
}

function Add(data, callback) {
	console.log(data)
	var str = `INSERT INTO ${info_files}(fileId, userId, text)  values`
	str += '(' + data.fileId + "," + data.userId + "," + "'" + data.text + "'" + ")"
	console.log(str)
	sql.sqlQuery(str, results => {
		callback(results)
	})
}
module.exports = {
	getList,
	Add,
	getOne
}