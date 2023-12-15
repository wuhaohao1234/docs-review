const vipModel = require('../model/vipModel.js')
const userModel = require('../model/userModel.js')
var db = require("../db/connect/db");


// 生成vip码
function createVipCode(callback) {
    // 随机存取字符串
    var str = ""
    // 10000 100000
    // str += (Math.random() * 990000 + 10000).toFixed(0)
    var timestamp = (new Date()).valueOf();
    str += getRandomString() + timestamp
    callback({
        vipCode: str
    })
}
// vip兑换
function vipExchange(params, callback) {
    vipModel.vipExchange(params, data => {
        console.log(data, '兑换码数据')
        if (data.length == 0) {
            callback({
                status: false,
                message: "兑换码错误"
            })
        } else {
            if (timeCompare(data[0].end_time) && !timeCompare(data[0].stt_time)) {
                if (data[0].status == 1) {
                    let time = new Date()
                    // console.log(time, 'xindate对象')
                    let nowTime = timestampToTime(time.toLocaleString('en-US', { hour12: false }).split(" "))
                    // 设置兑换码被兑换时间
                    data[0].exchange_time = nowTime
                    // 设置兑换码已被兑换
                    data[0].status = "2"
                    // console.log(data[0])
                    // 查询用户信息
                    userModel.infoUserMationQuery(params.userId, res => {
                        // console.log(res[0])
                        // 设置兑换码 兑换者
                        data[0].exchange_userId = res[0].id
                        data[0].exchange_user = res[0].username
                        console.log(nowTime.toString())
                        var tempTime
                        // 计算vip结束时间,设置会员截至时间
                        if (res[0].is_vip == 0) {
                            tempTime = converTime(nowTime.toString(), data[0].exist_time)
                            res[0].vip_time = timestampToTime(tempTime.toLocaleString('en-US', { hour12: false }).split(" "))
                        } else if (res[0].is_vip == 1) {
                            tempTime = converTime(res[0].vip_time, data[0].exist_time)
                            res[0].vip_time = timestampToTime(tempTime.toLocaleString('en-US', { hour12: false }).split(" "))
                        }
                        // 设置会员状态
                        res[0].is_vip = 1   //成为vip
                        console.log(res[0])
                        vipModel.vipCodeUpdate(data[0], vipRes => {
                            if (vipRes) {
                                userModel.infoUserUpdate(res[0], userRes => {
                                    if (userRes) {
                                        callback({
                                            status: true,
                                            data: res[0],
                                            message: "兑换会员成功"
                                        })
                                    } else {
                                        callback({
                                            status: false,
                                            message: "兑换会员失败"
                                        })
                                    }
                                })
                            } else {
                                callback({
                                    status: false,
                                    message: "兑换会员失败"
                                })
                            }

                        })

                    })
                } else if (data[0].status == 2) {
                    callback({
                        status: false,
                        message: "兑换码已被使用"
                    })
                } else if (data[0].status == 3) {
                    callback({
                        status: false,
                        message: "兑换码已过期"
                    })
                } else {
                    callback({
                        status: false,
                        message: "兑换码错误"
                    })
                }
            } else {
                callback({
                    status: false,
                    message: "兑换码未处于可兑换时间"
                })
            }
        }

        // callback(data)
    })
}

// 添加vip码
function vipCodeAdd(data, callback) {
    var arr = [data.code, data.exist_time, data.stt_time, data.end_time]
    vipModel.vipCodeAdd(arr, data => {
        if (data) {
            callback({
                status: true,
                message: '新增会员码成功'
            })
        } else {
            callback({
                status: false,
                message: '新增会员码失败'
            })
        }
    })
}


function vipCodeList(params, callback) {
    vipModel.vipCodeList(params, data => {
        vipModel.vip_code_mation(data2 => {
            callback({
                list: data,
                total: data2[0]["count(*)"]
            })
        })
        // callback(data)
    })
}
function vipCodeDlt(data, callback) {
    vipModel.vipCodeDlt(data.id, data => {
        if (data) {
            callback({
                status: true,
                message: '删除会员码数据成功'
            })
        } else {
            callback({
                status: false,
                message: '删除会员码数据失败'
            })
        }
    })
}
module.exports = { vipExchange, createVipCode, vipCodeAdd, vipCodeList, vipCodeDlt }
/**
 * 随机生成字符串
 */
const _charStr = 'abacdefghjklmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ0123456789';

function getRandomString(len) {
    let min = 0, max = _charStr.length - 1, _str = '';
    //判断是否指定长度，否则默认长度为15
    len = len || 15;
    //循环生成字符串
    for (var i = 0, index; i < len; i++) {
        index = RandomIndex(min, max, i);
        _str += _charStr[index];
    }
    return _str;
}
/**
 * 随机生成索引
 * @param min 最小值
 * @param max 最大值
 * @param i 当前获取位置
 */
function RandomIndex(min, max, i) {
    let index = Math.floor(Math.random() * (max - min + 1) + min),
        numStart = _charStr.length - 10;
    //如果字符串第一位是数字，则递归重新获取
    if (i == 0 && index >= numStart) {
        index = RandomIndex(min, max, i);
    }
    //返回最终索引值
    return index;
}

// 时间转换 Date对象转 yyyy-MM-dd  hh:mm:ss
function timestampToTime(times) {
    let time = times[1]
    let mdy = times[0]
    mdy = mdy.split('/')
    let month = `0${mdy[0]}`;
    let day = `0${mdy[1]}`
    let year = parseInt(mdy[2])
    month = month.slice(month.length - 2, month.length)
    day = day.slice(day.length - 2, day.length)
    return year + '-' + month + '-' + day + ' ' + time
}

// 时间大小比较
function timeCompare(customTime) {
    // 获取当前时间
    let currentTime = new Date();
    // 替换字符，变成标准格式
    console.log(customTime)
    customTime = customTime.replace("-", "/");
    customTime = new Date(Date.parse(customTime));
    console.log(currentTime, customTime)
    if (currentTime < customTime) {
        return true
    } else if (currentTime > customTime) {
        return false
    } else if (currentTime == customTime) {
        return true
    }
}
// 时间加(date对象，要加的时间小时为单位)
function converTime(timeString, exist_time) {
    const usetime = new Date(timeString);//转标准时间
    console.log(timeString, 'exist_time', exist_time)
    return new Date(usetime.getFullYear(), usetime.getMonth(), usetime.getDate(), usetime.getHours() + parseInt(exist_time), usetime.getMinutes(), usetime.getSeconds());
}