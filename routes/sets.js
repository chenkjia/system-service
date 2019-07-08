const express = require('express');
const router = express.Router();
const api = require('../lib/api.js');
const SetModal = require('../models/set.js');

router.get('/', api.read(SetModal))
router.post('/', api.create(SetModal))
router.put('/:id', api.update(SetModal))
router.delete('/:id', api.delete(SetModal))

module.exports = router;
