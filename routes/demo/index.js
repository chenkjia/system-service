const express = require('express');
const router = express.Router();
// 各功能模块接口
const datatables = require('./datatables/index.js');

// 各功能模块接口
router.use('/datatables', datatables);

module.exports = router;
