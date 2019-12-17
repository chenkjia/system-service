const express = require('express');
const router = express.Router();
const api = require('../../lib/api.js');
const Modal = require('../../models/system/organization.js');

router.get('/', api.read(Modal))
router.post('/', api.create(Modal))
router.put('/', api.update(Modal))
router.delete('/', api.delete(Modal))

module.exports = router;
