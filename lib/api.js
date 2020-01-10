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
const orders = {
  ascending: 1,
  descending: -1
}
const sortFormat = (sortData) => {
  return { [sortData.prop]: orders[sortData.order] }
}

const queryFormat = ({limit, skip, sort = '{}', filter = '{}', fields = '{}'}) => {
  return {
    limit: Number(limit),
    skip: Number(skip),
    sort: sortFormat(JSON.parse(sort)),
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
  },
  tree: (
    model,
    props = {},
    callback = (doc, res) => {
      res.send(resSuccess({
        data: doc
      }))
    }
  ) => (req, res, next) => {
    const { condition = {}, list = null } = props
    const { sort, filter } = queryFormat(req.query)
    const { serverMode } = req.query
    // 读取要显示的列表数据
    const rootFilter = serverMode === 'server' ? { parentId:{$exists:false} } : {}
    const getData = new Promise((resolve, reject) => {
      model.find({...condition, ...rootFilter,...filter}, serverMode === 'init' ? '-hasChildren' : list )
      .sort({
        ...sort,
        created: -1
      })
      .then(doc => callback(doc, res))
      .catch(err => {
        res.send(err)
      })
    })
  },
  changeSort: (
    model,
    callback = (doc, res) => {
      res.send(resSuccess({
        data: doc
      }))
    }
  ) => (req, res) => {
    const updateList = req.body.list.map(({_id,sort}) => {
      return new Promise((resolve, reject) => {
        model.update({
          _id
        }, {
          sort,
          updated: Date.now()
        })
        .then(resolve)
        .catch(reject)
      })
    })
    Promise.all(updateList)
    .then(doc => callback(doc, res))
    .catch(err => {
      res.send(err)
    })
    // model.updateOne(condition || {
    //   _id: req.query._id
    // }, {
    //   ...req.body,
    //   updated: Date.now()
    // }, {
    //   new: true,
    //   runValidators: true
    // })
    //   .then(doc => {
    //     res.send(resSuccess(doc))
    //   })
    //   .catch(err => {
    //     res.send(err)
    //   })
  },
}

module.exports = api