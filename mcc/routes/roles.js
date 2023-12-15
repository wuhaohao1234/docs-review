var express = require('express');
var router = express.Router();
const roleController = require('../controller/roleController')

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
// 获取所有的users
router.get('/all', function (req, res, next) {
    roleController.getAll(data => {
        res.send(data)
    })
})
router.post('/getOne', function (req, res, next) {
    var { roleId } = req.query
    console.log(roleId)
    roleController.roleId(roleId, data => {
        res.send(data)
    })
})
router.post('/add', function (req, res, next) {
    var role = req.query
    console.log(role)
    roleController.Add(role, data => {
        res.send(data)
    })
})
router.post('/dlt', function (req, res, next) {
    var { role_id } = req.query
    roleController.dltOne(role_id, data => {
        res.send(data)
    })
})
router.post('/dltMore', function (req, res, next) {
    var { id_arr } = req.query
    console.log(id_arr)
    roleController.dltMore(id_arr, data => {
        res.send(data)
    })
})
router.post('/update', function (req, res, next) {
    var { role } = req.query
    // console.log(user, req.query)
    roleController.updateOne(role, data => {
        res.send(data)
    })
})
module.exports = router;
