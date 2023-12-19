var express = require('express');
var router = express.Router();
const historyController = require('../controller/historyController')
// const multer = require('multer');
// var path = require('path');
// const fs = require('fs');
// const filesController = require('../controller/filesController')
// const formidable = require("formidable");
// const ffmpeg = require("fluent-ffmpeg");


router.get('/list', function (req, res, next) {
  historyController.getList(req.query, data => {
    res.send(data)
  })
})

router.get('/getOne', function (req, res, next) {
  historyController.getOne(req.query, data => {
    res.send(data)
  })
})

router.post('/add', (req, res, next) => {
    res.send(req.body)
    const {
      userId,
      fileId,
      text
    } = req.body
      historyController.add({
        userId,
        fileId,
        text
      }, data => {
        res.send(data)
      })
})

module.exports = router;