const userModel = require('../model/userModel.js')
var db = require("../db/connect/db");


// 前台用户信息查询
function infoLandUserQuery(user, callback) {
    console.log("前台用户信息查询")
    userModel.infoLandUserQuery(user, data => {
        if (data.length == 0) {
            callback({
                status: false,
                message: "用户登录失效,请重新登录"
            })
        }
        else {
            callback({
                status: true,
                data: data[0],
                message: "查询成功"
            })
        }
    })
}
// 登录验证
function info_validateLogon(user, callback) {
    userModel.info_userQuery(user, data => {
        if (data.length == 0) {
            callback({
                queryResult: false
            })
        }
        else {
            callback({
                data: data[0],
                back: {
                    queryResult: true,
                    token: '您已经登录成功'
                }
            })
        }
    })
}
// info用户留言
function messageLeave(user, callback) {
    userModel.messageLeave(user, data => {
        console.log(data)
        if (data) {
            callback({
                status: true,
                message: "留言成功"
            })
        }
        else {
            callback({
                status: false,
                message: "留言失败"
            })
        }
    })
}
// info用户留言list
function infoMessageList(user, callback) {
    userModel.messageList(user, data => {

        if (data.length == 0) {
            callback({
                status: false,
                list: [],
                message: "暂无数据"
            })
        }
        else {
            userModel.info_message_mation(data2 => {
                callback({
                    status: true,
                    list: data,
                    total: data2[0]["count(*)"]
                })
            })
        }
    })
}
// 后台登录验证
function validateLogon(user, callback) {
    userModel.userQuery(user, data => {
        if (data.length == 0) {
            callback({
                back: {
                    queryResult: false
                }
            })
        }
        else {
            callback({
                data: data[0],
                back: {
                    queryResult: true,
                    token: '您已经登录成功'
                }
            })
        }
    })
}
// 前台登录验证
function infoValidateLogon(user, callback) {
    userModel.infoUserQuery(user, data => {
        if (data.length == 0) {
            callback({
                queryResult: false
            })
        }
        else {
            callback({
                data: data[0],
                back: {
                    queryResult: true,
                    token: '您已经登录成功'
                }
            })
        }
    })
}
// 用户注册
function userRegist(user, callback) {
    console.log(user, 'user')
    userModel.userNameQuery(user.username, status => {
        if (status) {
            userModel.userRegist([user.username, user.password, user.role], data => {
                if (data) {
                    callback({
                        status: true,
                        message: '注册成功'
                    })
                } else {
                    callback({
                        status: false,
                        message: '未知错误'
                    })
                }

            })
        } else {
            callback({
                status: false,
                message: '账号名重复,请重新输入'
            })
        }
    })
}
//
function userList(params, callback) {
    userModel.userList(params, data => {
        userModel.info_user_mation(data2 => {
            console.log(data2)
            callback({
                list: data,
                total: data2[0]["count(*)"],
                status: true
            })
        })
        // callback(data)
    })
}
function userRevise(params, callback) {
    userModel.userRevise(params, result => {
        callback({
            status: result
        })
    })
}
// 前台用户messagelist
function messageList(params, callback) {
    userModel.messageList(params, data => {
        userModel.info_message_mation(data2 => {
            callback({
                list: data,
                total: data2[0]["count(*)"]
            })
        })
        // callback(data)
    })
}
function bc_userList(params, callback) {
    userModel.bc_userList(params, data => {
        userModel.bc_user_mation(data2 => {
            callback({
                list: data,
                total: data2[0]["count(*)"]
            })
        })
        // callback(data)
    })
}
function userAdd(user, callback) {
    console.log('contraol');
    var arr = [user.username, user.password, user.role]
    userModel.userAdd(arr, data => {
        if (data) {
            callback({
                status: true,
                message: '新增用户数据成功'
            })
        } else {
            callback({
                status: false,
                message: '新增用户数据失败'
            })
        }
    })
}
function maUserAdd(user, callback) {
    console.log('contraol');
    var arr = [user.username, user.password, user.nickname]
    userModel.maUserAdd(arr, data => {
        if (data) {
            callback({
                status: true,
                message: '新增用户数据成功'
            })
        } else {
            callback({
                status: false,
                message: '新增用户数据失败'
            })
        }
    })
}
function dltUserOne(userName, callback) {
    userModel.dltUserOne(userName, data => {
        if (data) {
            callback({
                status: true,
                message: '删除用户数据成功'
            })
        } else {
            callback({
                status: false,
                message: '删除用户数据失败'
            })
        }
    })
}
function messageDlt(messageId, callback) {
    userModel.messageDlt(messageId, data => {
        if (data) {
            callback({
                status: true,
                message: '删除留言数据成功'
            })
        } else {
            callback({
                status: false,
                message: '删除留言数据失败'
            })
        }
    })
}

function dltMaOne(id, callback) {
    userModel.dltMaOne(id, data => {
        if (data) {
            callback({
                status: true,
                message: '删除用户数据成功'
            })
        } else {
            callback({
                status: false,
                message: '删除用户数据失败'
            })
        }
    })
}
// 更新用户
function updateUser(user, callback) {
    // console.log('user', user)
    userModel.updateUser(user, data => {
        if (data) {
            callback({
                status: true,
                message: '修改成功'
            })
        } else {
            callback({
                status: false,
                message: '修改失败'
            })
        }
    })
}
module.exports = { userRevise, messageDlt, infoMessageList, messageList, messageLeave, infoLandUserQuery, infoValidateLogon, info_validateLogon, validateLogon, userRegist, userList, bc_userList, userAdd, maUserAdd, dltUserOne, dltMaOne, updateUser }
