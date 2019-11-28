const express = require('express');
const router = express.Router();
const api = require('../lib/api.js');
const Modal = require('../models/account.js');

router.get('/', api.read(Modal, {
  // 过滤超管账号
  condition: { username: /^((?!sa).)+$/ },
  // 屏蔽密码
  list: '-password'
}))
router.post('/', api.create(Modal))
router.put('/', api.update(Modal))
router.delete('/', api.delete(Modal))
router.put('/changePassword', (req, res) => {
  Modal.updateOne({
    _id: req.query._id
  }, {
    password: req.body.password,
    updated: Date.now()
  }, {
    new: true,
    runValidators: true
  })
  .then(doc => {
    res.send(api.resSuccess(doc))
  })
  .catch(err => {
    res.send(err)
  })
})

module.exports = router;
