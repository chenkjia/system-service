const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();
const api = require('../lib/api.js');
const session = require('../lib/session.js');
const Modal = require('../models/account.js');
const SessionModal = require('../models/session.js');


router.put('/shortcuts', (req, res) => {
  SessionModal.findOne({
    _id: req.headers['x-token']
  })
  .then(doc => {
    Modal.updateOne({
      _id: doc.account
    }, {
      shortcuts: req.body.shortcuts,
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
  .catch(err => {
    res.send(err)
  })
})

router.get('/userInfo', (req, res) => {
  // SessionModal.findOne({
  //   _id: req.headers['x-token']
  // })
  // .populate('account', '-password')
  // .populate('role', 'menus')
  // .populate('menu')
  // .then(doc => {
  //   res.send(api.resSuccess(doc))
  // })
  // .catch(err => {
  //   res.send(err)
  // })

  SessionModal.
  aggregate([
    {
      '$match': {
        '_id': mongoose.Types.ObjectId(req.headers['x-token'])
      }
    }, {
      '$lookup': {
        'from': 'accounts', 
        'localField': 'account', 
        'foreignField': '_id', 
        'as': 'account'
      }
    }, {
      '$unwind': {
        'path': '$account'
      }
    }, {
      '$lookup': {
        'from': 'roles', 
        'localField': 'account.roles', 
        'foreignField': '_id', 
        'as': 'roles'
      }
    }, {
      '$lookup': {
        'from': 'menus', 
        'localField': 'roles.menus', 
        'foreignField': '_id', 
        'as': 'menus'
      }
    }
  ]).
  exec((err, doc) => {
    res.send(api.resSuccess(doc[0]))
  });
})

router.post('/login', (req, res) => {
  Modal.findOne({
    username: req.body.username,
    enabled: true
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
