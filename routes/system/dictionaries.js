const express = require('express');
const router = express.Router();
const api = require('../../lib/api.js');
const resourceRelation = require('../relation/resourceRelation.js');
const defaultRelation = require('../relation/defaultRelation.js');
const Modal = require('../../models/system/dictionary.js');

const resSuccess = api.resSuccess

router.get('/', api.read(Modal))
router.post('/', (req, res) => {
  if (resourceRelation[req.body.sign] || defaultRelation[req.body.sign]) {
    res.send({
      code: -1,
      message: '此字典标识为保留标识'
    })
  } else {
    Modal.create(req.body)
      .then(doc => {
        res.send(resSuccess(doc))
      })
      .catch(err => {
        res.send(err)
      })
  }
})
router.put('/', api.update(Modal))
router.delete('/', api.delete(Modal))

router.get('/options', (req, res) => {
  Modal.findOne({
    _id: req.query.dictionaryId
  })
  .then(doc => {
    res.send(resSuccess({
      recordsTotal: doc.options.length,
      recordsFiltered: doc.options.length,
      data: doc.options
    }))
  })
  .catch(err => {
    res.send(err)
  })
})
router.post('/options', (req, res) => {
  Modal.update({
    _id: req.query.dictionaryId
  }, {
    $addToSet: {
      options: [req.body]
    }
  })
  .then(doc => {
    res.send(resSuccess(doc.options))
  })
  .catch(err => {
    res.send(err)
  })
})

router.put('/options', (req, res) => {
  Modal.update({
    '_id': req.query.dictionaryId,
    'options._id': req.query._id
  }, {
    $set: {
      options: req.body
    }
  })
  .then(doc => {
    res.send(resSuccess(doc.options))
  })
  .catch(err => {
    res.send(err)
  })
})
router.delete('/options', (req, res) => {
  Modal.update({
    _id: req.query.dictionaryId
  }, {
    $pull: {
      options: {
        _id: req.query._id
      }
    }
  })
  .then(doc => {
    res.send(resSuccess(doc.options))
  })
  .catch(err => {
    res.send(err)
  })
})

module.exports = router;
