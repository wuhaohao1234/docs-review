// sql查询封装
var $sql = require("../connect/db");
function sqlQuery(sql, callback) {
    $sql.query(sql, (err, result) => {
        if (err) {
            return console.log("sql查询错误,请检查sql语句", sql)
        }
        callback(result)
        return result
    })
}
// 废弃
function sqlUserInsert(sql, callback) {
    console.log('sql语句', sql);
    $sql.query(sql, (err, result) => {
        console.log(result);
        if (err) {
            console.log('插入失败');
            callback({
                result,
                status: false
            })
            return false
        } else {
            console.log('插入成功');
            return true
        }
    })
}
module.exports = { sqlQuery, sqlUserInsert };

