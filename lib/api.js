const mapValues = require('lodash/mapValues');
const resSuccess = (data) => ({
  code: 0,
  message: 'success',
  data: data
})
const filterFormat = (filter, fields) => {
  return mapValues(filter, (value, key) => {
    // 暂时只做了like一种
    return fields[key] && fields[key].filter && fields[key].filter.like ? new RegExp(value) : value
  })
}

const queryFormat = ({limit, skip, sort = '{}', filter = '{}', fields = '{}'}) => {
  return {
    limit: Number(limit),
    skip: Number(skip),
    sort: JSON.parse(sort),
    filter: filterFormat(JSON.parse(filter), JSON.parse(fields))
  }
}

const api = {
  resSuccess,
  filterFormat,
  queryFormat,
  read: (
    model,
    props = {},
    callback = (doc, res) => {
      res.send(resSuccess({
        recordsTotal: doc[0],
        recordsFiltered: doc[1],
        data: doc[2]
      }))
    }
  ) => (req, res, next) => {
    const { condition = {}, list = null } = props
    const { limit, skip, sort, filter } = queryFormat(req.query)
    // 读取总记录数
    const getRecordsTotal = new Promise((resolve, reject) => {
      model.find({}).countDocuments().then(resolve)
    })
    // 读取过滤后记录数
    const getRecordsFiltered = new Promise((resolve, reject) => {
      model.find({...condition,...filter}).countDocuments().then(resolve)
    })
    // 读取要显示的列表数据
    const getData = new Promise((resolve, reject) => {
      model.find({...condition,...filter}, list, { skip })
      .limit(limit || 10)
      .sort({
        ...sort,
        created: -1
      })
      .then(resolve)
    })
    Promise.all([getRecordsTotal, getRecordsFiltered, getData])
    .then(doc => callback(doc, res))
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