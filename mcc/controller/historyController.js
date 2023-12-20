const historyModel = require("../model/historyModel.js")

function getList(params, callback) {
    historyModel.getList(params, data => {
      callback(data)
    })
}

function add(params, callback) {
  historyModel.Add(params, data => {
    callback(data)
  })
}

function getOne(params, callback) {
  historyModel.getOne(params, data => {
    callback(data)
  })
}

module.exports = {
  getList,
  add,
  getOne
}