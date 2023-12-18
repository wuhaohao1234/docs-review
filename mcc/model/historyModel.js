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
	// console.log(`select * from  ${info_files} where type_id=${params.type_id} limit ${(params.pageNum - 1) * params.pageSize},${params.pageSize}`)
	var str = `select * from  ${info_files} `
	
	console.log(str, "查询语句")
	sql.sqlQuery(str, data => {
		callback(data)
	})
}