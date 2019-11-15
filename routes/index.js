const express = require('express');
const router = express.Router();
const menus = require('./menus.js');
const accounts = require('./accounts.js');
const roles = require('./roles.js');
const organizations = require('./organizations.js');
const logs = require('./logs.js');
const upload = require('./upload.js');

/* GET home page. */
router.use('/menus', menus);
router.use('/accounts', accounts);
router.use('/roles', roles);
router.use('/organizations', organizations);
router.use('/logs', logs);

router.use('/upload', upload);

module.exports = router;
