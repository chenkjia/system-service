const express = require('express');
const router = express.Router();
const api = require('../lib/api.js');
const Modal = require('../models/account.js');

router.get('/userInfo', api.read(Modal, {
  // 过滤超管账号
  condition: { username: /^((?!sa).)+$/ },
  // 屏蔽密码
  list: '-password'
}))

router.post('/login', api.read(Modal, {
  // 过滤超管账号
  condition: { username: /^((?!sa).)+$/ },
  // 屏蔽密码
  list: '-password'
}))

module.exports = router;
