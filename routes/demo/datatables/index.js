const express = require('express');
const router = express.Router();
// 各功能模块接口
const page = require('./page.js');
const tree = require('./tree.js');
const roll = require('./roll.js');

// 各功能模块接口
router.use('/page', page);
router.use('/tree', tree);
router.use('/roll', tree);

module.exports = router;
