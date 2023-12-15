const sql = require('../db/reset/index')
var db = require("../db/connect/db");
const {
	json
} = require('express');
// 得到单个角色
function getOne(mangaId, callback) {
	sql.sqlQuery(`select * from mangas where mangaId="${mangaId}"`, data => {
		callback(data)
	})
}
// 得到所有的角色
function getAll(callback) {
	sql.sqlQuery(`select * from mangas`, data => {
		callback(data)
	})
}
var mangaObj = {
	manga_id: "123",
	manga_name: "年若青华",
	status: "0",
	pms_char: "x-25",
	manga_writer: '未知',
	manga_editer: '未知',
	category: '女青漫画',
	label: '百合',
	serial_status: '1',
}
// 添加角色
function Add(arr, callback) {
	var str = `INSERT INTO MANGAS (manga_id,manga_name,status,pms_char,manga_writer
		,manga_editer,category,label,serial_status,manga_introduce,cover_path,cover_name) values(?,?,?,?,?,?,?,?,?,?,?,?)`
	db.query(str, arr, (err, results) => {
		console.log(results)
		if (err) {
			console.log(err.message)
			callback(false)
		} else if (results.affectedRows === 1) {
			callback(true)
		}
	})
}

// 删除单个角色
function dltOne(manga_id, callback) {
	sqlStr = `delete from mangas where manga_id='${manga_id + ''}'`
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
// 更新单个漫画信息，不包含封面
function updateOne(manga, callback) {
	sqlStr = `update mangas set manga_name=?,status=?,pms_char=?,manga_writer=?,manga_editer=?,category=?,label=?,serial_status=?,manga_introduce=? where manga_id=?`
	manga = JSON.parse(manga);
	console.log(manga)
	var arr = [
		manga.manga_name,
		manga.status,
		manga.pms_char,
		manga.manga_writer,
		manga.manga_editer,
		manga.category,
		manga.label,
		manga.serial_status,
		manga.manga_introduce,
		manga.manga_id,
	]
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
	getOne,
	getAll,
	dltMore,
	Add,
	dltOne,
	updateOne
}
