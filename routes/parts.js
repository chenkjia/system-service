const express = require('express');
const router = express.Router();
const api = require('../lib/api.js');
const PartModal = require('../models/part.js');

router.get('/', api.read(PartModal))
router.post('/', api.create(PartModal))
router.put('/', api.update(PartModal))
router.delete('/', api.delete(PartModal))

module.exports = router;
