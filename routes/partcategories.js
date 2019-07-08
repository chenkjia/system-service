const express = require('express');
const router = express.Router();
const api = require('../lib/api.js');
const PartcategoryModal = require('../models/partcategory.js');

router.get('/', api.read(PartcategoryModal))
router.post('/', api.create(PartcategoryModal))
router.put('/:id', api.update(PartcategoryModal))
router.delete('/:id', api.delete(PartcategoryModal))

module.exports = router;
