const express = require('express');
const router = express.Router();

const api = require('../../lib/api.js');
const DictionaryModal = require('../../models/system/dictionary.js');
const defaultRelation = require('./defaultRelation')
const resourceRelation = require('./resourceRelation')

const defaultRelationFunc = (data) => {
  return new Promise((resolve, reject) => {
    resolve({
      key: data,
      value: defaultRelation[data]
    })
  })
}
const dictionaryRelationFunc = (data) => {
  return new Promise((resolve, reject) => {
    DictionaryModal.findOne({sign: data}, '-options._id').then(doc => {
      resolve({
        key: data,
        value: doc ? doc.options.filter(({enabled}) => enabled) : []
      })
    })
  })
}
 
router.get('/', (req, res) => {
  const relationList = req.query.relation.split(',')
  let relationResult = {}
  const getRelationList = relationList.reduce((result, current) => {
    if (defaultRelation[current]) {
      return [...result, defaultRelationFunc(current)]
    }
    if (resourceRelation[current]) {
      return [...result, resourceRelation[current](current)]
    }
    return [...result, dictionaryRelationFunc(current)]
  }, [])
  Promise.all(getRelationList)
  .then(doc => {
    const data = doc.reduce((result, { key, value }) => {
      return {
        ...result,
        [key]: value
      }
    }, {})
    res.send(api.resSuccess(data))
  })
  .catch(err => res.send(err))
})

module.exports = router;
