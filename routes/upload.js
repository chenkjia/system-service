const express = require('express')
router = express.Router(),
  formidable = require('formidable'),
  fs = require('fs'),
  TITLE = 'formidable上传示例',
  AVATAR_UPLOAD_FOLDER = '/avatar/'


router.post('/', (req, res) => {
  messageMng.publishUploadFile(req, (err, datas) => {
    res.json(datas);
  });
});

module.exports = router;