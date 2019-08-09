const express = require('express');
const router = express.Router();
const api = require('../lib/api.js');
const SetcategoryModal = require('../models/setcategory.js');

router.get('/', api.read(SetcategoryModal))
router.post('/', api.create(SetcategoryModal))
router.put('/', api.update(SetcategoryModal))
router.delete('/', api.delete(SetcategoryModal))

module.exports = router;
