const resSuccess = (data) => ({
  code: 0,
  message: 'success',
  data: data
})
const api = {
  read: (model, condition = {}) => (req, res, next) => {
    const { limit, skip } = req.query
    // 读取总记录数
    const getRecordsTotal = new Promise((resolve, reject) => {
      model.find(condition).countDocuments().then(resolve)
    })
    // 读取过滤后记录数
    const getRecordsFiltered = new Promise((resolve, reject) => {
      model.find(condition).countDocuments().then(resolve)
    })
    // 读取要显示的列表数据
    const getData = new Promise((resolve, reject) => {
      model.find(condition, null, { skip: Number(skip) })
      .limit(Number(limit) || 10)
      .sort({
        created: -1
      })
      .then(resolve)
    })
    Promise.all([getRecordsTotal, getRecordsFiltered, getData]).then(doc => {
      res.send(resSuccess({
        recordsTotal: doc[0],
        recordsFiltered: doc[1],
        data: doc[2]
      }))
    })
    .catch(err => {
      res.send(err)
    })
  },
  create: (model) => (req, res) => {
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
    }, {
      ...req.body,
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