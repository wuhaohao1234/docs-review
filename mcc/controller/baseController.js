const baseModel = require('../model/baseModel.js')



function getBaseData(callback) {
    baseModel.getDepartments(department => {
        baseModel.getRoles(role => {
            callback({
                department, role
            })
        })
    })
}

module.exports = { getBaseData }
