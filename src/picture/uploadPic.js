const express = require('express')

const router = express.Router()

const uploadpic_handle = require('./uploadPicHandle')

router.post('/uploadpic',uploadpic_handle.uploadPic)

module.exports = router