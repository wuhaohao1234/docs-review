const sql = require('../db/reset/index')
var db = require("../db/connect/db");
var compute = require("../public/javascripts/compute")
const {
	json
} = require('express');
// 各个表名
const info_files = "files"
// 得到单个文件
function getOne(id, callback) {
	sql.sqlQuery(`select * from ${info_files} where id="${id}" `, data => {
		callback(data)
	})
}
// 前台搜索得到文件列表
function infoSearchFile(params, callback) {
	// console.log(`select * from  ${info_files} where type_id=${params.type_id} limit ${(params.pageNum - 1) * params.pageSize},${params.pageSize}`)
	var str
	if (params.type_id == -1) {
		str = `select * from  ${info_files} where name like '%${params.content}%' order by id desc limit ${(params.pageNum - 1) * params.pageSize},${params.pageSize}`
	} else {
		str = `select * from  ${info_files} where name like '%${params.content}%' and type_id="${params.type_id}"  order by id desc  limit ${(params.pageNum - 1) * params.pageSize},${params.pageSize}`
	}
	console.log(str)
	sql.sqlQuery(str, data => {
		callback(data)
	})
}
// 得到文件列表
function getList(params, callback) {
	console.log(params)
	console.log("1111223")

	// console.log(`select * from  ${info_files} where type_id=${params.type_id} limit ${(params.pageNum - 1) * params.pageSize},${params.pageSize}`)
	var str = `select * from  ${info_files} where operationId=${params.type_id} and userId=${params.userId}    order by id desc limit ${(params.pageNum - 1) * params.pageSize},${params.pageSize}`
	// 如果all为true则表明身份为管理员和专家
	if (params.all == "true") {
		str = `select * from  ${info_files} where operationId=${params.type_id}  order by id desc limit ${(params.pageNum - 1) * params.pageSize},${params.pageSize}`
	}
	console.log(str, "查询语句")
	sql.sqlQuery(str, data => {
		callback(data)
	})
}
// 文件计数
function info_file_mation(params, callback) {
	console.log("223")
	// 根据操作类型id,用户id获取总数
	sql.sqlQuery(`select count(*) from ${info_files} where operationId=${params.type_id} and userId=${params.userId} order by id desc `, data => {
		callback(data)
	})


}
// 搜索文件计数
function info_aim_file_mation(params, callback) {
	sql.sqlQuery(`select count(*) from ${info_files} where  name like '%${params.content}%'`, data => {
		callback(data)
	})
}

// 添加文件
function Add(data, callback) {
	console.log(data)
	var str = `INSERT INTO ${info_files}(tmpname,nativename,operationId,status,userId,fileType,username,time)  values`
	for (let i = 0; i < data.list.length; i++) {
		console.log(i, data.list[i])
		if (i != data.list.length - 1) {
			str += `('${data.list[i].tmpname}','${data.list[i].nativename}','${data.list[i].operationId}','${data.list[i].status}','${data.list[i].userId}','${data.list[i].fileType}','${data.list[i].username}', '${data.list[i].time}'),`
		} else {
			str += `('${data.list[i].tmpname}','${data.list[i].nativename}','${data.list[i].operationId}','${data.list[i].status}','${data.list[i].userId}','${data.list[i].fileType}','${data.list[i].username}', '${data.list[i].time}')`
			console.log('str', str)
		}
		console.log(i, data.list.length)
	}
	console.log(str)
	sql.sqlQuery(str, results => {
		callback(results)
	})
}

// 公告添加图片文件
function addNoticeImg(data, callback) {
	var str = `INSERT INTO ${info_files}(url,createTime)  values('${data.url}','${compute.nowTime()}')`
	console.log(data)
	console.log(str)
	sql.sqlQuery(str, results => {
		callback(results)
	})
}
// 删除单个角色
function dltOne(id, callback) {
	sqlStr = `delete from ${info_files} where id='${id + ''}'`
	db.query(sqlStr, (err, results) => {
		if (err) {
			console.log(err.message)
			callback(false)
		} else if (results.affectedRows === 1) {
			console.log(results)
			callback(true)
		}
	})
}
// 删除多个角色
function dltMore(id_arr, callback) {
	console.log(id_arr)
	sqlStr = `delete from mangas where manga_id in (`
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
		} else if (results.affectedRows !== 0) {
			console.log(results)
			callback(true)
		}
		console.log(results)
	})
}
// 更新单个文件
function updateOne(data, callback) {
	console.log(data)
	sqlStr = `update ${info_files} set name=?,is_free=?,ichitype_id=?,is_top=? where id=?`
	var arr = [
		data.name,
		data.is_free,
		data.ichitype_id,
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
module.exports = {
	infoSearchFile,
	info_file_mation,
	info_aim_file_mation,
	getOne,
	getList,
	dltMore,
	Add,
	dltOne,
	updateOne,
	addNoticeImg
}

