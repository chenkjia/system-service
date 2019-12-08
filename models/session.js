const mongoose = require("mongoose");
const db = require('../lib/mongo.js');
const CommonSchema = require('./common.js');

//一个session模型
const Schema = new mongoose.Schema({
  ...CommonSchema,
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'account'
  }
});

//创建sessionModel
const Modal = db.model("session", Schema);
module.exports = Modal