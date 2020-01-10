const express = require('express');
const router = express.Router();
const api = require('../../../lib/api.js');
const Modal = require('../../../models/demo/datatables/tree.js');

router.get('/', api.tree(Modal))
router.post('/', api.create(Modal))
router.put('/', api.update(Modal))
router.delete('/', api.delete(Modal))
router.put('/changeSort', api.changeSort(Modal))

module.exports = router;
