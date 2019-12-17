const mongoose = require("mongoose");
const db = require('../../lib/mongo.js');
const CommonSchema = require('../common.js');
//一个日志模型
const Schema = new mongoose.Schema({
  ...CommonSchema,
  accountId: { type: String },  // 操作用户ID
  type: { type: String },  // 模块ID
  url: { type: String },  // 功能点ID
  isSuccess: { type: Boolean },  // 是否成功
});
//创建日志Model
const Modal = db.model("log", Schema);
module.exports = Modal