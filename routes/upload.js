const express = require('express')
const router = express.Router()
const SetModal = require('../lib/upload.js')
  // fs = require('fs'),
  // TITLE = 'formidable上传示例',
  // AVATAR_UPLOAD_FOLDER = '/avatar/'


router.post('/', (req, res) => {
  res.send(req.files.file);
});

module.exports = router;