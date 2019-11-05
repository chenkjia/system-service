const express = require('express');
const router = express.Router();
const menus = require('./menus.js');
const sets = require('./sets.js');
const setcategories = require('./setcategories.js');
const parts = require('./parts.js');
const partcategories = require('./partcategories.js');
const upload = require('./upload.js');

/* GET home page. */
router.use('/menus', menus);
router.use('/sets', sets);
router.use('/setcategories', setcategories);
router.use('/parts', parts);
router.use('/partcategories', partcategories);
router.use('/upload', upload);

module.exports = router;
