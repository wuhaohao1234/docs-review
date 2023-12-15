var connection = {};
connection.mysql = {
    host: "127.0.0.1",  //mysql的安装主机地址
    user: "root",        //访问mysql的用户名
    password: "abu0418", // 访问mysql的密码
    database: "pynode",   //访问mysql的数据库名
    useConnectionPooling: true

}
module.exports = connection
