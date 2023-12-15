const noticeModel = require('../model/noticeModel.js')

function getVipUrl(callback) {
    noticeModel.getVipUrl(data => {
        console.log(data)
        if (data.length == 0) {
            callback({
                status: false,
                message: "暂未设置网址"
            })
        } else {
            callback({
                status: true,
                data: data[0],
                message: "获取成功"
            })
        }
    })
}

function setVipUrl(params, callback) {
    noticeModel.setVipUrl(params, data => {
        console.log(data)
        if (data.affectedRows == 1) {
            callback({
                status: true,
                message: "修改网址成功"
            })
        } else {
            callback({
                status: true,
                message: "修改网址失败"
            })
        }
    })
}
function getContent(callback) {
    noticeModel.getContent(data => {
        console.log(data)
        if (data.length == 0) {
            noticeModel.createContent(res => {
                console.log(res)
                noticeModel.getContent(result => {
                    callback(result[0])
                })
            })
        } else {
            callback(data[0])
        }
    })
}
function contentUpdate(data, callback) {
    console.log(data.content)
    noticeModel.contentUpdate(data, result => {
        if (result) {
            callback({
                status: true,
                message: "修改公告成功"
            })
        } else {
            callback({
                status: true,
                message: "修改公告失败"
            })
        }
    })
}
module.exports = { getVipUrl, setVipUrl, getContent, contentUpdate }
