const api = {
  read: (model, condition = {}) => (req, res, next) => {
    model.find(condition)
    .then(doc => {
      res.send(doc)
    })
    .catch(err => {
      res.send(err)
    })
  },
  create: (model) => (req, res) => {
    model.create(req.body)
    .then(doc => {
      res.send(doc)
    })
    .catch(err => {
      res.send(err)
    })
  },
  update: (model, condition) => (req, res) => {
    model.updateOne(condition || {
      _id: req.params.id
    }, req.body, {
      new: true,
      runValidators: true
    })
    .then(doc => {
      res.send(doc)
    })
    .catch(err => {
      res.send(err)
    })
  },
  delete: (model, condition) => (req, res, next) => {
    model.deleteOne(condition || {
      _id: req.params.id
    })
    .then(doc => {
      res.send(doc)
    })
    .catch(err => {
      res.send(err)
    })
  }
}

module.exports = api