const express = require('express'),
  router = express.Router()
  // formidable = require('formidable'),
  // fs = require('fs'),
  // TITLE = 'formidable上传示例',
  // AVATAR_UPLOAD_FOLDER = '/avatar/'


router.post('/', (req, res) => {
  console.log(req);
  console.log(req.files.file);
  res.send(req.files.file);
});

module.exports = router;