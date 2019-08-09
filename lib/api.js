const resSuccess = (data) => ({
  code: 0,
  message: 'success',
  data: data
})
const api = {
  read: (model, condition = {}) => (req, res, next) => {
    model.find(condition)
      .then(doc => {
        res.send(resSuccess(doc))
      })
      .catch(err => {
        res.send(err)
      })
  },
  create: (model) => (req, res) => {
    console.log(req)
    console.log(req.body)
    model.create(req.body)
      .then(doc => {
        res.send(resSuccess(doc))
      })
      .catch(err => {
        res.send(err)
      })
  },
  update: (model, condition) => (req, res) => {
    model.updateOne(condition || {
      _id: req.query._id
    }, req.body, {
      new: true,
      runValidators: true
    })
      .then(doc => {
        res.send(resSuccess(doc))
      })
      .catch(err => {
        res.send(err)
      })
  },
  delete: (model, condition) => (req, res, next) => {
    model.deleteOne(condition || {
      _id: req.query._id
    })
      .then(doc => {
        res.send(resSuccess(doc))
      })
      .catch(err => {
        res.send(err)
      })
  }
}

module.exports = api