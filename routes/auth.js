const express = require('express');
const router = express.Router();
const api = require('../lib/api.js');
const session = require('../lib/session.js');
const Modal = require('../models/account.js');
const SessionModal = require('../models/session.js');


router.get('/userInfo', (req, res) => {
  SessionModal.findOne({
    _id: req.headers['x-token']
  })
  .populate('account', '-password')
  .then(doc => {
    console.log(doc)
    res.send(api.resSuccess(doc))
    // if(!doc) {
    //   res.send({code: -1, message: '账号不存在'})
    //   return
    // }
  })
  .catch(err => {
    res.send(err)
  })
})

router.post('/login', (req, res) => {
  Modal.findOne({
    username: req.body.username
  })
  .then(doc => {
    if(!doc) {
      res.send({code: -1, message: '账号不存在'})
      return
    }
    const loginUser = new Modal({
      username: req.body.username,
      password: req.body.password
    })
    if(loginUser.comparePassword(doc.password)){
      session.create(doc._id).then(session => {
        res.send({
          code: 0,
          message: '登录成功',
          data: {
            token: session._id
          }
        })
      })
      .catch(err => {
        res.send(err)
      })
    } else {
      res.send({code: -1, message: '密码错误'})
    }
  })
  .catch(err => {
    res.send(err)
  })
})

module.exports = router;
