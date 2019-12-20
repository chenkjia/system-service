const express = require('express');
const router = express.Router();
// 公共接口
const auth = require('./auth.js');
const upload = require('./upload.js');
const relation = require('./relation');

// 各功能模块接口
const system = require('./system/index.js');
const demo = require('./demo/index.js');

// 公共接口
router.use('/', auth);
router.use('/upload', upload);
router.use('/relation', relation);

// 各功能模块接口
router.use('/system', system);
router.use('/demo', demo);

module.exports = router;
