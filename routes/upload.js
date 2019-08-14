const express = require('express')
const router = express.Router()
const upload = require('../lib/upload.js')
  // fs = require('fs'),
  // TITLE = 'formidable上传示例',
  // AVATAR_UPLOAD_FOLDER = '/avatar/'


router.post('/', upload.single('file'), (req, res) => {
  res.send(req.file);
});

module.exports = router;