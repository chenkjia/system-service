const express = require('express');
const router = express.Router();
const api = require('../lib/api.js');
const Modal = require('../models/account.js');

router.get('/', api.read(Modal))
router.post('/', api.create(Modal))
router.put('/', api.update(Modal))
router.delete('/', api.delete(Modal))
router.put('/changePassword', (model, condition) => (req, res) => {
  model.updateOne(condition || {
    _id: req.query._id
  }, {
    password: password,
    updated: Date.now()
  }, {
    new: true,
    runValidators: true
  })
    .then(doc => {
      res.send(resSuccess(doc))
    })
    .catch(err => {
      res.send(err)
    })
})

module.exports = router;
