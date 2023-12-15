var express = require('express')
var $mysql = require('mysql');
var sql = require('./mysql.js')
var $sql = $mysql.createConnection(sql.mysql)
$sql.connect();
module.exports = $sql;
