const express = require('express');
const router = express.Router();
// 公共接口
const auth = require('./auth.js');
const upload = require('./upload.js');

// 各功能模块接口
const menus = require('./menus.js');
const accounts = require('./accounts.js');
const roles = require('./roles.js');
const organizations = require('./organizations.js');
const logs = require('./logs.js');

// 公共接口
router.use('/', auth);
router.use('/upload', upload);

// 各功能模块接口
router.use('/menus', menus);
router.use('/accounts', accounts);
router.use('/roles', roles);
router.use('/organizations', organizations);
router.use('/logs', logs);

module.exports = router;
