const express = require('express');
const router = express.Router();
const api = require('../lib/api.js');
const MenuModal = require('../models/menu.js');

router.get('/', api.read(MenuModal))
router.post('/', api.create(MenuModal))
router.put('/', api.update(MenuModal))
router.delete('/', api.delete(MenuModal))

module.exports = router;
